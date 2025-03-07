/* eslint-disable ts/no-unsafe-function-type */
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

type AnyFn__ = (...p: any) => any

type CurryingResult<Fn extends AnyFn__> = Parameters<Fn> extends [infer First, ...infer Rest]
  ? (p: First) => CurryingResult<(...p: Rest) => ReturnType<Fn>>
  : Fn extends () => infer R
    ? () => R
    : Fn

declare function Currying2<Fn extends AnyFn__>(fn: Fn): CurryingResult<Fn>
