type MyReadonly2<T, Keys extends keyof T = keyof T> = Omit<T, Keys> & {
  readonly [Key in Keys]: T[Key]
}
