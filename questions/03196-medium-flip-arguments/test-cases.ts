import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type AnyFn = (...p: any[]) => any

type Reverse<T extends unknown[]> =
  T extends [...infer Rest, infer Last]
    ? [Last, ...Reverse<Rest>]
    : T

type FlipArguments<Fn extends AnyFn> = (...p: Reverse<Parameters<Fn>>) => ReturnType<Fn>
