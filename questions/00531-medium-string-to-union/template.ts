type StringToUnion<S extends string, U = never> =
  S extends `${infer L}${infer Rest}`
    ? StringToUnion<Rest, U | L>
    : U
