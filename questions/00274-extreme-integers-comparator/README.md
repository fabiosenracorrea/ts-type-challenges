<!--info-header-start--><h1>Integers Comparator <img src="https://img.shields.io/badge/-extreme-b11b8d" alt="extreme"/> <img src="https://img.shields.io/badge/-%23template--literal-999" alt="#template-literal"/> <img src="https://img.shields.io/badge/-%23math-999" alt="#math"/></h1><blockquote><p>by Pig Fang <a href="https://github.com/g-plane" target="_blank">@g-plane</a></p></blockquote><p><a href="https://tsch.js.org/274/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a type-level integers comparator. We've provided an enum for indicating the comparison result, like this:

- If `a` is greater than `b`, type should be `Comparison.Greater`.
- If `a` and `b` are equal, type should be `Comparison.Equal`.
- If `a` is lower than `b`, type should be `Comparison.Lower`.

**Note that `a` and `b` can be positive integers or negative integers or zero, even one is positive while another one is negative.**


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/274/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/274/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
import type { GreaterThan } from '../04425-medium-greater-than/template'

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type IsNegative<T extends number> = `${T}` extends `-${infer _num extends number}` ? true : false

type RemoveNegative<T extends number> = `${T}` extends `-${infer Num extends number}` ? Num : T

type isDecimal<T extends number> = `${T}` extends `${number}.${number}` ? true : false

type ExtractInt<T extends number> = `${T}` extends `${infer Num extends number}.${number}` ? Num : T

type ExtractDecimal<T extends number> = `${T}` extends `${number}.${infer Num extends number}` ? Num : T

type ShouldCompareDecimal<A extends number, B extends number> =
  isDecimal<A> extends true
    ? isDecimal<B> extends true
      ? ExtractInt<A> extends ExtractInt<B>
        ? true
        : false
      : false
    : false

/**
 * Because of how TS works with decimal when referenced
 * on the helpers we use on the `GreaterThan` type,
 * we only ever need to compare decimals if the integer
 * value is the same. Otherwise the compiler will coerce it
 * to the integer and the evaluation will occur as they should
 */
type Comparator<A extends number, B extends number> =
  ShouldCompareDecimal<A, B> extends true
    ? Comparator<ExtractDecimal<A>, ExtractDecimal<B>>
    : A extends B
      ? Comparison.Equal
      : IsNegative<A> extends true
        ? IsNegative<B> extends true
          ? Comparator<
            RemoveNegative<B>,
            RemoveNegative<A>
          >
          : Comparison.Lower
        : IsNegative<B> extends true
          ? Comparison.Greater
          : GreaterThan<A, B> extends true
            ? Comparison.Greater
            : Comparison.Lower
```
