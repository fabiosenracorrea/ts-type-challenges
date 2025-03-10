import type { Equal } from '@type-challenges/utils'

type Mutable_<T, Keys extends keyof T> = {
  -readonly [K in Keys]: T[K]
}

/**
 * We basically check for strict equality on the current object for each key
 *  => It produces either { a: string } or { readonly a: string }
 * Then we compare that to an ensured mutable version. If equal = mutable
 * otherwise, exclude.
 *
 * Remember `a` | never = `a`
 */
type MutableKeys<T> = {
  [K in keyof T]-?: Equal<{ [Q in K]: T[K] }, Mutable_<T, K>> extends true ? K : never
}[keyof T]
