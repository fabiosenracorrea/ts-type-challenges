type LengthOfString2<T extends string, Acc extends readonly 1[] = []> =
  T extends `${infer _Char}${infer Rest}`
    ? LengthOfString2<Rest, [...Acc, 1]>
    : Acc['length']
