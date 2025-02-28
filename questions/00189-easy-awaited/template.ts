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
