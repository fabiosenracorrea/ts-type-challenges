/* eslint-disable ts/no-unsafe-function-type */
import type { Equal, Expect } from '@type-challenges/utils'

const curried1 = Currying((a: string, b: number, c: boolean) => true)
const curried2 = Currying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = Currying(() => true)

type cases = [
  Expect<Equal<
    typeof curried1,
    (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2,
    (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type SplitArgs<Params extends unknown[], Result> =
  Params extends [infer First, ...infer Rest]
    ? (p: First) => SplitArgs<Rest, Result>
    : Result

declare function Currying<Fn extends Function>(fn: Fn):
Fn extends (...p: infer Params) => infer Result
  ? Params['length'] extends 0
    ? () => Result
    : SplitArgs<Params, Result>
  : never

// ------------------------ IMPORTANT NOTE ------------------------//

// If we do it like this, the return type gets lost into the infers, even
// if we explicitly infer it at the start...

type AnyFn = (...p: any) => any

type CurryingResult<Fn extends AnyFn> = Parameters<Fn> extends [infer First, ...infer Rest]
  ? (p: First) => CurryingResult<(...p: Rest) => ReturnType<Fn>>
  : Fn extends () => infer R
    ? () => R
    : Fn

declare function Currying2<Fn extends AnyFn>(fn: Fn): CurryingResult<Fn>
