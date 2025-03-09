import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Get<Data, 'hello'>, 'world'>>,
  Expect<Equal<Get<Data, 'foo.bar.count'>, 6>>,
  Expect<Equal<Get<Data, 'foo.bar'>, { value: 'foobar', count: 6 }>>,
  Expect<Equal<Get<Data, 'foo.baz'>, false>>,

  Expect<Equal<Get<Data, 'no.existed'>, never>>,
]

type Data = {
  'foo': {
    bar: {
      value: 'foobar'
      count: 6
    }
    included: true
  }
  'foo.baz': false
  'hello': 'world'
}

// ------------------- IMPLEMENTATION --------------------------- //

type Get<T, Prop extends string> =
  Prop extends keyof T
    ? T[Prop]
    : Prop extends `${infer FirstPath}.${infer Rest}`
      ? Get<
        Get<T, FirstPath>,
        Rest
      >
      : never

// We can expand this type to make the Prop argument type safe as well!
// By doing so, we get TS erros if we ever call it (or the function that its associated with)
// with bad strings (typos, unsafe runtime creations...)
type AllObjPaths<T> = {
  [Key in Exclude<keyof T, symbol>]: `${Key}` | (T[Key] extends Record<string, unknown> ? `${Key}.${AllObjPaths<T[Key]>}` : never)
}[Exclude<keyof T, symbol>]

type StrongGet<T, Prop extends AllObjPaths<T>> =
  Prop extends keyof T
    ? T[Prop]
    : Prop extends `${infer FirstPath}.${infer Rest}`
      ? Get<
        Get<T, FirstPath>,
        Rest
      >
      : never
