/* eslint-disable ts/no-empty-object-type */
import type { MergeInsertions } from '@type-challenges/utils'

type EnsureArray<T> = T extends unknown[] ? T : [T]

type ToArray<
  Current,
  NewValue,

  AS_ARRAY extends unknown[] = EnsureArray<Current>,
> =
  NewValue extends AS_ARRAY[number]
    ? AS_ARRAY['length'] extends 1
      ? NewValue
      : AS_ARRAY
    : [...AS_ARRAY, NewValue]

type Append<
  Result,
  Key extends PropertyKey,
  Value,
> =
  Key extends keyof Result
    ? { [K in keyof Result]: Key extends K ? ToArray<Result[K], Value> : Result[K] }
    : Result & { [K in Key]: Value }

type ParseQuery<Query extends string, Result = {}> =
  Query extends `${infer Param1}${'&'}${infer Rest}`
    ? Param1 extends `${infer Key}=${infer Value}`
      ? ParseQuery<Rest, Append<Result, Key, Value>>
      : ParseQuery<Rest, Append<Result, Param1, true>>
    : Query extends `${infer Key}=${infer Value}`
      ? Append<Result, Key, Value>
      : Query extends ''
        ? Result
        : Append<Result, Query, true>

type ParseQueryString<T extends string> = MergeInsertions<ParseQuery<T>>
