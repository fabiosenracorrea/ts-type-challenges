import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BinaryToDecimal<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal<'10101010'>, 170>>,

  Expect<Equal<BinaryToDecimal2<'10'>, 2>>,
  Expect<Equal<BinaryToDecimal2<'0011'>, 3>>,
  Expect<Equal<BinaryToDecimal2<'00000000'>, 0>>,
  Expect<Equal<BinaryToDecimal2<'11111111'>, 255>>,
  Expect<Equal<BinaryToDecimal2<'10101010'>, 170>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type ReverseS<T extends string> = T extends `${infer Char}${infer Rest}` ? `${ReverseS<Rest>}${Char}` : T

type DoubleTuple<T extends readonly unknown[]> = [...T, ...T]

type ExponentialTuple<
  Size extends number,
  Count extends readonly 1[] = [],
  Result extends readonly 1[] = [1],
> =
  Size extends Count['length']
    ? Result
    : ExponentialTuple<Size, [...Count, 1], DoubleTuple<Result>>

type FixResult<T extends readonly unknown[]> =
  T extends [unknown, ...infer Rest]
    ? Rest['length']
    : T['length']

type BinaryResult<
  Reversed extends string,
  Exponent extends readonly 1[] = [],
  Result extends readonly 1[] = [1],
> =
  Reversed extends `${infer Next}${infer Rest}`
    // @ts-expect-error ts-2589 we know for this usage its not going to be infinite, its per the challenge description
    ? BinaryResult<
      Rest,
      [...Exponent, 1],
      Next extends '1'
        ? [...Result, ...ExponentialTuple<Exponent['length']>]
        : Result
    >
    : FixResult<Result>

type BinaryToDecimal<Binary extends string> = BinaryResult<ReverseS<Binary>>

/**
 * Solution 2
 *
 * youtube.com/watch?v=gmr6sFgJCKc
 */
type BinaryToDecimal2<
  T extends string,

  Count extends 1[] = [],
> =
  T extends `${infer Next}${infer Rest}`
    ? Next extends '1'
      ? BinaryToDecimal2<Rest, [...Count, ...Count, 1]>
      : BinaryToDecimal2<Rest, [...Count, ...Count]>
    : Count['length']
