/* eslint-disable ts/no-unsafe-function-type */
import type { Equal, Expect } from '@type-challenges/utils'

const curried1 = DynamicParamsCurrying((_a: string, _b: number, _c: boolean) => true)
const curried2 = DynamicParamsCurrying((_a: string, _b: number, _c: boolean, _d: boolean, _e: boolean, _f: string, _g: boolean) => true)

const curried1Return1 = curried1('123')(123)(true)
const curried1Return2 = curried1('123', 123)(false)
const curried1Return3 = curried1('123', 123, true)

const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false)
const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false)
const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false)
const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false)
const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false)
const curried2Return6 = curried2('123', 123, true, false)(true, '123', false)
const curried2Return7 = curried2('123', 123, true, false, true)('123', false)
const curried2Return8 = curried2('123', 123, true, false, true)('123')(false)
const curried2Return9 = curried2('123', 123, true, false, true, '123')(false)
const curried2Return10 = curried2('123', 123, true, false, true, '123', false)

// @ts-expect-error
const curried1ReturnWrong = curried1('123')(123)('wrong arg type')
// @ts-expect-error
const curried1ReturnWrong2 = curried1('123')()(123)(true)

type cases = [
  Expect<Equal< typeof curried1Return1, true>>,
  Expect<Equal< typeof curried1Return2, true>>,
  Expect<Equal< typeof curried1Return3, true>>,

  Expect<Equal< typeof curried2Return1, true>>,
  Expect<Equal< typeof curried2Return2, true>>,
  Expect<Equal< typeof curried2Return3, true>>,
  Expect<Equal< typeof curried2Return4, true>>,
  Expect<Equal< typeof curried2Return5, true>>,
  Expect<Equal< typeof curried2Return6, true>>,
  Expect<Equal< typeof curried2Return7, true>>,
  Expect<Equal< typeof curried2Return8, true>>,
  Expect<Equal< typeof curried2Return9, true>>,
  Expect<Equal< typeof curried2Return10, true>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

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
