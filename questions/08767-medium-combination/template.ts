// Really similar to the all combinations we did (4260)
type CombinationInner<T extends readonly string[], Acc extends string = T[number]> =
  [Acc] extends [never]
    ? ''
    : '' | {
      [Key in Acc]: `${Key} ${CombinationInner<never, Exclude<Acc, Key>>}`
    }[Acc]

type Combination<T extends readonly string[]> =
  Trim<
    Exclude<CombinationInner<T>, ''>
  >
