type __StringToUnion__<T extends string> =
  T extends `${infer Char}${infer Rest}`
    ? Char | __StringToUnion__<Rest>
    : never

type DropString<Target extends string, Chars extends string, CharUnion = __StringToUnion__<Chars>> =
  Target extends `${infer Char}${infer Rest}`
    ? Char extends CharUnion
      ? `${DropString<Rest, Chars, CharUnion>}`
      : `${Char}${DropString<Rest, Chars, CharUnion>}`
    : Target
