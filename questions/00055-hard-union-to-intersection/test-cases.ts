import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
  Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

/**
 * Why this works?
 * youtube.com/watch?v=43aKbkDgN_w
 *
 * 1. T extends T forces distributive
 * 2. (p: T) => any | (p: U) => any
 *
 * To INFER (!) an argument that satisfies T and U
 * the type of that inference must be T & U, as the rest is the same
 */
type UnionToIntersection<T> =
  (
    T extends T ? (arg: T) => any : never
  ) extends (param: infer P) => void
    ? P
    : never
