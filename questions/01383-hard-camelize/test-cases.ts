import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type ToCamelCase<T extends string> = T extends `${infer Word}_${infer Rest}`
  ? `${Word}${ToCamelCase<Capitalize<Rest>>}`
  : T

type Pretty_<T> = { [K in keyof T]: T[K] }

type OnArray<T extends readonly unknown[]> =
  T extends [infer First, ...infer Rest]
    ? [Camelize<First>, ...OnArray<Rest>]
    : []

type Camelize<T> = Pretty_<{
  [Key in keyof T & string as ToCamelCase<Key>]:
  T[Key] extends Record<string, unknown>
    ? Camelize<T[Key]>
    : T[Key] extends readonly unknown[]
      ? OnArray<T[Key]>
      : T[Key]
}>
