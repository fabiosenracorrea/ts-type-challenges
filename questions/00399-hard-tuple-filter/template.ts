type FilterOut<List extends readonly unknown[], RemoveType> =
  List extends [infer Next, ...infer Rest]
    ? [Next] extends [RemoveType] // compare using the never check
        ? FilterOut<Rest, RemoveType>
        : [Next, ...FilterOut<Rest, RemoveType>]
    : []
