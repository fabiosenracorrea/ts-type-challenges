type LengthOfString<T extends string, Acc extends readonly string[] = []> =
  T extends `${infer P}${infer R}`
    ? P extends ''
      ? Acc['length']
      : LengthOfString<R, [...Acc, P]>
    : Acc['length']
