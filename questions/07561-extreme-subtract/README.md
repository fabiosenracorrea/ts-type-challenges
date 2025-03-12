<!--info-header-start--><h1>Subtract <img src="https://img.shields.io/badge/-extreme-b11b8d" alt="extreme"/> <img src="https://img.shields.io/badge/-%23tuple-999" alt="#tuple"/></h1><blockquote><p>by Lo <a href="https://github.com/LoTwT" target="_blank">@LoTwT</a></p></blockquote><p><a href="https://tsch.js.org/7561/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement the type Subtraction that is ` - ` in Javascript by using BuildTuple.

If the minuend is less than the subtrahend, it should be `never`.

It's a simple version.

For example

```ts
Subtract<2, 1> // expect to be 1
Subtract<1, 2> // expect to be never
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/7561/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/7561/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
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
```
