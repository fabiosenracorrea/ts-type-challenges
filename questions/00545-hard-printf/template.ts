// v Old challenge done before this...

type ControlsMap_ = {
  c: 'char'
  s: 'string'
  d: 'dec'
  o: 'oct'
  h: 'hex'
  f: 'float'
  p: 'pointer'
}

type GetCommand_<First extends string, Second extends string> =
   First extends '%'
     ? Second extends keyof ControlsMap_
       ? [ControlsMap_[Second]]
       : []
     : []

type ShouldAppendSecond_<First extends string, Second extends string> =
   First extends '%'
     ? false
     : Second extends '%'
       ? true
       : false

type ParsePrintFormat_<T extends string> =
  T extends `${infer First}${infer Second}${infer Rest}`
    ? [
        ...GetCommand_<First, Second>,
        ...ParsePrintFormat_<
          ShouldAppendSecond_<First, Second> extends true ? `${Second}${Rest}` : Rest
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
  ParsePrintFormat_<T> extends [infer Next extends keyof CommandArgs, ...infer Rest extends string[]]
    ? CommandToFn<[Next, ...Rest]>
    : string
