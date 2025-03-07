import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<OptionalKeys<{ a: number, b?: string }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined, b?: undefined }>, 'b'>>,
  Expect<Equal<OptionalKeys<{ a: undefined, b?: undefined, c?: string, d?: null }>, 'b' | 'c' | 'd'>>,
  // eslint-disable-next-line ts/no-empty-object-type
  Expect<Equal<OptionalKeys<{}>, never>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

/**
 * GetOptional was done before this one ;)
 */
type GetOptional<T extends Record<string, unknown>, Req extends T = Required<T>> = {
  [K in keyof T as T[K] extends Req[K] ? never : K]?: T[K]
}

type OptionalKeys<T extends Record<string, unknown>> = keyof GetOptional<T>
