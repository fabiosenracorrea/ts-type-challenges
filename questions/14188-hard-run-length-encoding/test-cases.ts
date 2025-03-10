import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type Encode<
  T extends string,

  Count extends readonly string[] = [],

  Acc extends string = '',
> =
  T extends `${infer Next}${infer Rest}`
    ? Next extends Count[number]
      ? Encode<Rest, [...Count, Next], Acc>
      : 0 extends Count['length']
        ? Encode<Rest, [Next], Acc>
        : 1 extends Count['length']
          ? Encode<Rest, [Next], `${Acc}${Count[0]}`>
          : Encode<Rest, [Next], `${Acc}${Count['length']}${Count[0]}`>
    : 0 extends Count['length']
      ? Acc
      : `${Acc}${Count[0]}`

type TupleFrom<Size extends number, Acc extends readonly 1[] = []>
  = Acc['length'] extends Size
    ? Acc
    : TupleFrom<Size, [...Acc, 1]>

type MultiString<Char extends string, Count extends number, Ref extends readonly unknown[] = TupleFrom<Count>> =
  Ref extends readonly [unknown, ...infer Rest]
    ? `${Char}${MultiString<Char, Count, Rest>}`
    : ''

type Decode<
  T extends string,
> =
  T extends `${infer Count extends number}${infer Letter}${infer Rest}`
    ? `${MultiString<Letter, Count>}${Decode<Rest>}`
    : T extends `${infer Letter}${infer Rest}`
      ? `${Letter}${Decode<Rest>}`
      : ''
