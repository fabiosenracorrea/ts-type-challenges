type Integer<N extends number> =
  `${N}` extends `${number}.${number}`
    ? never
    : number extends N // handles Integer<number>
      ? never
      : N
