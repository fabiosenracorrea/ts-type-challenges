import type { Equal, Expect } from '@type-challenges/utils'
import type { GreaterThan } from '../04425-medium-greater-than/template'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type IsStartOk<Acc extends readonly unknown[], Start extends number, End extends number> =
  GreaterThan<Acc['length'], Start> extends true
    ? true
    : Acc['length'] extends Start
      ? true
      : Start extends 0
        ? End extends 0
          ? false
          : true
        : false

type IsEndOk<Acc extends readonly unknown[], End extends number> = GreaterThan<End, Acc['length']>

type CanFill<Acc extends readonly unknown[], Start extends number, End extends number> =
  IsStartOk<Acc, Start, End> extends true
    ? IsEndOk<Acc, End>
    : false

type Fill<
  List extends unknown[],
  Value,
  Start extends number = 0,
  End extends number = List['length'],

  Acc extends readonly unknown[] = [],
> = List extends [infer R, ...infer Rest]
  ? CanFill<Acc, Start, End> extends true
    ? [Value, ...Fill<Rest, Value, Start, End, [...Acc, 1]>]
    : [R, ...Fill<Rest, Value, Start, End, [...Acc, 1]>]
  : List

// ----------- Not using greater than

type Fill2<
  List extends unknown[],
  Value,
  Start extends number = 0,
  End extends number = List['length'],

  Acc extends readonly unknown[] = [],
> = List extends [infer First, ...infer Rest]
  ? [...Acc, 'any'][Start] extends undefined // we are not within our range
      ? Fill2<Rest, Value, Start, End, [...Acc, First]>
      : [...Acc, 'any'][End] extends undefined
          ? Fill2<Rest, Value, Start, End, [...Acc, Value]> // we are within the start and did not reach the end yet
          : Fill2<Rest, Value, Start, End, [...Acc, First]> // within the start but reached the end
  : Acc
