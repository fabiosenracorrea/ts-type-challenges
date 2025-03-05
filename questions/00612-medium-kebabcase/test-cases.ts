import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

// Holding a value...
type KebabCase1<T extends string, Result extends string = ''> =
  T extends `${infer P}${infer Rest}`
    ? P extends Exclude<Uppercase<P>, '-' | '_'>
      ? KebabCase1<Rest, Result extends '' ? `${Lowercase<P>}` : `${Result}-${Lowercase<P>}`>
      : KebabCase1<Rest, `${Result}${P}`>
    : Result

type KebabCase<T extends string> =
  T extends `${infer P}${infer R}`
    ? R extends Uncapitalize<R>
      ? `${Lowercase<P>}${KebabCase<R>}`
      : `${Lowercase<P>}-${KebabCase<R>}`
    : T
