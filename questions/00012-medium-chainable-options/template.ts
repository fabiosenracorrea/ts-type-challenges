type Chainable<Start = object> = {
  option:
  <Prop extends string, Value>(
    p: Prop extends keyof Start ? never : Prop,
    v: Value
  ) => Chainable<Omit<Start, Prop> & { [K in Prop]: Value }>

  get: () => Start
}
