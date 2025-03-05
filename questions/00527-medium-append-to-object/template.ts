type AppendToObject<Obj extends object, Key extends PropertyKey, Value> = {
  [K in Key | keyof Obj]: K extends keyof Obj ? Obj[K] : Value
}
