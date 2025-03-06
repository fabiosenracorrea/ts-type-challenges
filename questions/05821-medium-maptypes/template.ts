type MapObj = { mapFrom: any, mapTo: any }

type Swap<Value, FromTo extends MapObj, TargetConfig extends MapObj = Extract<FromTo, { mapFrom: Value }>> =
  [TargetConfig] extends [never]
    ? Value
    : TargetConfig['mapTo']

type MapTypes<Obj, FromTo extends MapObj> = {
  [Key in keyof Obj]: Swap<Obj[Key], FromTo>
}
