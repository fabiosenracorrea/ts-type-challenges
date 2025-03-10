type ReverseStr<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? `${ReverseStr<Rest>}${First}`
    : T

type IsPalindrome<T extends string | number> =
  `${T}` extends ReverseStr<`${T}`>
    ? true
    : false
