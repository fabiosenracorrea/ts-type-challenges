import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type Zip<Arr1 extends unknown[], Arr2 extends unknown[]> =
  Arr1 extends [infer First1, ...infer Rest1]
    ? Arr2 extends [infer First2, ...infer Rest2]
      ? [[First1, First2], ...Zip<Rest1, Rest2>]
      : []
    : []
