type LookUp<T, Type> = T extends { type: Type } ? T : never

// Using Build In:
type LookUp1<T, Type> = Extract<T, { type: Type }>
