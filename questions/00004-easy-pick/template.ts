type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type MyLoosePick<T, K> = {
  [P in Extract<keyof T, K>]: T[P]
}
