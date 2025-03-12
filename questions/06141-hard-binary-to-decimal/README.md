<!--info-header-start--><h1>Binary to Decimal <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23math-999" alt="#math"/></h1><blockquote><p>by wotsushi <a href="https://github.com/wotsushi" target="_blank">@wotsushi</a></p></blockquote><p><a href="https://tsch.js.org/6141/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement `BinaryToDecimal<S>` which takes an exact string type `S` consisting 0 and 1 and returns an exact number type corresponding with `S` when `S` is regarded as a binary.
You can assume that the length of `S` is equal to or less than 8 and `S` is not empty.

```ts
type Res1 = BinaryToDecimal<'10'>; // expected to be 2
type Res2 = BinaryToDecimal<'0011'>; // expected to be 3
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/6141/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/6141/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,

  Expect<Equal<BinaryToDecimal2<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal2<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal2<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal2<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal2<'10101010'>, 170>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type ReverseS<T extends string> = T extends `${infer Char}${infer Rest}` ? `${ReverseS<Rest>}${Char}` : T

type DoubleTuple<T extends readonly unknown[]> = [...T, ...T]

type ExponentialTuple<
  Size extends number,
  Count extends readonly 1[] = [],
  Result extends readonly 1[] = [1],
> =
  Size extends Count['length']
    ? Result
    : ExponentialTuple<Size, [...Count, 1], DoubleTuple<Result>>

type FixResult<T extends readonly unknown[]> =
  T extends [unknown, ...infer Rest]
    ? Rest['length']
    : T['length']

type BinaryResult<
  Reversed extends string,
  Exponent extends readonly 1[] = [],
  Result extends readonly 1[] = [1],
> =
  Reversed extends `${infer Next}${infer Rest}`
    // @ts-expect-error ts-2589 we know for this usage its not going to be infinite, its per the challenge description
    ? BinaryResult<
      Rest,
      [...Exponent, 1],
      Next extends '1'
        ? [...Result, ...ExponentialTuple<Exponent['length']>]
        : Result
    >
    : FixResult<Result>

type BinaryToDecimal<Binary extends string> = BinaryResult<ReverseS<Binary>>

/**
 * Solution 2
 *
 * youtube.com/watch?v=gmr6sFgJCKc
 */
type BinaryToDecimal2<
  T extends string,

  Count extends 1[] = [],
> =
  T extends `${infer Next}${infer Rest}`
    ? Next extends '1'
      ? BinaryToDecimal2<Rest, [...Count, ...Count, 1]>
      : BinaryToDecimal2<Rest, [...Count, ...Count]>
    : Count['length']
```
