type Falsy = false | null | [] | undefined | 0 | ''

type IsFalsy<T> =
  T extends Falsy
    ? true
    : keyof T extends never // empty obj check
      ? true
      : false

type AnyOf<T extends unknown[]> =
  T extends [infer First, ...infer Rest]
    ? IsFalsy<First> extends true
      ? AnyOf<Rest>
      : true
    : false

/**
 * Solution 2 - elegant empty obj check
 */
type Falsy2 = false | null | [] | undefined | 0 | '' | Record<string, never>

type AnyOf2<T extends unknown[]> =
  T extends [infer First, ...infer Rest]
    ? First extends Falsy2
      ? AnyOf<Rest>
      : true
    : false

/**
 * Solution 3 - Array[number]!
 *
 * If all the items extends Falsy, nothing inside of it matters
 */
type AnyOf3<T extends unknown[]> =
  T[number] extends Falsy2
    ? false
    : true
