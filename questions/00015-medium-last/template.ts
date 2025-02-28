/**
 * Solution 1
 *
 * length magic
 *
 * We can't use T['length'] as, obviously, thats lastIndex+1
 *
 * but...
 */

type Last<T extends readonly unknown[]> =
  T extends [infer _First, ...infer Rest]
    ? T[Rest['length']]
    : never

// ------------------------------------------------------------- //

/**
 * Solution 2
 *
 * Recursive Extraction
 */

type ArrayHasItem<T extends unknown[]> =
  T extends [infer P, ...infer _rest]
    ? P extends never
      ? false
      : true
    : false

type LastR<T extends readonly unknown[]> =
  T extends [infer First, ...infer Rest]
    ? ArrayHasItem<Rest> extends true
      ? LastR<Rest>
      : First
    : never

// ------------------------------------------------------------- //

/**
 * Solution 3
 *
 * Inverting the rest param
 *
 * Taken from youtube.com/watch?v=ZS6zfnWdHr8
 */

type LastT<T extends readonly unknown[]> =
  T extends [...infer _Rest, infer LastItem]
    ? LastItem
    : never
