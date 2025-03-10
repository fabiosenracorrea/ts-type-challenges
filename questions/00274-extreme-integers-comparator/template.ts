import type { GreaterThan } from '../04425-medium-greater-than/template'

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type IsNegative<T extends number> = `${T}` extends `-${infer _num extends number}` ? true : false

type RemoveNegative<T extends number> = `${T}` extends `-${infer Num extends number}` ? Num : T

type isDecimal<T extends number> = `${T}` extends `${number}.${number}` ? true : false

type ExtractInt<T extends number> = `${T}` extends `${infer Num extends number}.${number}` ? Num : T

type ExtractDecimal<T extends number> = `${T}` extends `${number}.${infer Num extends number}` ? Num : T

type ShouldCompareDecimal<A extends number, B extends number> =
  isDecimal<A> extends true
    ? isDecimal<B> extends true
      ? ExtractInt<A> extends ExtractInt<B>
        ? true
        : false
      : false
    : false

/**
 * Because of how TS works with decimal when referenced
 * on the helpers we use on the `GreaterThan` type,
 * we only ever need to compare decimals if the integer
 * value is the same. Otherwise the compiler will coerce it
 * to the integer and the evaluation will occur as they should
 */
type Comparator<A extends number, B extends number> =
  ShouldCompareDecimal<A, B> extends true
    ? Comparator<ExtractDecimal<A>, ExtractDecimal<B>>
    : A extends B
      ? Comparison.Equal
      : IsNegative<A> extends true
        ? IsNegative<B> extends true
          ? Comparator<
            RemoveNegative<B>,
            RemoveNegative<A>
          >
          : Comparison.Lower
        : IsNegative<B> extends true
          ? Comparison.Greater
          : GreaterThan<A, B> extends true
            ? Comparison.Greater
            : Comparison.Lower
