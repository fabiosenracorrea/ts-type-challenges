type ConstructTuple<Size extends number, Acc extends readonly unknown[] = []> =
  Acc['length'] extends Size
    ? Acc
    : ConstructTuple<Size, [...Acc, unknown]>
