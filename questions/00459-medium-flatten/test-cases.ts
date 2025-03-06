import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar', 2: 10 }, 'foobar']>, [{ foo: 'bar', 2: 10 }, 'foobar']>>,
]

// @ts-expect-error
type error = Flatten<'1'>

// ------------------- IMPLEMENTATION --------------------------- //

type Flatten<T extends any[], Result extends any[] = []> =
  T extends [infer First, ...infer Rest]
    ? First extends any[]
      ? Flatten<Rest, [...Result, ...Flatten<First>]>
      : Flatten<Rest, [...Result, First]>
    : Result

type Flatt<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? First extends any[]
      ? Flatt<[...First, ...Rest]>
      : [First, ...Flatt<Rest>]
    : T
