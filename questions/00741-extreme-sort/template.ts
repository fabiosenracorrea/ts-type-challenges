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
