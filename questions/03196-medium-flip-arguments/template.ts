type AnyFn = (...p: any[]) => any

type ReverseList<T extends unknown[]> =
  T extends [...infer Rest, infer Last]
    ? [Last, ...ReverseList<Rest>]
    : T

type FlipArguments<Fn extends AnyFn> = (...p: ReverseList<Parameters<Fn>>) => ReturnType<Fn>
