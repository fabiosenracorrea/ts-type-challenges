import type { Equal, Expect } from '@type-challenges/utils'

class A {
  public str: string
  protected num: number
  private bool: boolean
  constructor() {
    this.str = 'naive'
    this.num = 19260917
    this.bool = true
  }

  getNum() {
    return Math.random()
  }
}

type cases = [
  Expect<Equal<ClassPublicKeys<A>, 'str' | 'getNum'>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

// keyof T works... but hovering the type shows `keyof T` instead of the string names

type ClassPublicKeys<T> = {
  [K in keyof T]: K
}[keyof T]
