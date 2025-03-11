import type { GreaterThan } from '../04425-medium-greater-than/template'

/**
 * The GreaterThan helper we created a while back is the MVP!
 *
 * We get around the recursive limit with the tuple limit (1000 > 40)
 */

type TupleFrom<Size extends number, Acc extends readonly 1[] = []>
  = Acc['length'] extends Size
    ? Acc
    : TupleFrom<Size, [...Acc, 1]>

type PlusOne<
  Num extends number,
> = [
  ...TupleFrom<Num>,
  1,
]['length'] & number

type TupleRange<Size extends number, Item extends number = 1, Acc extends readonly number[] = []>
  = Acc['length'] extends Size
    ? Acc
    : TupleRange<Size, PlusOne<Item>, [...Acc, Item]>

type PurgeRange<
  End extends number,
  Range extends number[],
> =
 Range extends [...infer Rest extends number[], infer Last]
   ? Last extends End
     ? Range
     : PurgeRange<End, Rest>
   : []

type InclusiveRange<
  Start extends number,
  End extends number,
> =
  Start extends End
    ? [Start]
    : GreaterThan<Start, End> extends true
      ? []
      : 0 extends Start
        ? [...TupleRange<End, Start>, End] // its created properly
        : PurgeRange<
          End,
          TupleRange<End, Start>
        >
