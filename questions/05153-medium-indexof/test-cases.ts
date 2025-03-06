import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type IndexOf<List extends unknown[], Target, Acc extends readonly unknown[] = []>
  = List extends [infer First, ...infer Rest]
    ? Equal<First, Target> extends true
      ? Acc['length']
      : IndexOf<Rest, Target, [...Acc, 1]>
    : -1
