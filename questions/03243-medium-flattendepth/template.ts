type FlattRef<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? First extends any[]
      ? Flatt<[...First, ...Rest]>
      : [First, ...Flatt<Rest>]
    : T

type FlattenDepth<T extends any[], Depth extends number = 1, Count extends readonly any[] = []> =
  Count['length'] extends Depth
    ? T
    : T extends [infer First, ...infer Rest]
      ? First extends any[]
        ? FlattenDepth<[...First, ...FlattenDepth<Rest>], Depth, [...Count, 1]>
        : [First, ...FlattenDepth<Rest, Depth, Count>]
      : T
