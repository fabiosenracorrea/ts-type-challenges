type FlatObj1<T> = {
  [K in keyof T]: T[K]
}

type RequiredByKeys<T, Keys extends keyof T = keyof T> = FlatObj1<
  & Omit<T, Keys>
  & Required<Pick<T, Keys>>
>
