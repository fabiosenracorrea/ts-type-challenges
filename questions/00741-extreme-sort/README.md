<!--info-header-start--><h1>Sort <img src="https://img.shields.io/badge/-extreme-b11b8d" alt="extreme"/> <img src="https://img.shields.io/badge/-%23infer-999" alt="#infer"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/></h1><blockquote><p>by Sg <a href="https://github.com/suica" target="_blank">@suica</a></p></blockquote><p><a href="https://tsch.js.org/741/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

In this challenge, you are required to sort natural number arrays in either ascend order or descent order.

Ascend order examples:
```ts
Sort<[]> // []
Sort<[1]> // [1]
Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]> //  [2, 4, 5, 6, 6, 6, 7, 8, 9]
```

The `Sort` type should also accept a boolean type. When it is `true`, the sorted result should be in descent order. Some examples:

```ts
Sort<[3, 2, 1], true> // [3, 2, 1]
Sort<[3, 2, 0, 1, 0, 0, 0], true> // [3, 2, 1, 0, 0, 0, 0]
```

Extra challenges:
1. Support natural numbers with 15+ digits.
2. Support float numbers.


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/741/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/741/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
import type { GreaterThan } from '../04425-medium-greater-than/template'

/**
 * Once again the Greater than coming in clutch
 *
 * [My rule is clear, if we've completed before, we can use it!]
 *
 * I'm sure we could play around implementing the different sorting algos
 * we have out there, but a measly buble up is enough for what we have :)
 */

type BubleUp<
  List extends number[],
  Item extends number,
  Acc extends number[] = [],
> =
  List extends [infer Next extends number, ...infer Rest extends number[]]
    ? GreaterThan<Next, Item> extends true
      ? BubleUp<Rest, Next, [...Acc, Item]>
      : BubleUp<Rest, Item, [...Acc, Next]>
    : [...Acc, Item]

type ReverseArr<T extends unknown[]> =
  T extends [infer First, ...infer Rest]
    ? [...ReverseArr<Rest>, First]
    : []

type SortDesc<
  List extends number[],
> =
  List extends [
    infer First extends number,
    ...infer Last extends number[],
  ] ?
    BubleUp<Last, First> extends [
      ...infer LeftToSort extends number[],
      infer Last extends number,
    ]
      ? [
          ...SortDesc<LeftToSort>,
          Last,
        ]
      : never
    : List

type Sort<
  List extends number[],

  ASC extends boolean = false,
> =
 ASC extends true
   ? ReverseArr<SortDesc<List>>
   : SortDesc<List>
```
