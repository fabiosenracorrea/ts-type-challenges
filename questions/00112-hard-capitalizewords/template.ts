type Alphabet = 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'

type IsLetter<T> = T extends Alphabet | Capitalize<Alphabet> ? true : false

/**
 * Interesting note:
 *
 * This version is logically correct. But not using an accumulator makes TS
 * deconstruct the emoji and show it as the unicode sequence, breaking inference
 * and making every char after it 'any'
 *
 * Try it: use this version instead and hover over the result of that last string
 */
type CapitalizeWords____<T extends string, Transform extends boolean = true>
  = T extends `${infer NextChar}${infer Rest}`
    ? `${
      Transform extends true ? Capitalize<NextChar> : NextChar
    }${
      CapitalizeWords<Rest, IsLetter<NextChar> extends true ? false : true>
    }`

    : Capitalize<T>

type CapitalizeWords<T extends string, Transform extends boolean = true, Acc extends string = ''>
  = T extends `${infer NextChar}${infer Rest}`
    ? CapitalizeWords<
      Rest,
      IsLetter<NextChar> extends true ? false : true,
        `${Acc}${Transform extends true ? Capitalize<NextChar> : NextChar}`
    >
    : Acc
