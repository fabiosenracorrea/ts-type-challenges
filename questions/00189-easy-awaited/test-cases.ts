import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

/**
 * Solution 1.
 *
 * If we do not consider
 *
 * type T = { then: (onfulfilled: (arg: number) => any) => any }
 *
 * A valid use case
 */

type PromiseAware<T> = T extends Promise<infer U> ? PromiseAware<U> : T

/**
 * Solution 2.
 *
 * Considering
 *
 * type T = { then: (onfulfilled: (arg: number) => any) => any }
 *
 * A valid use case, meaning any PromiseLike obj is enough
 *
 * Fun Fact: We do have PromiseLike as a built in type. Check Solution 3
 */

type FulFilledCb = (result: any) => any

type ThenCb = (cb: FulFilledCb) => any

type ThenResult<T extends ThenCb> = Parameters<Parameters<T>[0]>[0]

// type MyAwaited<T> = T extends { then: ThenCb } ? MyAwaited<ThenResult<T['then']>> : T

/**
 * Solution 3.
 *
 * Using the built in PromiseLike
 */

type MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T
