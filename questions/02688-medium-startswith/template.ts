type StartsWith<S extends string, Target extends string> =
  S extends `${Target}${infer _P}`
    ? true
    : false
