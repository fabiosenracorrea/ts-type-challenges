import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TwoSum<[3, 3], 6>, true>>,
  Expect<Equal<TwoSum<[3, 2, 4], 6>, true>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 15>, false>>,
  Expect<Equal<TwoSum<[2, 7, 11, 15], 9>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 0>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 1>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 2>, false>>,
  Expect<Equal<TwoSum<[1, 2, 3], 3>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 4>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 5>, true>>,
  Expect<Equal<TwoSum<[1, 2, 3], 6>, false>>,
  Expect<Equal<TwoSum<[3, 2, 0], 2>, true>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type TupleFrom<Size extends number, Acc extends readonly 1[] = []>
  = Acc['length'] extends Size
    ? Acc
    : TupleFrom<Size, [...Acc, 1]>

type Add<
  NumberA extends number,
  NumberB extends number,
> = [...TupleFrom<NumberA>, ...TupleFrom<NumberB>]['length']

type HasSum<
  NumberA extends number,
  Checkers extends readonly number[],
  Sum extends number,
> =
  Checkers extends [infer NumberB extends number, ...infer Rest extends number[]]
    ? Add<NumberA, NumberB> extends Sum
      ? true
      : HasSum<NumberA, Rest, Sum>
    : false

type TwoSum<Numbers extends readonly number[], Sum extends number> =
  Numbers extends [infer First extends number, ...infer Rest extends number[]]
    ? HasSum<First, Rest, Sum> extends true
      ? true
      : TwoSum<Rest, Sum>
    : false
