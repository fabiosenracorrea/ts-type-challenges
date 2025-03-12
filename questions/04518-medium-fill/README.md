<!--info-header-start--><h1>Fill <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23tuple-999" alt="#tuple"/></h1><blockquote><p>by キリサメ qianxi <a href="https://github.com/qianxi0410" target="_blank">@qianxi0410</a></p></blockquote><p><a href="https://tsch.js.org/4518/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

`Fill`, a common JavaScript function, now let us implement it with types.
`Fill<T, N, Start?, End?>`, as you can see,`Fill` accepts four types of parameters, of which `T` and `N` are required parameters, and `Start` and `End` are optional parameters.
The requirements for these parameters are: `T` must be a `tuple`, `N` can be any type of value, `Start` and `End` must be integers greater than or equal to 0.

```ts
type exp = Fill<[1, 2, 3], 0> // expected to be [0, 0, 0]
```
In order to simulate the real function, the test may contain some boundary conditions, I hope you can enjoy it :)


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/4518/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/4518/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
import type { GreaterThan } from '../04425-medium-greater-than/template'

/**
 * We did greater than before arriving to this one
 */

type IsStartOk<Acc extends readonly unknown[], Start extends number, End extends number> =
  GreaterThan<Acc['length'], Start> extends true
    ? true
    : Acc['length'] extends Start
      ? true
      : Start extends 0
        ? End extends 0
          ? false
          : true
        : false

type IsEndOk<Acc extends readonly unknown[], End extends number> = GreaterThan<End, Acc['length']>

type CanFill<Acc extends readonly unknown[], Start extends number, End extends number> =
  IsStartOk<Acc, Start, End> extends true
    ? IsEndOk<Acc, End>
    : false

type Fill<
  List extends unknown[],
  Value,
  Start extends number = 0,
  End extends number = List['length'],

  Acc extends readonly unknown[] = [],
> = List extends [infer R, ...infer Rest]
  ? CanFill<Acc, Start, End> extends true
    ? [Value, ...Fill<Rest, Value, Start, End, [...Acc, 1]>]
    : [R, ...Fill<Rest, Value, Start, End, [...Acc, 1]>]
  : List

// ----------------------------- WITHOUT GREATER THAN ------------------- //

type Fill2<
  List extends unknown[],
  Value,
  Start extends number = 0,
  End extends number = List['length'],

  Acc extends readonly unknown[] = [],
> = List extends [infer First, ...infer Rest]
  ? [...Acc, 'any'][Start] extends undefined // we are not within our range
      ? Fill2<Rest, Value, Start, End, [...Acc, First]>
      : [...Acc, 'any'][End] extends undefined // we are within Start +
          ? Fill2<Rest, Value, Start, End, [...Acc, Value]>
          : Fill2<Rest, Value, Start, End, [...Acc, First]>
  : Acc
```
