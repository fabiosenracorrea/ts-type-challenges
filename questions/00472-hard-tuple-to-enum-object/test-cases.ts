/* eslint-disable ts/no-empty-object-type */
import type { Equal, Expect } from '@type-challenges/utils'

const OperatingSystem = ['macOS', 'Windows', 'Linux'] as const
const Command = ['echo', 'grep', 'sed', 'awk', 'cut', 'uniq', 'head', 'tail', 'xargs', 'shift'] as const

type cases = [
  Expect<Equal<Enum<[]>, {}>>,
  Expect<Equal<
    Enum<typeof OperatingSystem>,
    {
      readonly MacOS: 'macOS'
      readonly Windows: 'Windows'
      readonly Linux: 'Linux'
    }
  >>,
  Expect<Equal<
    Enum<typeof OperatingSystem, true>,
    {
      readonly MacOS: 0
      readonly Windows: 1
      readonly Linux: 2
    }
  >>,
  Expect<Equal<
    Enum<typeof Command>,
    {
      readonly Echo: 'echo'
      readonly Grep: 'grep'
      readonly Sed: 'sed'
      readonly Awk: 'awk'
      readonly Cut: 'cut'
      readonly Uniq: 'uniq'
      readonly Head: 'head'
      readonly Tail: 'tail'
      readonly Xargs: 'xargs'
      readonly Shift: 'shift'
    }
  >>,
  Expect<Equal<
    Enum<typeof Command, true>,
    {
      readonly Echo: 0
      readonly Grep: 1
      readonly Sed: 2
      readonly Awk: 3
      readonly Cut: 4
      readonly Uniq: 5
      readonly Head: 6
      readonly Tail: 7
      readonly Xargs: 8
      readonly Shift: 9
    }
  >>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type Merge_<T> = { [K in keyof T]: T[K] }

type ToObj<List extends readonly unknown[], AsIndex extends boolean = false, IndexAcc extends readonly 1[] = []> =
  List extends readonly [infer First extends string, ...infer Rest]
    ?
    & { readonly [K in First as Capitalize<K>]: AsIndex extends true ? IndexAcc['length'] : K }
    & ToObj<Rest, AsIndex, [...IndexAcc, 1]>
    : {}

type Enum<List extends readonly unknown[], AsIndex extends boolean = false> = Merge_<ToObj<List, AsIndex>>
