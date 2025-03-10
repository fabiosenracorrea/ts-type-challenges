import type { Equal } from '@type-challenges/utils'

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
