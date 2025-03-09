type DeepPick<T, Keys extends string> =
  UnionToIntersection<
    Keys extends ''
      ? never
      :
        & (Keys extends keyof T ? Pick<T, Extract<keyof T, Keys>> : unknown)
        &
        (
            Keys extends `${keyof T & string}.${string}`
              ? {
                  [K in Keys as K extends `${infer Start extends keyof T & string}.${string}` ? Start : never]:
                  K extends `${infer Start extends keyof T & string}.${infer DeepPath}`
                    ? DeepPick<T[Start], DeepPath>
                    : never
                }
              : unknown
          )
  >

// Using a modification of the "Get" type we build earlier
type DeepGet<T, Prop extends string> =
  Prop extends keyof T
    ? { [K in Prop]: T[Prop] }
    : Prop extends `${infer FirstPath extends keyof T & string}.${infer Rest}`
      ? { [K in FirstPath]: DeepGet<T[FirstPath], Rest> }
      : never

type DeepPick2<T, Keys extends string> = UnionToIntersection<DeepGet<T, Keys>>
