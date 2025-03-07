type Subsequence<T extends unknown[]> =
  T extends [infer P, ...infer Rest]
    ? T | Rest | Subsequence<Rest> | [P, ...Subsequence<Rest>]
    : T
