type Flip<T> = {
  [Key in keyof T as T[Key] extends string | number | boolean ? `${T[Key]}` : never]: Key
}
