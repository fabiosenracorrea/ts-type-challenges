import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsRequiredKey<{ a: number, b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: undefined, b: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey<{ a: number, b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: number, b?: string }, 'b' | 'a'>, false>>,
  Expect<Equal<IsRequiredKey<{ a: undefined, b: undefined }, 'b' | 'a'>, true>>,

  Expect<Equal<IsRequiredKey2<{ a: number, b?: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey2<{ a: undefined, b: string }, 'a'>, true>>,
  Expect<Equal<IsRequiredKey2<{ a: number, b?: string }, 'b'>, false>>,
  Expect<Equal<IsRequiredKey2<{ a: number, b?: string }, 'b' | 'a'>, false>>,
  Expect<Equal<IsRequiredKey2<{ a: undefined, b: undefined }, 'b' | 'a'>, true>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type GetRequired<T extends Record<string, unknown>, Req extends T = Required<T>> = {
  [K in keyof T as T[K] extends Req[K] ? K : never]: T[K]
}

type RequiredKeys<T extends Record<string, unknown>> = keyof GetRequired<T>

/**
 * This check is distributive, meaning:
 *
 * Is<a> => true
 * Is<b> => false
 * Result = true | false = boolean
 *
 * To account for this, we perform the distributive check
 * and verify if they all colide to `true`
 *
 * Important to note the order of X extends Y
 */
type InnerCheck<T extends Record<string, unknown>, Keys extends keyof T> = Keys extends RequiredKeys<T> ? true : false

type IsRequiredKey<T extends Record<string, unknown>, Keys extends keyof T> = InnerCheck<T, Keys> extends true ? true : false

// More direct
type IsRequiredKey2<T, K extends keyof T> =
  T[K] extends Required<T>[K]
    ? true
    : false
