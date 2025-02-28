type Pop<T extends unknown[]> =
  T extends [...infer Rest, infer _Last]
    ? Rest
    : []
