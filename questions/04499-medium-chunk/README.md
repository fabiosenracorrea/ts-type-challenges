<!--info-header-start--><h1>Chunk <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23tuple-999" alt="#tuple"/></h1><blockquote><p>by キリサメ qianxi <a href="https://github.com/qianxi0410" target="_blank">@qianxi0410</a></p></blockquote><p><a href="https://tsch.js.org/4499/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Do you know `lodash`? `Chunk` is a very useful function in it, now let's implement it.
`Chunk<T, N>` accepts two required type parameters, the `T` must be a `tuple`, and the `N` must be an `integer >=1`

```ts
type exp1 = Chunk<[1, 2, 3], 2> // expected to be [[1, 2], [3]]
type exp2 = Chunk<[1, 2, 3], 4> // expected to be [[1, 2, 3]]
type exp3 = Chunk<[1, 2, 3], 1> // expected to be [[1], [2], [3]]
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/4499/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/4499/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
/**
 * We use 2 control variables to accumulate
 *  Acc accumulates the Batched array
 *  Current accumulates the current batch
 *
 * Remember: if exposing this on a library/codebase,
 * please create a hidden type that uses the control
 * variables and ony exposes the ones that should be used
 * by the user
 */
type Chunk<
  List extends unknown[],
  MaxSize extends number,
  Acc extends readonly unknown[] = [],
  Current extends readonly unknown[] = [],
> = List extends [infer P, ...infer Rest]
  ? Current['length'] extends MaxSize
    ? Chunk<Rest, MaxSize, [...Acc, Current], [P]>
    : Chunk<Rest, MaxSize, Acc, [...Current, P]>
  : Current extends [unknown, ...unknown[]]
    ? [...Acc, Current]
    : Acc

// --------------- Using 1 control variable ----------------- //

type Chunk2<
  List extends unknown[],
  MaxSize extends number,
  Acc extends readonly unknown[] = [],
> = List extends [infer First, ...infer Rest]
  ? Acc['length'] extends MaxSize
    ? [Acc, ...Chunk2<Rest, MaxSize, [First]>]
    : Chunk2<Rest, MaxSize, [...Acc, First]>
  : Acc['length'] extends 0
    ? []
    : [Acc]
```
