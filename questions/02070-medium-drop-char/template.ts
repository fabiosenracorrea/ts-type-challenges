type DropChar<T extends string, Char extends string, Acc extends string = ''> =
  T extends `${infer P}${infer Rest}`
    ? P extends Char
      ? DropChar<Rest, Char, Acc>
      : DropChar<Rest, Char, `${Acc}${P}`>
    : Acc

/**
 * Solution 2: No Accumulator
 *
 * youtube.com/watch?v=-z4jxgdKrag
 */
type DropChar2<T extends string, Char extends string> =
  T extends `${infer Left}${Char}${infer Right}`
    ? DropChar2<`${Left}${Right}`, Char>
    : T
