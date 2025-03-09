import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo__bar'>, 'foo_Bar'>>,
  Expect<Equal<CamelCase<'foo_$bar'>, 'foo_$bar'>>,
  Expect<Equal<CamelCase<'foo_bar_'>, 'fooBar_'>>,
  Expect<Equal<CamelCase<'foo_bar__'>, 'fooBar__'>>,
  Expect<Equal<CamelCase<'foo_bar_$'>, 'fooBar_$'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type IsLetter<T extends string> = Uppercase<T> extends Lowercase<T> ? false : true

/**
 * Removes the '_' only if the following char is a letter
 */
type ShouldRemoveChar<Char extends string, RemainingChars extends string> =
  Char extends '_'
    ? RemainingChars extends `${infer Next}${string}`
      ? IsLetter<Next>
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
