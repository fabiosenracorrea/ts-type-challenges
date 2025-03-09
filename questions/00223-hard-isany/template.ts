type IsNever_<T> = [T] extends [never] ? true : false

/**
 * First Solution i came up with
 */
type IsAny<T> =
  IsNever_<T> extends true
    ? false
    : IsNever_<keyof T> extends true
      ? false
      : T extends T & 1
        ? true
        : false

/**
 * Then i realized the keyof unknown
 * check was redundant
 */
type IsAny2<T> =
  IsNever_<T> extends true
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
