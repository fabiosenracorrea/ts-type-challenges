import type { Equal, Expect } from '@type-challenges/utils'

type Case0 = ['', '', '']
type Case1 = ['+', '', '']
type Case2 = ['+', '1', '']
type Case3 = ['+', '100', '']
type Case4 = ['+', '100', '%']
type Case5 = ['', '100', '%']
type Case6 = ['-', '100', '%']
type Case7 = ['-', '100', '']
type Case8 = ['-', '1', '']
type Case9 = ['', '', '%']
type Case10 = ['', '1', '']
type Case11 = ['', '100', '']

type cases = [
  Expect<Equal<PercentageParser<''>, Case0>>,
  Expect<Equal<PercentageParser<'+'>, Case1>>,
  Expect<Equal<PercentageParser<'+1'>, Case2>>,
  Expect<Equal<PercentageParser<'+100'>, Case3>>,
  Expect<Equal<PercentageParser<'+100%'>, Case4>>,
  Expect<Equal<PercentageParser<'100%'>, Case5>>,
  Expect<Equal<PercentageParser<'-100%'>, Case6>>,
  Expect<Equal<PercentageParser<'-100'>, Case7>>,
  Expect<Equal<PercentageParser<'-1'>, Case8>>,
  Expect<Equal<PercentageParser<'%'>, Case9>>,
  Expect<Equal<PercentageParser<'1'>, Case10>>,
  Expect<Equal<PercentageParser<'100'>, Case11>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type GetSign<T extends string> = T extends `${infer P}${infer _Rest}`
  ? P extends '+' | '-'
    ? P
    : ''
  : ''

type RemovePercent<T extends string> = T extends `${infer N}%` ? N : T

type RemoveSign<T extends string> = T extends `${'+' | '-'}${infer N}` ? N : T

type GetNum<T extends string> = RemovePercent<
  RemoveSign<T>
>

type GetPercent<T extends string> = T extends `${infer _Rest}%` ? '%' : ''

type PercentageParser<T extends string> = [GetSign<T>, GetNum<T>, GetPercent<T>]
