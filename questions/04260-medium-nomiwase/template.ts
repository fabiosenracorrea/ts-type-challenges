/**
 * youtube.com/watch?v=nBS5-bgq6p0
 */

type StringToUnion_<T> =
  T extends `${infer P}${infer Rest}`
    ? P | StringToUnion<Rest>
    : never

type AllCombinations<T extends string, Acc extends string = StringToUnion_<T>> =
  [Acc] extends [never]
    ? ''
    : '' | {
      [Key in Acc]: `${Key}${AllCombinations<never, Exclude<Acc, Key>>}`
    }[Acc]
