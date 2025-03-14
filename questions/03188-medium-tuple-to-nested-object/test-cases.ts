import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type TupleToNestedObject<T extends PropertyKey[], Value> =
  T extends [...infer P extends PropertyKey[], infer Last extends PropertyKey]
    ? TupleToNestedObject<P, { [K in Last]: Value }>
    : Value
