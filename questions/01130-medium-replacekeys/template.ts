type ReplaceKeys<Obj, ReplaceKeys extends PropertyKey, NewValues> = {
  [K in keyof Obj]: K extends ReplaceKeys
    ? K extends keyof NewValues ? NewValues[K] : never
    : Obj[K]
}
