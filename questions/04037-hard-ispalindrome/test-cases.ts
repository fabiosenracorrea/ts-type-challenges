import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsPalindrome<'abc'>, false>>,
  Expect<Equal<IsPalindrome<'b'>, true>>,
  Expect<Equal<IsPalindrome<'abca'>, false>>,
  Expect<Equal<IsPalindrome<'abba'>, true>>,
  Expect<Equal<IsPalindrome<'abcba'>, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<2332>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type ReverseStr<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? `${ReverseStr<Rest>}${First}`
    : T

type IsPalindrome<T extends string | number> =
  `${T}` extends ReverseStr<`${T}`>
    ? true
    : false
