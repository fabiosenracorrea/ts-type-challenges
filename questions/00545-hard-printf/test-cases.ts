import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Format<'abc'>, string>>,
  Expect<Equal<Format<'a%sbc'>, (s1: string) => string>>,
  Expect<Equal<Format<'a%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%%dbc'>, string>>,
  Expect<Equal<Format<'a%%%dbc'>, (d1: number) => string>>,
  Expect<Equal<Format<'a%dbc%s'>, (d1: number) => (s1: string) => string>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

// v Old challenge done before this...

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

type ParsePrintFormat<T extends string> =
  T extends `${infer First}${infer Second}${infer Rest}`
    ? [
        ...GetCommand<First, Second>,
        ...ParsePrintFormat<
          ShouldAppendSecond<First, Second> extends true ? `${Second}${Rest}` : Rest
        >,
      ]
    : []

// ^ Old challenge done before this...

type CommandArgs = {
  char: string
  string: string
  dec: number
  oct: string
  hex: string
  float: number
  pointer: string
}

type CommandToFn<Commands extends string[]> =
  Commands extends [infer Next extends keyof CommandArgs, ...infer Rest extends string[]]
    ? (p: CommandArgs[Next]) => CommandToFn<Rest>
    : string

type Format<T extends string> =
  ParsePrintFormat<T> extends [infer Next extends keyof CommandArgs, ...infer Rest extends string[]]
    ? CommandToFn<[Next, ...Rest]>
    : string
