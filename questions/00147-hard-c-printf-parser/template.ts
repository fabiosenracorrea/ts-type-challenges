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
