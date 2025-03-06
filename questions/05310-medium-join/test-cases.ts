import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
  Expect<Equal<Join<[], 'u'>, ''>>,
  Expect<Equal<Join<['1', '1', '1']>, '1,1,1'>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type Item = string | number

type Join<List extends Item[], Delimiter extends Item = ','> =
  List extends [infer First extends Item, ...infer Rest extends Item[]]
    ? Rest['length'] extends 0
      ? First
      : `${First}${Delimiter}${Join<Rest, Delimiter>}`
    : ''
