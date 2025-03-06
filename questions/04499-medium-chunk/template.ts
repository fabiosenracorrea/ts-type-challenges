/**
 * We use 2 control variables to accumulate
 *  Acc accumulates the Batched array
 *  Current accumulates the current batch
 *
 * Remember: if exposing this on a library/codebase,
 * please create a hidden type that uses the control
 * variables and ony exposes the ones that should be used
 * by the user
 */
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
