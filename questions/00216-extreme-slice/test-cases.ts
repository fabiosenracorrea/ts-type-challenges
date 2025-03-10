import type { Equal, Expect } from '@type-challenges/utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1, 2, 3, 4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3, 4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type TupleFrom<Size extends number, Acc extends readonly 1[] = []>
  = Acc['length'] extends Size
    ? Acc
    : TupleFrom<Size, [...Acc, 1]>

type ReduceTuple<
  Target extends unknown[],
  ReduceBy extends unknown[],
> =
  ReduceBy extends [unknown, ...infer Rest]
    ? Target extends [unknown, ...infer RestTarget]
      ? ReduceTuple<RestTarget, Rest>
      : []
    : Target

/**
 * To convert the negative index,
 * we do a tuple reduction. We follow this logic because:
 *
 * -1 ==> Arr['length']
 * -2 ==> Arr['length'] - 1
 * -3 ==> Arr['length'] - 2
 *
 * And so on...
 *
 * Because of the index offset,
 * we can simply create a tuple from Arr['length']
 * and take elements out of it by the negative
 * integer.
 *
 * By then, we apply the Slice as normal
 */
type ResolveNegativeIndex<
  ListSize extends number,
  NegativeInteger extends number,
> = [
  ...ReduceTuple<
    TupleFrom<ListSize>,
    TupleFrom<NegativeInteger>
  >,
]['length'] // we do this to safely extract length

type ConvertNegativeIndex<
  List extends unknown[],
  Index extends number,
> =
  `${Index}` extends `-${infer Positive extends number}`
    ? ResolveNegativeIndex<List['length'], Positive>
    : Index

/**
 * This works because of the index offset
 *
 * If [1, 2, 3], Start = 1, End = 3
 *
 * We get:
 *  - [][Start] => [][1] => undefined
 *  - [1][Start] => [1][1] => undefined
 *  - [1, 2][Start] => [1, 2][1] => 1 & [1, 2][3] => undefined === We are within!
 */
type SliceInner<
  List extends unknown[],
  Start extends number = 0,
  End extends number = List['length'],

  Acc extends readonly unknown[] = [],
  Result extends readonly unknown[] = [],
> =
  List extends [infer First, ...infer Rest]
    ? [...Acc, 'any'][Start] extends undefined
        ? SliceInner<Rest, Start, End, [...Acc, First], Result>
        : [...Acc, 'any'][End] extends undefined // We are within range!
            ? SliceInner<Rest, Start, End, [...Acc, First], [...Result, First]>
            : SliceInner<Rest, Start, End, [...Acc, First], Result>
    : Result

type Slice<
  List extends unknown[],
  Start extends number = 0,
  End extends number = List['length'],

  ActualStart = ConvertNegativeIndex<List, Start>,
  ActualEnd = ConvertNegativeIndex<List, End>,
> = SliceInner<
  List,
  ActualStart extends number ? ActualStart : Start,
  ActualEnd extends number ? ActualEnd : End
>
