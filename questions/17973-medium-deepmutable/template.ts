type NonPrimitiveTarget = object | readonly any[]

// function extends object! If we pass record<string, unknown> the Test1 is not accepted as its readonly fully
type AnyFn_ = (...p: any[]) => any

type DeepMutable<T extends NonPrimitiveTarget> = {
  -readonly [K in keyof T]:
  T[K] extends AnyFn_
    ? T[K]
    : T[K] extends NonPrimitiveTarget
      ? DeepMutable<T[K]>
      : T[K]
}
