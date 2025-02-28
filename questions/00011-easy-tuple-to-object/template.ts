type ObjKey = string | number | symbol

type TupleToObject<T extends readonly ObjKey[]> = {
  [K in T[number]]: K
}

// Fun fact: We have a built-in for that: PropertyKey

type TupleToObject2<T extends readonly PropertyKey[]> = {
  [K in T[number]]: K
}
