/* eslint-disable ts/no-unsafe-function-type */
/* eslint-disable ts/no-empty-object-type */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsAny<any>, true>>,

  Expect<Equal<IsAny<undefined>, false>>,
  Expect<Equal<IsAny<unknown>, false>>,
  Expect<Equal<IsAny<never>, false>>,
  Expect<Equal<IsAny<string>, false>>,

  // Added to further proof
  Expect<Equal<IsAny<Record<string, string>>, false>>,
  Expect<Equal<IsAny<object>, false>>,
  Expect<Equal<IsAny<() => 1>, false>>,
  Expect<Equal<IsAny<() => any>, false>>,
  Expect<Equal<IsAny<Function>, false>>,
  Expect<Equal<IsAny<{}>, false>>,
  Expect<Equal<IsAny<null>, false>>,
  Expect<Equal<IsAny<unknown[]>, false>>,
  Expect<Equal<IsAny<any[]>, false>>,
  Expect<Equal<IsAny<Record<PropertyKey, string>>, false>>,
  Expect<Equal<IsAny<Record<PropertyKey, any>>, false>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type IsNever<T> = [T] extends [never] ? true : false

/**
 * First Solution i came up with
 */
type IsAny<T> =
  IsNever<T> extends true
    ? false
    : IsNever<keyof T> extends true
      ? false
      : T extends T & 1
        ? true
        : false

/**
 * Then i realized the keyof unknown
 * check was redundant
 */
type IsAny2<T> =
  IsNever<T> extends true
    ? false
    : T extends T & 1
      ? true
      : false

/**
 * Which is almost the normal IsAny check we find online:
 *
 * This works because the any value & 1 results into:
 *
 * - 1 if T = unknown
 * - 1 if T = number
 * - never for anything other than explicit any
 */
type IsAny3<T> =
  0 extends T & 1
    ? true
    : false
