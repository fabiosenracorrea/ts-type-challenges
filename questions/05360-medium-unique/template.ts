import type { Equal } from '@type-challenges/utils'

type IsPresent<T, List extends readonly unknown[]> =
  List extends [infer First, ...infer Rest]
    ? Equal<T, First> extends true
      ? true
      : IsPresent<T, Rest>
    : false

type Unique<T extends unknown[], Acc extends readonly unknown[] = []> =
  T extends [infer Item, ...infer Rest]
    ? IsPresent<Item, Acc> extends true
      ? Unique<Rest, Acc>
      : Unique<Rest, [...Acc, Item]>
    : Acc
