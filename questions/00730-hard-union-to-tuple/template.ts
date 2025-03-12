type UnionToIntersection_<T> =
  (
    T extends T ? (arg: T) => 0 : never
  ) extends (param: infer P) => 0
    ? P
    : never

/**
 *  This works because of function overloads in TS
 *  If its necessary to output the fn arguments,
 *  ts will just output the last one
 *
 * 1. Basically we have any union a | b
 *
 * 2. we convert that to a function union, distributively: (a) => void | (b) => void <=== This is what happens inside the UnionToIntersection_<__HERE__> below
 *   **(We use the T extends T to force TS to apply the type to each member of the union instead of creating (a|b) => void
 *
 * 3. UnionToIntersection does its magic, converting:
 *      FROM: (a) => void | (b) => void
 *      TO:   (a) => void & (b) => void
 *
 * 4. Because of typescript behavior, it outputs the last arg if necessary `b`
 *
 * We can use this to both 1. add it to the tuple + remove from the original union and walk in it until `never` is achieved
 *
 * youtube.com/watch?v=hphL3xRFm_s
 */
type LastInUnion<T> =
  UnionToIntersection_<
    T extends T ? (arg: T) => 0 : never
  > extends (param: infer P) => 0
    ? P
    : never

export type UnionToTuple<
  T,
  Last = LastInUnion<T>,
> = [Last] extends [never]
  ? []
  : [...UnionToTuple<Exclude<T, Last>>, Last]
