// Otherwise the readonly is still there
type GetKeys<T> = { [K in keyof T]: K }[keyof T]

type GetItems<T extends readonly any[]> =
  T extends readonly [infer P, ...infer Rest]
    ? [P, ...Rest]
    : never

type Mutable<T extends Record<string, unknown> | readonly any[]> =
  T extends Record<string, unknown>
    ? { [K in GetKeys<T>]: T[K] }
    : T extends readonly any[]
      ? GetItems<T>
      : never

// Removing Explicitly...
type Mutable1<T extends Record<string, unknown> | readonly any[]> = {
  -readonly [K in keyof T]: T[K]
}
