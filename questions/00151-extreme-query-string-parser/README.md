<!--info-header-start--><h1>Query String Parser <img src="https://img.shields.io/badge/-extreme-b11b8d" alt="extreme"/> <img src="https://img.shields.io/badge/-%23template--literal-999" alt="#template-literal"/></h1><blockquote><p>by Pig Fang <a href="https://github.com/g-plane" target="_blank">@g-plane</a></p></blockquote><p><a href="https://tsch.js.org/151/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

You're required to implement a type-level parser to parse URL query string into a object literal type.

Some detailed requirements:

- Value of a key in query string can be ignored but still be parsed to `true`. For example, `'key'` is without value, so the parser result is `{ key: true }`.
- Duplicated keys must be merged into one. If there are different values with the same key, values must be merged into a tuple type.
- When a key has only one value, that value can't be wrapped into a tuple type.
- If values with the same key appear more than once, it must be treated as once. For example, `key=value&key=value` must be treated as `key=value` only.


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/151/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/151/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
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
```
