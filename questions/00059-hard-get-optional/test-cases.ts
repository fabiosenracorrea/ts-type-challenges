import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetOptional<{ foo: number, bar?: string }>, { bar?: string }>>,
  Expect<Equal<GetOptional<{ foo: undefined, bar?: undefined }>, { bar?: undefined }>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type GetOptional<T extends Record<string, unknown>, Req extends T = Required<T>> = {
  [K in keyof T as T[K] extends Req[K] ? never : K]?: T[K]
}
