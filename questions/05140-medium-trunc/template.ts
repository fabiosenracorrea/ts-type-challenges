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
