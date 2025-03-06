type WhiteSpace__ = '\n' | '\t' | ' '

type TrimRight<T extends string> =
  T extends `${infer Rest}${WhiteSpace__}`
    ? TrimRight<Rest>
    : T
