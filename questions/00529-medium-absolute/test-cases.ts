import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type Absolute<T extends number | string | bigint> =
  T extends number | bigint
    ? Absolute<`${T}`>
    : T extends `-${infer N}`
      ? N
      : T extends `${infer B}n`
        ? B
        : T

// The string conversion takes care of the bigints automatically
type Absolute2<T extends number | string | bigint> =
  `${T}` extends `-${infer N}`
    ? N
    : T
