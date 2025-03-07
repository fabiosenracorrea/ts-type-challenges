import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<RequiredKeys<{ a: number, b?: string }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined, b?: undefined }>, 'a'>>,
  Expect<Equal<RequiredKeys<{ a: undefined, b?: undefined, c: string, d: null }>, 'a' | 'c' | 'd'>>,
  // eslint-disable-next-line ts/no-empty-object-type
  Expect<Equal<RequiredKeys<{}>, never>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

/**
 * GetRequired was done before this one ;)
 */
type GetRequired<T extends Record<string, unknown>, Req extends T = Required<T>> = {
  [K in keyof T as T[K] extends Req[K] ? K : never]: T[K]
}

type RequiredKeys<T extends Record<string, unknown>> = keyof GetRequired<T>
