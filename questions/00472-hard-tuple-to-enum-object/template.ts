type Merge_<T> = { [K in keyof T]: T[K] }

type ToObj<List extends readonly unknown[], AsIndex extends boolean = false, IndexAcc extends readonly 1[] = []> =
  List extends readonly [infer First extends string, ...infer Rest]
    ?
    & { readonly [K in First as Capitalize<K>]: AsIndex extends true ? IndexAcc['length'] : K }
    & ToObj<Rest, AsIndex, [...IndexAcc, 1]>
    // eslint-disable-next-line ts/no-empty-object-type
    : {}

type Enum<List extends readonly unknown[], AsIndex extends boolean = false> = Merge_<ToObj<List, AsIndex>>
