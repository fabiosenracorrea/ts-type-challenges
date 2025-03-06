type Zip<Arr1 extends any[], Arr2 extends any[]> =
  Arr1 extends [infer First1, ...infer Rest1]
    ? Arr2 extends [infer First2, ...infer Rest2]
      ? [[First1, First2], ...Zip<Rest1, Rest2>]
      : []
    : []
