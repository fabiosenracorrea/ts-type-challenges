type MyReturnType<T extends (...p: any[]) => any> =
  T extends (...p: any[]) => infer R
    ? R
    : never
