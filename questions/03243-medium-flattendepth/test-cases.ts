import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type Flatt<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? First extends any[]
      ? Flatt<[...First, ...Rest]>
      : [First, ...Flatt<Rest>]
    : T

type FlattenDepth<T extends any[], Depth extends number = 1, Count extends readonly any[] = []> =
  Count['length'] extends Depth
    ? T
    : T extends [infer First, ...infer Rest]
      ? First extends any[]
        ? FlattenDepth<[...First, ...FlattenDepth<Rest>], Depth, [...Count, 1]>
        : [First, ...FlattenDepth<Rest, Depth, Count>]
      : T
