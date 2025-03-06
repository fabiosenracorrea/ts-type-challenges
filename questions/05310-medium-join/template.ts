type Item = string | number

type Join<List extends Item[], Delimiter extends Item = ','> =
  List extends [infer First extends Item, ...infer Rest extends Item[]]
    ? Rest['length'] extends 0
      ? First
      : `${First}${Delimiter}${Join<Rest, Delimiter>}`
    : ''
