import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Subtract<1, 1>, 0>>,
  Expect<Equal<Subtract<2, 1>, 1>>,
  Expect<Equal<Subtract<1, 2>, never>>,
  // @ts-expect-error
  Expect<Equal<Subtract<1000, 999>, 1>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

/**
 * The current use case tested asks to handle up until the tuple limit (1000)
 *
 * We could do the same logic used on <Sum> to handle arbitrary long numbers if needed
 *
 * It would go like
 *
 * NumA = 9304 = [9, 3, 0, 4] ==> [4, 0, 3, 9]
 * NumB = 450  = [4, 5, 0]    ==> [0, 5, 4]
 *                                -----------------
 *                                 [4, 5, 8, 8] = 8854
 *
 * To handle negatives just use GreaterThan<> and flip A/B + add negative at the end
 */

type ToTuple<Num extends number, Acc extends 1[] = []> =
  Acc['length'] extends Num
    ? Acc
    : ToTuple<Num, [...Acc, 1]>

type TupleSubtract<T1 extends number[], T2 extends number[]> =
  T2 extends [unknown, unknown, unknown, unknown, ...infer Rest2 extends number[]]
    ? T1 extends [unknown, unknown, unknown, unknown, ...infer Rest1 extends number[]]
      ? TupleSubtract<Rest1, Rest2>
      : never // we have more on Num2 than on Num1, requirement says we cant have that!
    : T2 extends [unknown, ...infer Rest2 extends number[]]
      ? T1 extends [unknown, ...infer Rest1 extends number[]]
        ? TupleSubtract<Rest1, Rest2>
        : never
      : T1

type Subtract<NumA extends number, NumB extends number>
  = TupleSubtract<ToTuple<NumA>, ToTuple<NumB>> extends infer Result extends unknown[]
    ? Result['length']
    : 0
