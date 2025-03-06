import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<0.2>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'.3'>, '0'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-.3'>, '-0'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type HandleDecimal<N> =
   N extends ''
     ? '0'
     : N extends '-'
       ? '-0'
       : N

type Trunc<T extends number | string> =
  `${T}` extends `${infer N}.${infer _Decimal}`
    ? HandleDecimal<N>
    : `${T}` extends `${infer N extends number}`
      ? `${N}`
      : 'NaN'
