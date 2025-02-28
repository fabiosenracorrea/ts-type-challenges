type MyOmit<T, K extends keyof T> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key]
}

// Omit<> actually does not constrict like this exercise asks for
type TsOmit<T, K> = {
  [Key in keyof T as Key extends K ? never : Key]: T[Key]
}
