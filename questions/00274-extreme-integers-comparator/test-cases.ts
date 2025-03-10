import type { Equal, Expect } from '@type-challenges/utils'

import type { GreaterThan } from '../04425-medium-greater-than/template'

type cases = [
  Expect<Equal<Comparator<5, 5>, Comparison.Equal>>,
  Expect<Equal<Comparator<5, 6>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 8>, Comparison.Lower>>,
  Expect<Equal<Comparator<5, 0>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, 0>, Comparison.Lower>>,
  Expect<Equal<Comparator<0, 0>, Comparison.Equal>>,
  Expect<Equal<Comparator<0, -5>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -3>, Comparison.Greater>>,
  Expect<Equal<Comparator<5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -7>, Comparison.Greater>>,
  Expect<Equal<Comparator<-5, -3>, Comparison.Lower>>,
  Expect<Equal<Comparator<-25, -30>, Comparison.Greater>>,
  Expect<Equal<Comparator<15, -23>, Comparison.Greater>>,
  Expect<Equal<Comparator<40, 37>, Comparison.Greater>>,
  Expect<Equal<Comparator<-36, 36>, Comparison.Lower>>,
  Expect<Equal<Comparator<27, 27>, Comparison.Equal>>,
  Expect<Equal<Comparator<-38, -38>, Comparison.Equal>>,

  Expect<Equal<Comparator<1, 100>, Comparison.Lower>>,
  Expect<Equal<Comparator<100, 1>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, 1>, Comparison.Lower>>,
  Expect<Equal<Comparator<1, -100>, Comparison.Greater>>,
  Expect<Equal<Comparator<-100, -1>, Comparison.Lower>>,
  Expect<Equal<Comparator<-1, -100>, Comparison.Greater>>,

  // Extra tests if you like to challenge yourself!
  Expect<Equal<Comparator<9007199254740992, 9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740992>, Comparison.Equal>>,
  Expect<Equal<Comparator<9007199254740991, 9007199254740992>, Comparison.Lower>>,
  Expect<Equal<Comparator<9007199254740992, 9007199254740991>, Comparison.Greater>>,
  Expect<Equal<Comparator<-9007199254740992, -9007199254740991>, Comparison.Lower>>,
  Expect<Equal<Comparator<-9007199254740991, -9007199254740992>, Comparison.Greater>>,
  Expect<Equal<Comparator<3.1415, 3.1415>, Comparison.Equal>>,
  Expect<Equal<Comparator<3.1415, 3.1414>, Comparison.Greater>>,
  Expect<Equal<Comparator<0, 3.1414>, Comparison.Lower>>,
  Expect<Equal<Comparator<31.415, 3.1415>, Comparison.Greater>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

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
