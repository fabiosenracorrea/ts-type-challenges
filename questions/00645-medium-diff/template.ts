type Prettify<T> = {
  [K in keyof T]: T[K]
}

type Diff<T, O> = Prettify<{
  [TKey in keyof T as TKey extends keyof O ? never : TKey]: T[TKey]
} & {
  [OKey in keyof O as OKey extends keyof T ? never : OKey]: O[OKey]
}>

// Using &

/**
 * This works because if we do keyof T & keyof O we get all the keys present on both!
 */
type Diff2<T, O> = {
  [Key in Exclude<keyof T | keyof O, keyof T & keyof O>]:
  Key extends keyof T
    ? T[Key]
    : Key extends keyof O
      ? O[Key]
      : never
}
