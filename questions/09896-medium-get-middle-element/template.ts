type GetMiddleElement<T extends unknown[]> =
  T extends [infer First, ...infer Middle, infer Last]
    ? Middle['length'] extends 0
      ? [First, Last]
      : GetMiddleElement<Middle>
    : T
