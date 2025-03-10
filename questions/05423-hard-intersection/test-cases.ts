import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Intersection<[[1, 2], [2, 3], [2, 2]]>, 2>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>, 2 | 3>>,
  Expect<Equal<Intersection<[[1, 2], [3, 4], [5, 6]]>, never>>,
  Expect<Equal<Intersection<[[1, 2, 3], [2, 3, 4], 3]>, 3>>,
  Expect<Equal<Intersection<[
    [1, 2, 3],
    2 | 3 | 4,
    2 | 3,
  ]>, 2 | 3>>,
  Expect<Equal<Intersection<[
    [1, 2, 3],
    2,
    3,
  ]>, never>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type IsPresent<Entry, LookupList extends readonly unknown[]> =
  LookupList extends [infer Next, ...infer Rest]
    ? Next extends unknown[]
      ? Rest extends [unknown, ...unknown[]]
        ? IsPresent<Entry, Next> & IsPresent<Entry, Rest>
        : IsPresent<Entry, Next>
      : Equal<Entry, Next> extends true
        ? Entry
        : IsPresent<Entry, Rest>
    : never

/**
 * We do this to make it easier to compare, as
 * [
 *  [1, 2, 3]
 *  3,
 *  2
 * ]
 *
 * Should be treated as
 * [
 *  [1, 2, 3]
 *  [3],
 *  [2]
 * ]
 *
 * (see the last test)
 */
type UnFlat<List extends readonly unknown[]> =
  List extends [infer Next, ...infer Rest]
    ? Next extends unknown[]
      ? [Next, ...UnFlat<Rest>]
      : [[Next], ...UnFlat<Rest>]
    : []

type Intersection<List extends readonly unknown[]> =
  List extends [infer Start extends readonly unknown[], ...infer Rest]
    ? Start extends [infer First, ...infer StartRest]
      ? IsPresent<First, Rest> | Intersection<[StartRest, ...UnFlat<Rest>]>
      : never
    : never
