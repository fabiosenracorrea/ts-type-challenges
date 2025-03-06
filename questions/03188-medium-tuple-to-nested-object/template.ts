/**
 * If we do not add the 'extends' to both infer operations,
 * TS can't narrow it properly to accept the recursive call
 */
type TupleToNestedObject<T extends PropertyKey[], Value> =
  T extends [...infer P extends PropertyKey[], infer Last extends PropertyKey]
    ? TupleToNestedObject<P, { [K in Last]: Value }>
    : Value
