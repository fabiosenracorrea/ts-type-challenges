import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
  Expect<Equal<If<boolean, 'a', 2>, 'a' | 2>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>

// ------------------- IMPLEMENTATION --------------------------- //

type If<T extends boolean, Y, N> = T extends true ? Y : N

// ------------------- EXTENDING... --------------------------- //

type extendedCases = [
  // All of the above
  Expect<Equal<IfExtended<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<IfExtended<false, 'a', 2>, 2>>,
  Expect<Equal<IfExtended<boolean, 'a', 2>, 'a' | 2>>,

  // Extras
  Expect<Equal<IfExtended<null, 'a', 2>, 2>>,
  Expect<Equal<IfExtended<undefined | '', 2, 's'>, 's'>>,
]

/**
 * Considers Falsy values too! (Except for NaN)
 */
type Falsy = false | undefined | null | 0 | ''

type IfExtended<T, Y, N> = T extends Falsy ? N : Y

// Note: this does not narrow if something like null | number | string | undefined
// is passed, as we can't guarantee which would be
