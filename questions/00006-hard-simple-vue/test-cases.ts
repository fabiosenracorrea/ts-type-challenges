/* eslint-disable ts/no-unused-expressions */

import type { Equal, Expect } from '@type-challenges/utils'

declare function alert(p: any): void

SimpleVue2({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})

// ------------------- IMPLEMENTATION --------------------------- //

type ToReturnType<T extends Record<string, () => any>> = {
  [K in keyof T]: ReturnType<T[K]>
}

interface BaseMethods<
  Data extends object,
  Computed extends Record<string, (this: Data, ...p: never) => any>,
> {
  [key: string]: (this: Data & ToReturnType<Computed> & this, ...p: any[]) => any
}

interface Vue<
  Data extends object,
  Computed extends Record<string, (this: Data, ...p: never) => any>,
  Methods extends BaseMethods<Data, Computed>,
> {
  data: (this: never, ...p: never) => Data

  computed?: Computed

  methods: {
    [K in keyof Methods]: (this: Data & ToReturnType<Computed> & Methods, ...p: Parameters<Methods[K]>) => any
  }
}

declare function SimpleVue<
  Data extends object,
  Computed extends Record<string, (this: Data, ...p: never) => any>,
  Methods extends BaseMethods<Data, Computed>,
>(options: Vue<Data, Computed, Methods>): any

// Simpler approach using ThisType
declare function SimpleVue2<
  Data extends object,
  Computed extends Record<string, (this: Data, ...p: never) => any>,
  Methods,
>(options: {
  data: (this: never, ...p: never) => Data

  computed: Computed & ThisType<Computed>

  methods: Methods & ThisType<Data & Methods & ToReturnType<Computed>>
}): any
