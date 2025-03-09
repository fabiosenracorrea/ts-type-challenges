import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<DropString<'butter fly!', ''>, 'butter fly!'>>,
  Expect<Equal<DropString<'butter fly!', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<'butter fly!', 'but'>, 'er fly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<'    butter fly!        ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'but'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'tub'>, '     e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>>,
  Expect<Equal<DropString<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type StringToUnion<T extends string> =
  T extends `${infer Char}${infer Rest}`
    ? Char | StringToUnion<Rest>
    : never

type DropString<Target extends string, Chars extends string, CharUnion = StringToUnion<Chars>> =
  Target extends `${infer Char}${infer Rest}`
    ? Char extends CharUnion
      ? `${DropString<Rest, Chars, CharUnion>}`
      : `${Char}${DropString<Rest, Chars, CharUnion>}`
    : Target
