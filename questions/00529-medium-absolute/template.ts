type Absolute<T extends number | string | bigint> =
  T extends number | bigint
    ? Absolute<`${T}`>
    : T extends `-${infer N}`
      ? N
      : T extends `${infer B}n`
        ? B
        : T
