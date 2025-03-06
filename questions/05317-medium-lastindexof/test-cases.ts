import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type LastIndexOf<
  List extends unknown[],
  Target,

  Acc extends readonly 1[] = [],
  LastIndex = -1,
> = List extends [infer P, ...infer Rest]
  ? Equal<Target, P> extends true
    ? LastIndexOf<Rest, Target, [...Acc, 1], Acc['length']>
    : LastIndexOf<Rest, Target, [...Acc, 1], LastIndex>
  : LastIndex
