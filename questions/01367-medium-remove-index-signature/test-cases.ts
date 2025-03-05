import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo: () => void
}

type Bar = {
  [key: number]: any
  bar: () => void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar]: () => void
}

type Baz = {
  bar: () => void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo: () => void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar: () => void, 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar]: () => void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar: () => void, baz: string }>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

/**
 * This works because:
 *  'hello' extends string => true
 *  string extends 'hello' => false
 *
 * We want only the actual defined keys (eg 'hello') to pass on
 */
type RemovePrimitive<K> =
  string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K

type RemoveIndexSignature<T> = {
  [K in keyof T as RemovePrimitive<K>]: T[K];
}
