// Similar approach to the Permutation exercise
type IsUnion<T, Acc = T> =
  [T] extends [never]
    ? false
    : Acc extends Acc
      ? [Exclude<T, Acc>] extends [never]
          ? false
          : true
      : false

/**
 * Solution 2
 *
 * from youtube.com/watch?v=n8YBd3gWBuc
 */
type UnionToTuple<T, Copy = T> =
  [T] extends [never]
    ? []
    : T extends Copy
      ? [T, ...UnionToTuple<Exclude<Copy, T>>]
      : []

type IsUnion2<T> = UnionToTuple<T>['length'] extends 1 ? false : true
