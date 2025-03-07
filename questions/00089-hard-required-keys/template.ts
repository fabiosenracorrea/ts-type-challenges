/**
 * GetRequired was done before this one ;)
 */
type GetRequired_<T extends Record<string, unknown>, Req extends T = Required<T>> = {
  [K in keyof T as T[K] extends Req[K] ? K : never]: T[K]
}

type RequiredKeys<T extends Record<string, unknown>> = keyof GetRequired_<T>
