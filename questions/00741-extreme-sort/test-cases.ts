import type { Equal, Expect } from '@type-challenges/utils'
import type { GreaterThan } from '../04425-medium-greater-than/template'

type cases = [
  Expect<Equal<Sort<[]>, []>>,
  Expect<Equal<Sort<[1]>, [1]>>,
  Expect<Equal<Sort<[2, 1]>, [1, 2]>>,
  Expect<Equal<Sort<[0, 0, 0]>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1]>, [1, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 1, 2]>, [1, 2, 2, 3]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0]>, [0, 0, 0, 0, 1, 2, 3]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]>, [2, 4, 5, 6, 6, 6, 7, 8, 9]>>,
  Expect<Equal<Sort<[1, 1, 2, 1, 1, 1, 1, 1, 1]>, [1, 1, 1, 1, 1, 1, 1, 1, 2]>>,
  Expect<Equal<Sort<[], true>, []>>,
  Expect<Equal<Sort<[1], true>, [1]>>,
  Expect<Equal<Sort<[2, 1], true>, [2, 1]>>,
  Expect<Equal<Sort<[0, 0, 0], true>, [0, 0, 0]>>,
  Expect<Equal<Sort<[1, 2, 3], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1], true>, [3, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 1, 2], true>, [3, 2, 2, 1]>>,
  Expect<Equal<Sort<[3, 2, 0, 1, 0, 0, 0], true>, [3, 2, 1, 0, 0, 0, 0]>>,
  Expect<Equal<Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9], true>, [9, 8, 7, 6, 6, 6, 5, 4, 2]>>,

  Expect<Equal<Sort<[2, 4, 7, 6, 90000, 6, 6, 5, 8, 9], true>, [90000, 9, 8, 7, 6, 6, 6, 5, 4, 2]>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

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
