import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

// We can't use T['length'] as, obviously, thats lastIndex+1
type Last<T extends readonly unknown[]> =
  T extends [infer _First, ...infer Rest]
    ? T[Rest['length']]
    : never

// Recursive extraction (no length magic)

type casesR = [
  Expect<Equal<LastR<[]>, never>>,
  Expect<Equal<LastR<[2]>, 2>>,
  Expect<Equal<LastR<[3, 2, 1]>, 1>>,
  Expect<Equal<LastR<[() => 123, { a: string }]>, { a: string }>>,
]

type ArrayHasItem<T extends unknown[]> =
  T extends [infer P, ...infer _rest]
    ? P extends never
      ? false
      : true
    : false

type LastR<T extends readonly unknown[]> =
  T extends [infer First, ...infer Rest]
    ? ArrayHasItem<Rest> extends true
      ? LastR<Rest>
      : First
    : never

// inverting rest

/**
 * Solution 3
 *
 * Inverting the rest param
 *
 * Taken from youtube.com/watch?v=ZS6zfnWdHr8
 */

type casesT = [
  Expect<Equal<LastT<[]>, never>>,
  Expect<Equal<LastT<[2]>, 2>>,
  Expect<Equal<LastT<[3, 2, 1]>, 1>>,
  Expect<Equal<LastT<[() => 123, { a: string }]>, { a: string }>>,
]

type LastT<T extends readonly unknown[]> =
  T extends [...infer _Rest, infer LastItem]
    ? LastItem
    : never
