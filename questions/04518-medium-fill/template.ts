import type { GreaterThan } from '../04425-medium-greater-than/template'

/**
 * We did greater than before arriving to this one
 */

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

// ----------------------------- WITHOUT GREATER THAN ------------------- //

type Fill2<
  List extends unknown[],
  Value,
  Start extends number = 0,
  End extends number = List['length'],

  Acc extends readonly unknown[] = [],
> = List extends [infer First, ...infer Rest]
  ? [...Acc, 'any'][Start] extends undefined // we are not within our range
      ? Fill2<Rest, Value, Start, End, [...Acc, First]>
      : [...Acc, 'any'][End] extends undefined // we are within Start +
          ? Fill2<Rest, Value, Start, End, [...Acc, Value]>
          : Fill2<Rest, Value, Start, End, [...Acc, First]>
  : Acc
