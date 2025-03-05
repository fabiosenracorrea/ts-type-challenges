type FlatObj<T> = {
  [K in keyof T]: T[K]
}

type PartialByKeys<T, Keys extends keyof T = keyof T> = FlatObj<
  Omit<T, Keys> & {
    [K in Keys]?: T[K]
  }
>
