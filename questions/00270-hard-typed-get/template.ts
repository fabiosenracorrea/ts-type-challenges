type Get<T, Prop extends string> =
  Prop extends keyof T
    ? T[Prop]
    : Prop extends `${infer FirstPath}.${infer Rest}`
      ? Get<
        Get<T, FirstPath>,
        Rest
      >
      : never

// We can expand this type to make the Prop argument type safe as well!
// By doing so, we get TS erros if we ever call it (or the function that its associated with)
// with bad strings (typos, unsafe runtime creations...)
type AllObjPaths<T> = {
  [Key in Exclude<keyof T, symbol>]: `${Key}` | (T[Key] extends Record<string, unknown> ? `${Key}.${AllObjPaths<T[Key]>}` : never)
}[Exclude<keyof T, symbol>]

type StrongGet<T, Prop extends AllObjPaths<T>> =
  Prop extends keyof T
    ? T[Prop]
    : Prop extends `${infer FirstPath}.${infer Rest}`
      ? Get<
        Get<T, FirstPath>,
        Rest
      >
      : never
