type Flatten<T extends any[], Result extends any[] = []> =
  T extends [infer First, ...infer Rest]
    ? First extends any[]
      ? Flatten<Rest, [...Result, ...Flatten<First>]>
      : Flatten<Rest, [...Result, First]>
    : Result
