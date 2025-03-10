import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
]

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}

// ------------------- IMPLEMENTATION --------------------------- //

// Same strategy we used for mutable keys, but inverse
type GetReadonlyKeys<T> = {
  [K in keyof T]-?: Equal<{ [Q in K]: T[K] }, Readonly<{ [Q in K]: T[K] }>> extends true ? K : never
}[keyof T]
