/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
// Disabled to not fix the format, its easier to read like that

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyCapitalize<'foobar'>, 'Foobar'>>,
  Expect<Equal<MyCapitalize<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<MyCapitalize<'foo bar'>, 'Foo bar'>>,
  Expect<Equal<MyCapitalize<''>, ''>>,
  Expect<Equal<MyCapitalize<'a'>, 'A'>>,
  Expect<Equal<MyCapitalize<'b'>, 'B'>>,
  Expect<Equal<MyCapitalize<'c'>, 'C'>>,
  Expect<Equal<MyCapitalize<'d'>, 'D'>>,
  Expect<Equal<MyCapitalize<'e'>, 'E'>>,
  Expect<Equal<MyCapitalize<'f'>, 'F'>>,
  Expect<Equal<MyCapitalize<'g'>, 'G'>>,
  Expect<Equal<MyCapitalize<'h'>, 'H'>>,
  Expect<Equal<MyCapitalize<'i'>, 'I'>>,
  Expect<Equal<MyCapitalize<'j'>, 'J'>>,
  Expect<Equal<MyCapitalize<'k'>, 'K'>>,
  Expect<Equal<MyCapitalize<'l'>, 'L'>>,
  Expect<Equal<MyCapitalize<'m'>, 'M'>>,
  Expect<Equal<MyCapitalize<'n'>, 'N'>>,
  Expect<Equal<MyCapitalize<'o'>, 'O'>>,
  Expect<Equal<MyCapitalize<'p'>, 'P'>>,
  Expect<Equal<MyCapitalize<'q'>, 'Q'>>,
  Expect<Equal<MyCapitalize<'r'>, 'R'>>,
  Expect<Equal<MyCapitalize<'s'>, 'S'>>,
  Expect<Equal<MyCapitalize<'t'>, 'T'>>,
  Expect<Equal<MyCapitalize<'u'>, 'U'>>,
  Expect<Equal<MyCapitalize<'v'>, 'V'>>,
  Expect<Equal<MyCapitalize<'w'>, 'W'>>,
  Expect<Equal<MyCapitalize<'x'>, 'X'>>,
  Expect<Equal<MyCapitalize<'y'>, 'Y'>>,
  Expect<Equal<MyCapitalize<'z'>, 'Z'>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type MyCapitalize<Text extends string> =
      Text extends `a${infer P}` ? `A${P}`
    : Text extends `b${infer P}` ? `B${P}`
    : Text extends `c${infer P}` ? `C${P}`
    : Text extends `d${infer P}` ? `D${P}`
    : Text extends `e${infer P}` ? `E${P}`
    : Text extends `f${infer P}` ? `F${P}`
    : Text extends `g${infer P}` ? `G${P}`
    : Text extends `h${infer P}` ? `H${P}`
    : Text extends `i${infer P}` ? `I${P}`
    : Text extends `j${infer P}` ? `J${P}`
    : Text extends `k${infer P}` ? `K${P}`
    : Text extends `l${infer P}` ? `L${P}`
    : Text extends `m${infer P}` ? `M${P}`
    : Text extends `n${infer P}` ? `N${P}`
    : Text extends `o${infer P}` ? `O${P}`
    : Text extends `p${infer P}` ? `P${P}`
    : Text extends `q${infer P}` ? `Q${P}`
    : Text extends `r${infer P}` ? `R${P}`
    : Text extends `s${infer P}` ? `S${P}`
    : Text extends `t${infer P}` ? `T${P}`
    : Text extends `u${infer P}` ? `U${P}`
    : Text extends `v${infer P}` ? `V${P}`
    : Text extends `w${infer P}` ? `W${P}`
    : Text extends `x${infer P}` ? `X${P}`
    : Text extends `y${infer P}` ? `Y${P}`
    : Text extends `z${infer P}` ? `Z${P}`
    : Text
