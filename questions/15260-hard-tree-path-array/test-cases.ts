import type { ExpectExtends, ExpectFalse, ExpectTrue } from '@type-challenges/utils'

declare const example: {
  foo: {
    bar: {
      a: string
    }
    baz: {
      b: number
      c: number
    }
  }
}

type cases = [
  ExpectTrue<ExpectExtends<Path<typeof example['foo']['bar']>, ['a']>>,
  ExpectTrue<ExpectExtends<Path<typeof example['foo']['baz']>, ['b'] | ['c'] >>,
  ExpectTrue<ExpectExtends<Path<typeof example['foo']>, ['bar'] | ['baz'] | ['bar', 'a'] | ['baz', 'b'] | ['baz', 'c']>>,
  ExpectFalse<ExpectExtends<Path<typeof example['foo']['bar']>, ['z']>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type Obj = Record<string, unknown>

type Path<T> = {
  [K in keyof T]:
    | [K]
    | (T[K] extends Obj ? [K, ...Path<T[K]>] : never)
}[keyof T]
