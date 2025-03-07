type GetOptional<T extends Record<string, unknown>, Req extends T = Required<T>> = {
  [K in keyof T as T[K] extends Req[K] ? never : K]?: T[K]
}
