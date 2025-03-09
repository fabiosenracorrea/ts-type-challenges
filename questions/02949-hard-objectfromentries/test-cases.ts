import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type Entry = readonly [PropertyKey, unknown]

type FromEntries<T extends Entry> =
  T extends [
    infer Key extends PropertyKey,
    infer Value,
  ]
    ? { [K in Key]: Value }
    : unknown

type CleanUp<T> = {
  [K in keyof T]: T[K]
}

type ObjectFromEntries<T extends Entry> = CleanUp<
  UnionToIntersection<
    FromEntries<T>
  >
>
