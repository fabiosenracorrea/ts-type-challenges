import type { Equal } from '@type-challenges/utils'

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
