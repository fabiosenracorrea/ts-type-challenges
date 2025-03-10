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

/**
 * Solution 2
 *
 * youtube.com/watch?v=8-Z_MbkjkkY
 *
 * This works because the last unknown cancels out
 * any item that does not exist on any following interaction
 */
  type Intersection2<List extends readonly unknown[]> =
    List extends [infer Head, ...infer Rest]
      ? Head extends unknown[]
        ? Extract<Head[number], Intersection<Rest>>
        : Extract<Head, Intersection<Rest>>
      : unknown

/**
 * Solution 3
 *
 * youtube.com/watch?v=8-Z_MbkjkkY
 *
 * This one kinda illustrates the solution i came up with
 * in an ultra simplified manner
 *
 * type a1 = 2 | 3 | 4
 * type a2 = 2
 * type a3 = a1 & a2 ==> 2!!!
 *
 * So we basically & all the items from the array and the common factors come out
 *
 * This is the best one to picture whats going on
 */
  type Intersection3<List extends readonly unknown[]> =
    List extends [infer Head, ...infer Rest]
      ?
        & (Head extends unknown[] ? Head[number] : Head)
        & Intersection3<Rest>
      : unknown
