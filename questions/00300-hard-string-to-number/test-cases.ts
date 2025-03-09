import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ToNumber<'0'>, 0>>,
  Expect<Equal<ToNumber<'5'>, 5>>,
  Expect<Equal<ToNumber<'12'>, 12>>,
  Expect<Equal<ToNumber<'27'>, 27>>,
  Expect<Equal<ToNumber<'18@7_$%'>, never>>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type ToNumber<T extends string> = T extends `${infer P extends number}` ? P : never
