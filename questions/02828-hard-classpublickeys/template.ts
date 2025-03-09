// keyof T works... but hovering the type shows `keyof T` instead of the string names

type ClassPublicKeys<T> = {
  [K in keyof T]: K
}[keyof T]
