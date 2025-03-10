type Entry = readonly [PropertyKey, unknown]

type FromEntries<T extends Entry> =
  T extends [
    infer Key extends PropertyKey,
    infer Value,
  ]
    ? { [K in Key]: Value }
    : unknown

type CleanUp<T> = {
  [K in keyof T]: T[K]
}

type ObjectFromEntries<T extends Entry> = CleanUp<
  UnionToIntersection<
    FromEntries<T>
  >
>

type ObjectFromEntries2<T extends Entry> = {
  [K in T as K[0]]: K[1]
}
