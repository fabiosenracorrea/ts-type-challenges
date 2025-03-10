type Obj = Record<string, unknown>

type Path<T> = {
  [K in keyof T]:
    | [K]
    | (T[K] extends Obj ? [K, ...Path<T[K]>] : never)
}[keyof T]
