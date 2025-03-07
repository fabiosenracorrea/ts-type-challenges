/* eslint-disable ts/no-unsafe-function-type */
import type { Equal, Expect } from '@type-challenges/utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
  readonlyArr: readonly ['test']
  fn: () => any
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
  readonlyArr: readonly [string]
  fn: Function
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
  Expect<Equal<ToPrimitive2<PersonInfo>, ExpectedResult>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

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
