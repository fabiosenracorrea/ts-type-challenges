import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

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
