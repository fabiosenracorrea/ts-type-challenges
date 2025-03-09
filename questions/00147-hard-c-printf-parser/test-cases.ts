import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParsePrintFormat<''>, []>>,
  Expect<Equal<ParsePrintFormat<'Any string.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %%d.'>, []>>,
  Expect<Equal<ParsePrintFormat<'The result is %%%d.'>, ['dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %f.'>, ['float']>>,
  Expect<Equal<ParsePrintFormat<'The result is %h.'>, ['hex']>>,
  Expect<Equal<ParsePrintFormat<'The result is %q.'>, []>>,
  Expect<Equal<ParsePrintFormat<'Hello %s: score is %d.'>, ['string', 'dec']>>,
  Expect<Equal<ParsePrintFormat<'The result is %'>, []>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type ControlsMap = {
  c: 'char'
  s: 'string'
  d: 'dec'
  o: 'oct'
  h: 'hex'
  f: 'float'
  p: 'pointer'
}

type GetCommand<First extends string, Second extends string> =
   First extends '%'
     ? Second extends keyof ControlsMap
       ? [ControlsMap[Second]]
       : []
     : []

type ShouldAppendSecond<First extends string, Second extends string> =
   First extends '%'
     ? false
     : Second extends '%'
       ? true
       : false

type ParsePrintFormat<T extends string, Commands extends readonly string[] = []> =
  T extends `${infer First}${infer Second}${infer Rest}`
    ? [
        ...Commands,
        ...GetCommand<First, Second>,
        ...ParsePrintFormat<
          ShouldAppendSecond<First, Second> extends true ? `${Second}${Rest}` : Rest,
          Commands
        >,
      ]
    : Commands
