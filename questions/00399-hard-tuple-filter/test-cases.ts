import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
  Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
  Expect<Equal<FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined>, [1, 'a', false]>>,
  Expect<Equal<FilterOut<[number | null | undefined, never], never | null | undefined>, [number | null | undefined]>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type FilterOut<List extends readonly unknown[], RemoveType> =
  List extends [infer Next, ...infer Rest]
    ? [Next] extends [RemoveType] // compare using the never check
        ? FilterOut<Rest, RemoveType>
        : [Next, ...FilterOut<Rest, RemoveType>]
    : []
