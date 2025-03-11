/*
  Figure out how to

  - Convert each string/number to an array of digits
      => 496 = [4, 9, 6]
      => 27  = [2, 7]
  - On each TupleSum call, extract the last element of each to sum
  - Account for either number to end early
  - Account for the Carry value (eg 8+7 =>  5 & Carry = 1)
  - To sum each digit we can leverage Tuple Math:
      - Create a tuple from both digits + the current carry
      - return in tuple form for consistency
          9 = [0, 9]
          22 = [2, 2]
  - Recursively create each sum digit, until you have none left
  - Remember to account for the carry at the end
*/

type ToTuple<T extends string | number | bigint>
  = `${T}` extends `${infer Next extends number}${infer Rest}`
    ? [Next, ...ToTuple<Rest>]
    : []

type TupleFrom<Size extends number, Acc extends readonly 1[] = []>
  = Acc['length'] extends Size
    ? Acc
    : TupleFrom<Size, [...Acc, 1]>

type DigitSum<
  NumberA extends number,
  NumberB extends number,
  Carry extends number = 0,

  _RESULT = ToTuple<
    [...TupleFrom<NumberA>, ...TupleFrom<NumberB>, ...TupleFrom<Carry>]['length'] & number
  >,
> =
  _RESULT extends [number, number]
    ? _RESULT
    : _RESULT extends [infer Digit]
      ? [0, Digit]
      : []

type TupleSum<
  NumberA extends number[],
  NumberB extends number[],

  Carry extends number = 0,
> =
  NumberA extends [...infer RestA extends number[], infer NextA extends number]
    ? NumberB extends [...infer RestB extends number[], infer NextB extends number]
      ? DigitSum<NextA, NextB, Carry> extends [infer NextCary extends number, infer Result]
        ? [...TupleSum<RestA, RestB, NextCary>, Result]
        : []
      : DigitSum<NextA, Carry> extends [infer NextCary extends number, infer Result]
        ? [...TupleSum<RestA, [], NextCary>, Result]
        : []
    : NumberB extends [...infer RestB extends number[], infer NextB extends number]
      ? DigitSum<NextB, Carry> extends [infer NextCary extends number, infer Result]
        ? [...TupleSum<[], RestB, NextCary>, Result]
        : []
      : Carry extends 0
        ? []
        : [Carry]

type JoinResult<T extends number[]> =
  T extends [infer Next extends number, ...infer Rest extends number[]]
    ? `${Next}${JoinResult<Rest>}`
    : ''

type ExecSum<
  NumberA extends number[],
  NumberB extends number[],
> =
  JoinResult<
    TupleSum<NumberA, NumberB>
  >

type Sum<
  NumberA extends number | string | bigint,
  NumberB extends number | string | bigint,
> =
  ExecSum<
    ToTuple<NumberA>,
    ToTuple<NumberB>
  >
