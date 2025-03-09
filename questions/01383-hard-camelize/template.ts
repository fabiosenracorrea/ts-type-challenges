type ToCamelCase<T extends string> = T extends `${infer Word}_${infer Rest}`
  ? `${Word}${ToCamelCase<Capitalize<Rest>>}`
  : T

type Pretty_<T> = { [K in keyof T]: T[K] }

type OnArray<T extends readonly unknown[]> =
  T extends [infer First, ...infer Rest]
    ? [Camelize<First>, ...OnArray<Rest>]
    : []

type Camelize<T> = Pretty_<{
  [Key in keyof T & string as ToCamelCase<Key>]:
  T[Key] extends Record<string, unknown>
    ? Camelize<T[Key]>
    : T[Key] extends readonly unknown[]
      ? OnArray<T[Key]>
      : T[Key]
}>
