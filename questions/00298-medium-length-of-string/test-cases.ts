import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type LengthOfString<T extends string, Acc extends readonly string[] = []> =
  T extends `${infer P}${infer R}`
    ? P extends ''
      ? Acc['length']
      : LengthOfString<R, [...Acc, P]>
    : Acc['length']
