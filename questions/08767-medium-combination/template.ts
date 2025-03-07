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

// Note: because of the distributive property x hack we use
// if we do not declare U = T[number] and pass in T[number] to
// the exclude, it does not work as intended
// youtube.com/watch?v=BgbZKd2DpQM
type Combination2<
  T extends string[],
  Union = T[number],
  Acc = Union,
> =
  Acc extends string
    ? Acc | `${Acc} ${Combination2<[], Exclude<Union, Acc>>}`
    : never
