import type { Equal } from '../../utils'

// Basically we dissect each and every item and "cheat" with the Equal helper
// this works around the checks when we have like 1 extends 1 | 2 or the other way around

// This definitely should not be marked as easy tho!

type Includes<T extends readonly unknown[], U> =
  T extends [infer First, ...infer Rest]
    ? Equal<First, U> extends true
      ? true
      : Includes<Rest, U>
    : false
