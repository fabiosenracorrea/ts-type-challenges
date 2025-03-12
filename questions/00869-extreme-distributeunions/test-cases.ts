/* eslint-disable ts/no-empty-object-type */
import type { Equal, Expect, MergeInsertions } from '@type-challenges/utils'
import type { IsUnion } from '../01097-medium-isunion/test-cases'
import type { UnionToTuple } from '../00730-hard-union-to-tuple/template'

type cases = [
  // Already distributed unions should stay the same:
  Expect<Equal<DistributeUnions<1>, 1>>,
  Expect<Equal<DistributeUnions<string>, string>>,
  Expect<Equal<DistributeUnions<1 | 2>, 1 | 2>>,
  Expect<Equal<DistributeUnions<'b' | { type: 'a' } | [1]>, 'b' | { type: 'a' } | [1]>>,
  // tuples:
  Expect<Equal<DistributeUnions<[1 | 2, 3]>, [1, 3] | [2, 3]>>,
  Expect<Equal<DistributeUnions<[1 | 2, 'a' | 'b']>, [1, 'a'] | [1, 'b'] | [2, 'a'] | [2, 'b']>>,
  Expect<
    Equal<
      DistributeUnions<[1 | 2, 'a' | 'b', false | true]>,
      | [1, 'a', false]
      | [1, 'a', true]
      | [1, 'b', false]
      | [1, 'b', true]
      | [2, 'a', false]
      | [2, 'a', true]
      | [2, 'b', false]
      | [2, 'b', true]
    >
  >,
  // objects
  Expect<
    Equal<
      DistributeUnions<{ x: 'a' | 'b', y: 'c' | 'd' }>,
  { x: 'a', y: 'c' } | { x: 'a', y: 'd' } | { x: 'b', y: 'c' } | { x: 'b', y: 'd' }
    >
  >,
  Expect<
    Equal<
      DistributeUnions<{ type: 'a', value: number | string } | { type: 'b', value: boolean }>,
      | { type: 'a', value: string }
      | { type: 'a', value: number }
      | { type: 'b', value: false }
      | { type: 'b', value: true }
    >
  >,
  Expect<
    Equal<
      // we reached the union correctly
      DistributeUnions<
        | {
          type: 'a'
          option: { kind: 'none' } | { kind: 'some', value: 'x' | 'y' }
        }
        | { type: 'b', msg: string }
      >,
      | { type: 'b', msg: string }
      | { type: 'a', option: { kind: 'none' } }
      | { type: 'a', option: { kind: 'some', value: 'x' } }
      | { type: 'a', option: { kind: 'some', value: 'y' } }
    >
  >,
  // mixed structures:
  Expect<
    Equal<
      DistributeUnions<[false | true, { value: 'a' | 'b' }, { x: { y: 2 | 3 } }]>,
      | [false, { value: 'a' }, { x: { y: 2 } }]
      | [false, { value: 'a' }, { x: { y: 3 } }]
      | [false, { value: 'b' }, { x: { y: 2 } }]
      | [false, { value: 'b' }, { x: { y: 3 } }]
      | [true, { value: 'a' }, { x: { y: 2 } }]
      | [true, { value: 'a' }, { x: { y: 3 } }]
      | [true, { value: 'b' }, { x: { y: 2 } }]
      | [true, { value: 'b' }, { x: { y: 3 } }]
    >
  >,
  Expect<
    Equal<
      DistributeUnions<17 | [10 | { value: 'a' | 'b' }, { x: { y: 2 | 3 } }]>,
      | 17
      | [10, { x: { y: 2 } }]
      | [10, { x: { y: 3 } }]
      | [{ value: 'a' }, { x: { y: 2 } }]
      | [{ value: 'a' }, { x: { y: 3 } }]
      | [{ value: 'b' }, { x: { y: 2 } }]
      | [{ value: 'b' }, { x: { y: 3 } }]
    >
  >,
]

// ------------------- IMPLEMENTATION --------------------------- //

type OBJ = Record<string, unknown>

type SplitObjUnionValue<Key extends string, Values extends unknown[]> =
  Values extends [infer Next, ...infer Rest]
    ?
    | Record<Key, Next>
    | SplitObjUnionValue<Key, Rest>
    : never

type ApplyToObjInner<T extends OBJ> = [keyof T] extends [never]
  ? {}
  // For each key we create the entire obj again, splitting unions
  : {
      [K in keyof T]:
        & ApplyToObj<Omit<T, K>>
        & (
          IsUnion<T[K]> extends true
            ? SplitObjUnionValue<K & string, UnionToTuple<T[K]>>
            : Record<K, ApplyToObj<T[K]>>
        )
    }[keyof T]

type ObjHasUnionValue<T extends OBJ, Keys extends unknown[] = UnionToTuple<keyof T>> =
  Keys extends [infer NextKey extends keyof T, ...infer RestKeys]
    ? IsUnion<T[NextKey]> extends true
      ? true
      : ObjHasUnionValue<T, RestKeys>
    : false

type ValidateObjResult<T extends OBJ> =
  ObjHasUnionValue<T> extends true
    ? ApplyToObj<T>
    : MergeInsertions<T>

type ApplyToObj<T> =
  T extends OBJ
    // @ts-expect-error We are no where near infinite risks
    ? ValidateObjResult<ApplyToObjInner<T>>
    : T

type ApplyToArr<T extends unknown[]> =
  T extends [infer Next, ...infer Rest]
    ? IsUnion<Next> extends true
      ?
      | [ApplyToObj<UnionToTuple<Next>[0]>, ...ApplyToArr<Rest>]
      | ([Exclude<Next, UnionToTuple<Next>[0]>] extends [never] ? never : ApplyToArr<[Exclude<Next, UnionToTuple<Next>[0]>, ...Rest]>)
      : [ApplyToObj<Next>, ...ApplyToArr<Rest>]
    : []

type DistributeUnionsInner<T> =
  T extends OBJ
    ? ApplyToObj<T>
    : IsUnion<T> extends true
      ? [T][number]
      : T extends unknown[]
        ? ApplyToArr<T>
        : T

type ArrayHasUnion<T extends unknown[]>
  = T extends [infer Next, ...infer Rest]
    ? IsUnion<Next> extends true
      ? true
      : ArrayHasUnion<Rest>
    : false

type ValidateDistribution<Result>
  = Result extends unknown[]
    ? ArrayHasUnion<Result> extends true
      ? DistributeUnions<Result> // unwrap array once more
      : Result
    : Result

type DistributeUnions<T> =
  ValidateDistribution<
    DistributeUnionsInner<T>
  >
