/**
 * This works because tuples have defined length values, while arrays have generic number
 *
 * This means:
 *
 * number extends 2 = false
 * number extends number = true
 */
type IsTuple<T> =
  [T] extends [never]
    ? false
    : T extends readonly unknown[]
      ? number extends T['length'] ? false : true
      : false
