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
