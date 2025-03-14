import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type Prettify<T> = {
  [K in keyof T]: T[K]
}

type Merge<T, U> = Prettify<
  Omit<T, keyof U> & U
>
