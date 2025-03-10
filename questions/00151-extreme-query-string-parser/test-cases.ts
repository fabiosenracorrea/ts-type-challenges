/* eslint-disable ts/no-empty-object-type */
import type { Equal, Expect, MergeInsertions } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParseQueryString<''>, {}>>,
  Expect<Equal<ParseQueryString<'k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k1'>, { k1: true }>>,
  Expect<Equal<ParseQueryString<'k1&k2'>, { k1: true, k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2'>, { k1: 'v1', k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2'>, { k1: ['v1', 'v2'], k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2'>, { k1: 'v1', k2: true }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v1'>, { k1: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'] }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v1&k1=v2&k1=v1'>, { k1: ['v1', 'v2'], k2: 'v1' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k2=v2&k1=v2&k1=v3'>, { k1: ['v1', 'v2', 'v3'], k2: 'v2' }>>,
  Expect<Equal<ParseQueryString<'k1=v1&k1'>, { k1: ['v1', true] }>>,
  Expect<Equal<ParseQueryString<'k1&k1=v1'>, { k1: [true, 'v1'] }>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

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
