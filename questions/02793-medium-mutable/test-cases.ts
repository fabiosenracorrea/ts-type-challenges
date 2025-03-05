import type { Equal, Expect } from '@type-challenges/utils'

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type List = [1, 2, 3]

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
]

type errors = [
  // @ts-expect-error
  Mutable<'string'>,
  // @ts-expect-error
  Mutable<0>,
]

// ------------------- IMPLEMENTATION --------------------------- //

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
