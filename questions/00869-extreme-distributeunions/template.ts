/* eslint-disable ts/no-empty-object-type */
import type { MergeInsertions } from '@type-challenges/utils'
import type { UnionToTuple } from '../00730-hard-union-to-tuple/template'

/**
 * Some other examples I've found
 *
 * youtube.com/watch?v=BgWoQ-mEW0Q
 *
 * Todo:
 * Retry approaching from a forced distributivity (P extends P)
 * angle
 */

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
