type IsLetter_<T extends string> = Uppercase<T> extends Lowercase<T> ? false : true

/**
 * Removes the '_' only if the following char is a letter
 */
type ShouldRemoveChar<Char extends string, RemainingChars extends string> =
  Char extends '_'
    ? RemainingChars extends `${infer Next}${string}`
      ? IsLetter_<Next>
      : false
    : false

type ParseNext<
  Char extends string,
  ShouldUpper extends boolean,
  RemainingChars extends string,
> =
  ShouldRemoveChar<Char, RemainingChars> extends true
    ? ''
    : ShouldUpper extends true ? Uppercase<Char> : Lowercase<Char>

type CamelCase<
  T extends string,
  Transform extends boolean = false,
> =
  T extends `${infer NextChar}${infer Rest}`
    ? `${
      ParseNext<NextChar, Transform, Rest>
    }${
      CamelCase<Rest, NextChar extends '_' ? true : false>
    }`

    : Lowercase<T>
