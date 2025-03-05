/* eslint-disable ts/no-empty-object-type */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type Falsy = false | null | [] | undefined | 0 | ''

type IsFalsy<T> =
  T extends Falsy
    ? true
    : keyof T extends never // empty obj check
      ? true
      : false

type AnyOf<T extends unknown[]> =
  T extends [infer First, ...infer Rest]
    ? IsFalsy<First> extends true
      ? AnyOf<Rest>
      : true
    : false

//

type Falsy2 = false | null | [] | undefined | 0 | '' | Record<string, never>

type AnyOf2<T extends unknown[]> =
  T extends [infer First, ...infer Rest]
    ? First extends Falsy2
      ? AnyOf<Rest>
      : true
    : false
