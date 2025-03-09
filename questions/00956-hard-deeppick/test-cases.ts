import type { Equal, Expect, UnionToIntersection } from '@type-challenges/utils'

type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,

  Expect<Equal<DeepPick2<Obj, ''>, unknown>>,
  Expect<Equal<DeepPick2<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick2<Obj, 'a' | ''>, { a: number } & unknown>>,
  Expect<Equal<DeepPick2<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string } }>>,
  Expect<Equal<DeepPick2<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type DeepPick<T, Keys extends string> =
  UnionToIntersection<
    Keys extends ''
      ? never
      :
        & (Keys extends keyof T ? Pick<T, Extract<keyof T, Keys>> : unknown)
        &
        (
            Keys extends `${keyof T & string}.${string}`
              ? {
                  [K in Keys as K extends `${infer Start extends keyof T & string}.${string}` ? Start : never]:
                  K extends `${infer Start extends keyof T & string}.${infer DeepPath}`
                    ? DeepPick<T[Start], DeepPath>
                    : never
                }
              : unknown
          )
  >

// Using a modification of the "Get" type we build earlier
type DeepGet<T, Prop extends string> =
  Prop extends keyof T
    ? { [K in Prop]: T[Prop] }
    : Prop extends `${infer FirstPath extends keyof T & string}.${infer Rest}`
      ? { [K in FirstPath]: DeepGet<T[FirstPath], Rest> }
      : never

type DeepPick2<T, Keys extends string> = UnionToIntersection<DeepGet<T, Keys>>
