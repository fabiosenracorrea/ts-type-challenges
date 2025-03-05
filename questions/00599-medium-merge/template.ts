type Prettify<T> = {
  [K in keyof T]: T[K]
}

type Merge<T, U> = Prettify<
  Omit<T, keyof U> & U
>
