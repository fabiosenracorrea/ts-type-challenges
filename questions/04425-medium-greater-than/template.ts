/**
 * Solution, in words:
 *
 * 1. Convert number to tuple => 111 = [1, 1, 1]
 * 2. Compare tuple lengths:
 *  If bigger/lower, we have the answer
 *  If the same:
 *    Check for end of compare = []
 *    Check for first digit:
 *      If the same => compare removing it from the tuple => [1, 1]
 *      If greater/lower we have the answer
 */
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

type NumToTuple<T extends number | string> =
  `${T}` extends `${infer P extends number}${infer Rest}`
    ? [P, ...NumToTuple<Rest>]
    : []

type Shift_<T extends unknown[]> =
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
          ? IsGreater<Shift_<A>, Shift_<B>>
          : false
    : IsBigger<A['length'], B['length']>

export type GreaterThan<A extends number, B extends number> =
  IsGreater<
    NumToTuple<A>,
    NumToTuple<B>
  >
