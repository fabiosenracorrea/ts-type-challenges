/* eslint-disable ts/no-unsafe-function-type */
type Overload<
  Params extends unknown[],
  Result,

  ExistingParams extends unknown[] = [],
> =
  Params extends [infer First, ...infer Rest]
    ?
      & ((...p: [...ExistingParams, First]) => SplitArgs<Rest, Result>)
      & (Overload<Rest, Result, [...ExistingParams, First]>)
    : unknown

type SplitArgs<Params extends unknown[], Result> =
  Params extends [infer First, ...infer Rest]
    ?
      & ((p: First) => SplitArgs<Rest, Result>)
      & ((...p: [First, ...Rest]) => Result)
      & (Overload<Params, Result>)
    : Result

declare function DynamicParamsCurrying<Fn extends Function>(
  fn: Fn
): Fn extends (...p: infer Params) => infer Result
  ? Params['length'] extends 0
    ? () => Result
    : SplitArgs<Params, Result>
  : never
