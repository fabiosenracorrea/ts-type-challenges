import type { Equal, Expect } from '@type-challenges/utils'

type ExtractValuesOfTuple<T extends any[]> = T[keyof T & number]

type cases = [
  Expect<Equal<UnionToTuple<'a' | 'b'>['length'], 2>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b'>>, 'a' | 'b'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a'>>, 'a'>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<undefined | void | 1>>, void | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<any | 1>>, any>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'d' | 'f' | 1 | never>>, 'f' | 'd' | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<[{ a: 1 }] | 1>>, [{ a: 1 }] | 1>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<never>>, never>>,
  Expect<Equal<ExtractValuesOfTuple<UnionToTuple<'a' | 'b' | 'c' | 1 | 2 | 'd' | 'e' | 'f' | 'g'>>, 'f' | 'e' | 1 | 2 | 'g' | 'c' | 'd' | 'a' | 'b'>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type UnionToIntersection_<T> =
  (
    T extends T ? (arg: T) => 0 : never
  ) extends (param: infer P) => 0
    ? P
    : never

/**
 *  This works because of function overloads in TS
 *  If its necessary to output the fn arguments,
 *  ts will just output the last one
 *
 * 1. Basically we have any union a | b
 *
 * 2. we convert that to a function union, distributively: (a) => void | (b) => void <=== This is what happens inside the UnionToIntersection_<__HERE__> below
 *   **(We use the T extends T to force TS to apply the type to each member of the union instead of creating (a|b) => void
 *
 * 3. UnionToIntersection does its magic, converting:
 *      FROM: (a) => void | (b) => void
 *      TO:   (a) => void & (b) => void
 *
 * 4. Because of typescript behavior, it outputs the last arg if necessary `b`
 *
 * We can use this to both 1. add it to the tuple + remove from the original union and walk in it until `never` is achieved
 *
 * youtube.com/watch?v=hphL3xRFm_s
 */
type LastInUnion<T> =
  UnionToIntersection_<
    T extends T ? (arg: T) => 0 : never
  > extends (param: infer P) => 0
    ? P
    : never

type UnionToTuple<
  T,
  Last = LastInUnion<T>,
> = [Last] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, Last>>, Last]

type xxx = UnionToTuple<'a' | 'b'>
type yyy = UnionToTuple<'a' | 'b' | 'c' | 1 | 2 | 'd' | 'e' | 'f' | 'g'>
