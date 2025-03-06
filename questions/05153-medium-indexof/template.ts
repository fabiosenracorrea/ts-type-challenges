import type { Equal } from '@type-challenges/utils'

// ------------------- IMPLEMENTATION --------------------------- //

type IndexOf<List extends unknown[], Target, Acc extends readonly unknown[] = []>
  = List extends [infer First, ...infer Rest]
    ? Equal<First, Target> extends true
      ? Acc['length']
      : IndexOf<Rest, Target, [...Acc, 1]>
    : -1
