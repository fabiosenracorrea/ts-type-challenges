import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: string | undefined }>, ['key', string | undefined]>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type ObjectEntries<T> = {
  [K in keyof T]-?: [
    K,
    undefined extends Required<T>[K]
      ? T[K]
      : [Exclude<T[K], undefined>] extends [never] ? undefined : Exclude<T[K], undefined>,
  ]
}[keyof T]
