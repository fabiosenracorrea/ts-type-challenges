/**
 * GetOptional was done before this one ;)
 */
type GetOptional_<T extends Record<string, unknown>, Req extends T = Required<T>> = {
  [K in keyof T as T[K] extends Req[K] ? never : K]?: T[K]
}

type OptionalKeys<T extends Record<string, unknown>> = keyof GetOptional_<T>
