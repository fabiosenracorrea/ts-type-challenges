import type { Equal, Expect } from '@type-challenges/utils'

type foo = {
  foo: string
  bars: [{ foo: string }]
}

type Foo = {
  Foo: string
  Bars: [{
    Foo: string
  }]
}

type cases = [
  Expect<Equal<Foo, CapitalizeNestObjectKeys<foo>>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type HandleArray<T extends unknown[]> =
  T extends [infer Next extends Record<string, unknown>, ...infer Rest]
    ? [CapitalizeNestObjectKeys<Next>, ...HandleArray<Rest>]
    : T

type CapitalizeNestObjectKeys<T> = {
  [K in (keyof T & string) as Capitalize<K>]:
  T[K] extends Record<string, unknown>
    ? CapitalizeNestObjectKeys<T[K]>
    : T[K] extends unknown[]
      ? HandleArray<T[K]>
      : T[K]
}
