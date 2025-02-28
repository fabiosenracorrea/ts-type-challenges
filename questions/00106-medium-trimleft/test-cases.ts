import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type WhiteSpace = ' ' | '\n' | '\t'

// Recursive remove 1 bad char at a time
type TrimLeft<Target extends string> =
  Target extends `${WhiteSpace}${infer P}`
    ? TrimLeft<P>
    : Target
