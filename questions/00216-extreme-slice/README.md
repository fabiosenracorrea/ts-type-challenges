<!--info-header-start--><h1>Slice <img src="https://img.shields.io/badge/-extreme-b11b8d" alt="extreme"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/></h1><blockquote><p>by Anthony Fu <a href="https://github.com/antfu" target="_blank">@antfu</a></p></blockquote><p><a href="https://tsch.js.org/216/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes the three argument. The output should be a subarray of `Arr` from index `Start` to `End`. Indexes with negative numbers should be counted from reversely.

For example

```ts
type Arr = [1, 2, 3, 4, 5]
type Result = Slice<Arr, 2, 4> // expected to be [3, 4]
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/216/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/216/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
type TupleFrom<Size extends number, Acc extends readonly 1[] = []>
  = Acc['length'] extends Size
    ? Acc
    : TupleFrom<Size, [...Acc, 1]>

type ReduceTuple<
  Target extends unknown[],
  ReduceBy extends unknown[],
> =
  ReduceBy extends [unknown, ...infer Rest]
    ? Target extends [unknown, ...infer RestTarget]
      ? ReduceTuple<RestTarget, Rest>
      : []
    : Target

/**
 * To convert the negative index,
 * we do a tuple reduction. We follow this logic because:
 *
 * -1 ==> Arr['length']
 * -2 ==> Arr['length'] - 1
 * -3 ==> Arr['length'] - 2
 *
 * And so on...
 *
 * Because of the index offset,
 * we can simply create a tuple from Arr['length']
 * and take elements out of it by the negative
 * integer.
 *
 * By then, we apply the Slice as normal
 */
type ResolveNegativeIndex<
  ListSize extends number,
  NegativeInteger extends number,
> = [
  ...ReduceTuple<
    TupleFrom<ListSize>,
    TupleFrom<NegativeInteger>
  >,
]['length'] // we do this to safely extract length

type ConvertNegativeIndex<
  List extends unknown[],
  Index extends number,
> =
  `${Index}` extends `-${infer Positive extends number}`
    ? ResolveNegativeIndex<List['length'], Positive>
    : Index

/**
 * This works because of the index offset
 *
 * If [1, 2, 3], Start = 1, End = 3
 *
 * We get:
 *  - [][Start] => [][1] => undefined
 *  - [1][Start] => [1][1] => undefined
 *  - [1, 2][Start] => [1, 2][1] => 1 & [1, 2][3] => undefined === We are within!
 */
type SliceInner<
  List extends unknown[],
  Start extends number = 0,
  End extends number = List['length'],

  Acc extends readonly unknown[] = [],
  Result extends readonly unknown[] = [],
> =
  List extends [infer First, ...infer Rest]
    ? [...Acc, 'any'][Start] extends undefined
        ? SliceInner<Rest, Start, End, [...Acc, First], Result>
        : [...Acc, 'any'][End] extends undefined // We are within range!
            ? SliceInner<Rest, Start, End, [...Acc, First], [...Result, First]>
            : SliceInner<Rest, Start, End, [...Acc, First], Result>
    : Result

type Slice<
  List extends unknown[],
  Start extends number = 0,
  End extends number = List['length'],

  ActualStart = ConvertNegativeIndex<List, Start>,
  ActualEnd = ConvertNegativeIndex<List, End>,
> = SliceInner<
  List,
  ActualStart extends number ? ActualStart : Start,
  ActualEnd extends number ? ActualEnd : End
>
```
