import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type Chunk<
  List extends unknown[],
  MaxSize extends number,
  Acc extends readonly unknown[] = [],
  Current extends readonly unknown[] = [],
> = List extends [infer P, ...infer Rest]
  ? Current['length'] extends MaxSize
    ? Chunk<Rest, MaxSize, [...Acc, Current], [P]>
    : Chunk<Rest, MaxSize, Acc, [...Current, P]>
  : Current extends [unknown, ...unknown[]]
    ? [...Acc, Current]
    : Acc

// --------------- Using 1 control variable ----------------- //

type Chunk2<
  List extends unknown[],
  MaxSize extends number,
  Acc extends readonly unknown[] = [],
> = List extends [infer First, ...infer Rest]
  ? Acc['length'] extends MaxSize
    ? [Acc, ...Chunk2<Rest, MaxSize, [First]>]
    : Chunk2<Rest, MaxSize, [...Acc, First]>
  : Acc['length'] extends 0
    ? []
    : [Acc]
