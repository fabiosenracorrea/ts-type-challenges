<!--info-header-start--><h1>Greater Than <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/></h1><blockquote><p>by ch3cknull <a href="https://github.com/ch3cknull" target="_blank">@ch3cknull</a></p></blockquote><p><a href="https://tsch.js.org/4425/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

Negative numbers do not need to be considered.

For example

```ts
GreaterThan<2, 1> //should be true
GreaterThan<1, 1> //should be false
GreaterThan<10, 100> //should be false
GreaterThan<111, 11> //should be true
```

Good Luck!

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/4425/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/4425/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
 
 
### Solution
 
 
```ts
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
```
