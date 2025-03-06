import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

// We could add a never check if necessary....
type EnsureArray<T> = T extends unknown[] ? T : [T]

type Without<T extends unknown[], ToRemove>
  = T extends [infer R, ...infer Rest]
    ? R extends EnsureArray<ToRemove>[number]
      ? Without<Rest, ToRemove>
      : [R, ...Without<Rest, ToRemove>]
    : T
