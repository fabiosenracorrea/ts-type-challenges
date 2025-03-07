import type { Equal, Expect } from '@type-challenges/utils'

interface Test1 {
  readonly title: string
  readonly description: string
  readonly completed: boolean
  readonly meta: {
    readonly author: string
  }
}
type Test2 = {
  readonly a: () => 1
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 's'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}
interface DeepMutableTest1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type DeepMutableTest2 = {
  a: () => 1
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 's'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type cases = [
  Expect<Equal<DeepMutable<Test1>, DeepMutableTest1>>,
  Expect<Equal<DeepMutable<Test2>, DeepMutableTest2>>,
]

type errors = [
  // @ts-expect-error
  DeepMutable<'string'>,
  // @ts-expect-error
  DeepMutable<0>,
]

type xx = DeepMutable<Test2>['a']

// ------------------- IMPLEMENTATION --------------------------- //

type NonPrimitiveTarget = object | readonly any[]

// function extends object! If we pass record<string, unknown> the Test1 is not accepted as its readonly fully
type AnyFn = (...p: any[]) => any

type DeepMutable<T extends NonPrimitiveTarget> = {
  -readonly [K in keyof T]:
  T[K] extends AnyFn
    ? T[K]
    : T[K] extends NonPrimitiveTarget
      ? DeepMutable<T[K]>
      : T[K]
}
