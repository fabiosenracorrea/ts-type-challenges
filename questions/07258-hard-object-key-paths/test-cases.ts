import type { Equal, Expect, ExpectExtends } from '@type-challenges/utils'

const ref = {
  count: 1,
  person: {
    name: 'cattchen',
    age: 22,
    books: ['book1', 'book2'],
    pets: [
      {
        type: 'cat',
      },
    ],
  },
} as const

type cases = [
  Expect<Equal<ObjectKeyPaths<{ name: string, age: number }>, 'name' | 'age'>>,
  Expect<
    Equal<
      ObjectKeyPaths<{
        refCount: number
        person: { name: string, age: number }
      }>,
  'refCount' | 'person' | 'person.name' | 'person.age'
    >
  >,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'count'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.age'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.0'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.1'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.books.[0]'>>,
  Expect<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.0.type'>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'notExist'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.notExist'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.name.'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, '.person.name'>, false>>,
  Expect<Equal<ExpectExtends<ObjectKeyPaths<typeof ref>, 'person.pets.[0]type'>, false>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type IndexPath<Ref extends readonly 1[]> =
  | `.[${Ref['length']}]`
  | `[${Ref['length']}]`
  | `.${Ref['length']}`

type ListPaths<T extends readonly any[], IndexRef extends readonly 1[] = []> =
    T extends readonly [infer P, ...infer Rest]
      ?
      | IndexPath<IndexRef>
      | ListPaths<Rest, [...IndexRef, 1]>
      | (P extends Record<string, unknown> ? `${IndexPath<IndexRef>}.${ObjectKeyPaths<P>}` : never)
      : never

type ObjectKeyPaths<T extends Record<string, unknown>> = {
  [Key in Exclude<keyof T, symbol>]:
    | Key
    | (
      T[Key] extends Record<string, unknown>
        ? `${Key}.${ObjectKeyPaths<T[Key]>}`
        : never
    )
    | (
      T[Key] extends readonly any[]
        ? `${Key}${ListPaths<T[Key]>}`
        : never
    )
}[Exclude<keyof T, symbol>]
