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
