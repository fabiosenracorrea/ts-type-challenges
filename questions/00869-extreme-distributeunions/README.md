<!--info-header-start--><h1>DistributeUnions <img src="https://img.shields.io/badge/-extreme-b11b8d" alt="extreme"/> </h1><blockquote><p>by Gabriel Vergnaud <a href="https://github.com/gvergnaud" target="_blank">@gvergnaud</a></p></blockquote><p><a href="https://tsch.js.org/869/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a type `Distribute Unions`, that turns a type of data structure containing union types into a union of
all possible types of permitted data structures that don't contain any union. The data structure can be any
combination of objects and tuples on any level of nesting.

For example:

```ts
type T1 = DistributeUnions<[1 | 2, 'a' | 'b']>
// =>   [1, 'a'] | [2, 'a'] | [1, 'b'] | [2, 'b']

type T2 = DistributeUnions<{ type: 'a', value: number | string } | { type: 'b', value: boolean }>
//  =>  | { type 'a', value: number }
//      | { type 'a', value: string }
//      | { type 'b', value: boolean }

type T3 = DistributeUnions<[{ value: 'a' | 'b' },  { x: { y: 2 | 3  } }] | 17>
//  =>  | [{ value: 'a' },  { x: { y: 2  } }]
//      | [{ value: 'a' },  { x: { y: 3  } }]
//      | [{ value: 'b' },  { x: { y: 2  } }]
//      | [{ value: 'b' },  { x: { y: 3  } }]
//      | 17
```

For context, this type can be very useful if you want to exclude a case on deep data structures:

```ts
type ExcludeDeep<A, B> = Exclude<DistributeUnions<A>, B>

type T0 = ExcludeDeep<[{ value: 'a' | 'b' },  { x: { y: 2 | 3  } }] | 17, [{ value: 'a' },  any]>
//  =>  | [{ value: 'b' },  { x: { y: 2  } }]
//      | [{ value: 'b' },  { x: { y: 3  } }]
//      | 17
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/869/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/869/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
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
```
