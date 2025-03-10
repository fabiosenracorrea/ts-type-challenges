type IndexPath<Ref extends readonly 1[]> =
  | `.[${Ref['length']}]`
  | `[${Ref['length']}]`
  | `.${Ref['length']}`

type ListPaths<T extends readonly any[], IndexRef extends readonly 1[] = []> =
    T extends readonly [infer P, ...infer Rest]
      ?
      | IndexPath<IndexRef>
      | ListPaths<Rest, [...IndexRef, 1]>
      | (P extends Record<string, unknown> ? `${IndexPath<IndexRef>}.${ObjectKeyPaths<P>}` : never)
      : never

type ObjectKeyPaths<T extends Record<string, unknown>> = {
  [Key in Exclude<keyof T, symbol>]:
    | Key
    | (
      T[Key] extends Record<string, unknown>
        ? `${Key}.${ObjectKeyPaths<T[Key]>}`
        : never
    )
    | (
      T[Key] extends readonly any[]
        ? `${Key}${ListPaths<T[Key]>}`
        : never
    )
}[Exclude<keyof T, symbol>]
