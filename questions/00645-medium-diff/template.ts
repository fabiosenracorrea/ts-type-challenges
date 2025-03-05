type Prettify<T> = {
  [K in keyof T]: T[K]
}

type Diff<T, O> = Prettify<{
  [TKey in keyof T as TKey extends keyof O ? never : TKey]: T[TKey]
} & {
  [OKey in keyof O as OKey extends keyof T ? never : OKey]: O[OKey]
}>
