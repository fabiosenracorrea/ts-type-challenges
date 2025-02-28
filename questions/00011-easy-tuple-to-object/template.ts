type ObjKey = string | number | symbol

type TupleToObject<T extends readonly ObjKey[]> = {
  [K in T[number]]: K
}
