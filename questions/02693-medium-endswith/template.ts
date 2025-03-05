type EndsWith<S extends string, Target extends string> =
  S extends `${infer _P}${Target}`
    ? true
    : false
