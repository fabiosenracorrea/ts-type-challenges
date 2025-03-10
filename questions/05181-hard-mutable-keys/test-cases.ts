/* eslint-disable ts/no-empty-object-type */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MutableKeys<{ a: number, readonly b: string }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined, readonly b: undefined }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined, readonly b?: undefined, c: string, d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<MutableKeys<{}>, never>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type Mutable<T, Keys extends keyof T> = {
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
  [K in keyof T]-?: Equal<{ [Q in K]: T[K] }, Mutable<T, K>> extends true ? K : never
}[keyof T]
