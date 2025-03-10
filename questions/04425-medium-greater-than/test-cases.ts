import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type BiggerMap = {
  0: []
  1: ['0']
  2: ['0', '1']
  3: ['0', '1', '2']
  4: ['0', '1', '2', '3']
  5: ['0', '1', '2', '3', '4']
  6: ['0', '1', '2', '3', '4', '5']
  7: ['0', '1', '2', '3', '4', '5', '6']
  8: ['0', '1', '2', '3', '4', '5', '6', '7']
  9: ['0', '1', '2', '3', '4', '5', '6', '7', '8']
}

type IsBigger<A extends string | number, B extends string | number> =
  A extends keyof BiggerMap
    ? `${B}` extends BiggerMap[A][number] ? true : false
    : false

// We can exploit TS string infer to do it in one go!
// not sure if it impacts performance all that much,
// since the original solution i came up with has direct access instead of inference
type IsBigger2<A extends string | number, B extends string | number> =
  '9876543210' extends `${string}${A}${string}${B}${string}`
    ? true
    : false

type NumToTuple<T extends number | string> =
  `${T}` extends `${infer P extends number}${infer Rest}`
    ? [P, ...NumToTuple<Rest>]
    : []

type Shift<T extends unknown[]> =
    T extends [unknown, ...infer R]
      ? R
      : T

type IsGreater<A extends number[], B extends number[]>
  = A['length'] extends B['length']
    ? A['length'] extends 0
      ? false
      : IsBigger<A[0], B[0]> extends true
        ? true
        : A[0] extends B[0]
          ? IsGreater<Shift<A>, Shift<B>>
          : false
    : IsBigger<A['length'], B['length']>

type GreaterThan<A extends number, B extends number> =
  IsGreater<
    NumToTuple<A>,
    NumToTuple<B>
  >
