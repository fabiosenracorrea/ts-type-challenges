type DropChar<T extends string, Char extends string, Acc extends string = ''> =
  T extends `${infer P}${infer Rest}`
    ? P extends Char
      ? DropChar<Rest, Char, Acc>
      : DropChar<Rest, Char, `${Acc}${P}`>
    : Acc
