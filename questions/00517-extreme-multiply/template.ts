import type { DigitSum, Sum, TupleSum } from '../00476-extreme-sum/template'

/**
 * We build on top of our previous Sum solution logic
 *
 * Now we need to spread the multiplication of each digit from B to A,
 * like:
 *
 *           435
 *  x         12
 * -------------
 *      [8 ,7, 0]
 * + [4, 3, 5, 0]
 * ---------------
 *   [5, 2, 2, 0]
 *
 * We then adapt the previous code logic
 * to form this approach
 *
 * After the multiplication is done, we sum all the result tuples
 * for each digit multiplied
 *
 * Because we can end up with leading 0, we have to account for that after joining
 */
type ToTuple<T extends string | number | bigint>
  = `${T}` extends `${infer Next extends number}${infer Rest}`
    ? [Next, ...ToTuple<Rest>]
    : []

type TupleFrom<Size extends number, Acc extends readonly 1[] = []>
  = Acc['length'] extends Size
    ? Acc
    : TupleFrom<Size, [...Acc, 1]>

type InnerMulti<
  NumberA extends number,
  NumberB extends number,

  Acc extends readonly 1[] = [],
> = NumberB extends Acc['length']
  ? []
  : [...TupleFrom<NumberA>, ...InnerMulti<NumberA, NumberB, [...Acc, 1]>]

type Multi<
  NumberA extends number,
  NumberB extends number,
  Carry extends number = 0,

  _RESULT = ToTuple<
    [...InnerMulti<NumberA, NumberB>, ...TupleFrom<Carry>]['length'] & number
  >,
> =
  _RESULT extends [number, number]
    ? _RESULT
    : _RESULT extends [infer Digit]
      ? [0, Digit]
      : []

type AccountCarry<T extends number> = T extends 0 ? [] : [T]

type MultiplyByNum<
  Target extends number[],
  Multiplier extends number,

  Carry extends number = 0,
> =
  Target extends [...infer Rest extends number[], infer Next extends number]
    ? Multi<Next, Multiplier, Carry> extends [infer NewCarry extends number, infer Result]
      ? [...MultiplyByNum<Rest, Multiplier, NewCarry>, Result]
      : []
    : AccountCarry<Carry>

/**
 * One by one, multiples A by each
 * value from B, following standard multi rules
 */
type TupleMulti<
  NumberA extends number[],
  NumberB extends number[],

  RightPad extends readonly 0[] = [],
> =
  NumberB extends [...infer RestB extends number[], infer NextMultiplier extends number]
    // @ts-expect-error we know its not going to be infinite here
    ? [
        [...MultiplyByNum<NumberA, NextMultiplier>, ...RightPad],
        ...TupleMulti<NumberA, RestB, [...RightPad, 0]>,
      ]
    : []

type ConsolidateMultiply<Results extends number[][]> =
      Results extends [infer NextA extends number[], ...infer Rest extends number[][]]
        ? TupleSum<
          NextA,
          ConsolidateMultiply<Rest>
        >
        : []

type JoinResult<T extends number[]> =
  T extends [infer Next extends number, ...infer Rest extends number[]]
    ? `${Next}${JoinResult<Rest>}`
    : ''

type UnPadResult<T extends string> =
  T extends `0${infer Value}`
    ? Value extends ''
      ? '0'
      : UnPadResult<Value>
    : T

type ExecMultiply<
  NumberA extends number[],
  NumberB extends number[],
> =
  UnPadResult<
    JoinResult<
      // @ts-expect-error we know it won't be infinite here
      ConsolidateMultiply<
        TupleMulti<NumberA, NumberB>
      >
    >
  >

type Multiply<
  NumberA extends number | string | bigint,
  NumberB extends number | string | bigint,
> =
  ExecMultiply<
    ToTuple<NumberA>,
    ToTuple<NumberB>
  >

// ---------------------------- SOLUTION 2 ------------------------------- //

/**
 * After completing the Sum challenge, I've watched
 *  youtu.be/F366zfM3XSQ?si=IyAgNHeDu2Q2iVM7
 * And came across an interesting approach for that
 *
 * Below is the attempt to build upon that way of thinking, without checking back
 */

type MultiDigit = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 2, 4, 6, 8, 0, 2, 4, 6, 8],
  [0, 3, 6, 9, 2, 5, 8, 1, 4, 7],
  [0, 4, 8, 2, 6, 0, 4, 8, 2, 6],
  [0, 5, 0, 5, 0, 5, 0, 5, 0, 5],
  [0, 6, 2, 8, 4, 0, 6, 2, 8, 4],
  [0, 7, 4, 1, 8, 5, 2, 9, 6, 3],
  [0, 8, 6, 4, 2, 0, 8, 6, 4, 2],
  [0, 9, 8, 7, 6, 5, 4, 3, 2, 1],
]

type MultiCarry = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 2, 2, 2],
  [0, 0, 0, 1, 1, 2, 2, 2, 3, 3],
  [0, 0, 1, 1, 2, 2, 3, 3, 4, 4],
  [0, 0, 1, 1, 2, 3, 3, 4, 4, 5],
  [0, 0, 1, 2, 2, 3, 4, 4, 5, 6],
  [0, 0, 1, 2, 3, 4, 4, 5, 6, 7],
  [0, 0, 1, 2, 3, 4, 5, 6, 7, 8],
]

type Multi2<
  NumA extends number,
  NumB extends number,
  Carry extends number,

> = TupleSum<
  [MultiCarry[NumA][NumB], MultiDigit[NumA][NumB]],
  [Carry]
>

type MultiplyByNum2<
  Target extends number[],
  Multiplier extends number,

  Carry extends number = 0,
> =
  Target extends [...infer Rest extends number[], infer Next extends number]
    ? Multi2<Next, Multiplier, Carry> extends [infer NewCarry extends number, infer Result]
      ? [...MultiplyByNum2<Rest, Multiplier, NewCarry>, Result]
      : []
    : AccountCarry<Carry>

type TupleMulti2<
  NumberA extends number[],
  NumberB extends number[],

  RightPad extends readonly 0[] = [],
> =
  NumberB extends [...infer RestB extends number[], infer NextMultiplier extends number]
    ? [
        [...MultiplyByNum2<NumberA, NextMultiplier>, ...RightPad],
        ...TupleMulti<NumberA, RestB, [...RightPad, 0]>,
      ]
    : []

type ExecMultiply2<
  NumberA extends number[],
  NumberB extends number[],
> =
  UnPadResult<
    JoinResult<
      ConsolidateMultiply<
        TupleMulti<NumberA, NumberB>
      >
    >
  >

type Multiply2<
  NumberA extends number | string | bigint,
  NumberB extends number | string | bigint,
> =
  ExecMultiply2<
    ToTuple<NumberA>,
    ToTuple<NumberB>
  >
