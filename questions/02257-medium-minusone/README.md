<!--info-header-start--><h1>MinusOne <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23math-999" alt="#math"/></h1><blockquote><p>by Mustafo Faiz <a href="https://github.com/fayzzzm" target="_blank">@fayzzzm</a></p></blockquote><p><a href="https://tsch.js.org/2257/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-gray" alt="简体中文"/></a> </p><!--info-header-end-->

Given a number (always positive) as a type. Your type should return the number decreased by one.

For example:

```ts
type Zero = MinusOne<1> // 0
type FiftyFour = MinusOne<55> // 54
```

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/2257/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/2257/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
 
 
### Solution
 
 
```ts
type ParseInt<T extends string> =
  `${T}` extends `${infer P extends number}`
    ? P
    : never

// If we subtract 1 from 0 = 9
// that is, the number indexes its result
type SubTargets = [
  '9',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
]

type Digit = SubTargets[number]

type ReverseString<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? `${ReverseString<Rest>}${First}`
    : T

// Because string extraction works best with the first
// char, we perform the number subtraction in reverse!
type WalkDown<T extends string> =
  T extends `${infer Target extends Digit}${infer Rest}`
    ? Target extends '0'
      ? `${SubTargets[Target]}${WalkDown<Rest>}`
      : `${SubTargets[Target]}${Rest}`
    : T extends Digit
      ? SubTargets[T]
      : T

// The reversing causes the number to have zero padding
// We account for the special '0' result case
type RemovePadZero<T extends string> =
  T extends `0${infer N}`
    ? N extends '' ? '0' : N
    : T

type ExecCalc<T extends number> = ReverseString<
  WalkDown<
    ReverseString<`${T}`>
  >
>

type MinusOne<T extends number> = ParseInt<
  RemovePadZero<
    ExecCalc<T>
  >
>

// ------------------- ACCOUNTING NEGATIVES ------------------------ //

type SumTargets = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
]

type WalkUp<T extends string> =
  T extends `${infer Target extends Digit}${infer Rest}`
    ? Target extends '9'
      ? `${SumTargets[Target]}${Rest extends '' ? '1' : WalkUp<Rest>}`
      : `${SumTargets[Target]}${Rest}`
    : T extends Digit
      ? SumTargets[T]
      : T

type NegativeCalc<T extends number> = ReverseString<
  WalkUp<
    ReverseString<`${T}`>
  >
>

type FullMinusOne<T extends number> =
  T extends 0
    ? -1
    : `${T}` extends `-${infer N extends number}`
      ? ParseInt<
          `-${RemovePadZero<NegativeCalc<N>>}`
      >
      : MinusOne<T>
```
