/* eslint-disable ts/no-unsafe-function-type */

type ToPrimitive<T> = {
  [K in keyof T]:
  T[K] extends string
    ? string
    : T[K] extends number
      ? number
      : T[K] extends (...p: any[]) => any
        ? Function
        : T[K] extends boolean
          ? boolean
          : ToPrimitive<T[K]>
}

// Using valueOf and account for T = number | string etc!
// youtube.com/watch?v=oh4KYm5-3KA
type ToPrimitive2<T> =
  T extends (...p: any[]) => any
    ? Function
    : T extends object
      ? { [K in keyof T]: ToPrimitive2<T[K]> }
      : T extends { valueOf: () => infer P }
        ? P
        : T
