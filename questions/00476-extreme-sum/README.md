<!--info-header-start--><h1>Sum <img src="https://img.shields.io/badge/-extreme-b11b8d" alt="extreme"/> <img src="https://img.shields.io/badge/-%23math-999" alt="#math"/> <img src="https://img.shields.io/badge/-%23template--literal-999" alt="#template-literal"/></h1><blockquote><p>by null <a href="https://github.com/uid11" target="_blank">@uid11</a></p></blockquote><p><a href="https://tsch.js.org/476/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.

For example,

```ts
type T0 = Sum<2, 3> // '5'
type T1 = Sum<'13', '21'> // '34'
type T2 = Sum<'328', 7> // '335'
type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/476/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/476/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
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

export type DigitSum<
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

export type TupleSum<
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

export type ExecSum<
  NumberA extends number[],
  NumberB extends number[],
> =
  JoinResult<
    TupleSum<NumberA, NumberB>
  >

export type Sum<
  NumberA extends number | string | bigint,
  NumberB extends number | string | bigint,
> =
  ExecSum<
    ToTuple<NumberA>,
    ToTuple<NumberB>
  >
```
