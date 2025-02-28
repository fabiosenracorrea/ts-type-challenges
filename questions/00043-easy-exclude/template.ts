/**
 * Note: this works because any type operation
 * against a Union is distributive.
 *
 * That is, if we have:
 *
 * Exclude<string | number, string>
 *
 * Result = (string extends string ? never : string) | (number extends string ? never : number)
 * Result = (never) | (number)
 * Result = number
 */
type MyExclude<T, U> = T extends U ? never : T
