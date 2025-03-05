import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type Prettify<T> = {
  [K in keyof T]: T[K]
}

type Diff<T, O> = Prettify<{
  [TKey in keyof T as TKey extends keyof O ? never : TKey]: T[TKey]
} & {
  [OKey in keyof O as OKey extends keyof T ? never : OKey]: O[OKey]
}>

// Using &

type Diff2<T, O> = {
  [Key in Exclude<keyof T | keyof O, keyof T & keyof O>]:
  Key extends keyof T
    ? T[Key]
    : Key extends keyof O
      ? O[Key]
      : never
}
