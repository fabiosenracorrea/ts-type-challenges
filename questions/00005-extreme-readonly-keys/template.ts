import type { Equal } from '@type-challenges/utils'

// Same strategy we used for mutable keys, but inverse
type GetReadonlyKeys<T> = {
  [K in keyof T]-?: Equal<{ [Q in K]: T[K] }, Readonly<{ [Q in K]: T[K] }>> extends true ? K : never
}[keyof T]
