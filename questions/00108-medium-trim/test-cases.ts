import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type WhiteSpace = ' ' | '\n' | '\t'

// Recursive remove 1 bad char at a time, each side
type Trim<Text extends string> =
  Text extends `${WhiteSpace}${infer P}`
    ? Trim<P>
    : Text extends `${infer P}${WhiteSpace}`
      ? Trim<P>
      : Text
