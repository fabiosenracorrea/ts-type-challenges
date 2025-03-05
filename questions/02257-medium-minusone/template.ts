type ParseInt<T extends string> =
  `${T}` extends `${infer P extends number}`
    ? P
    : never

// If we subtract 1 from 0 = 9
// that is, the number indexes its result
type SubTargets = [
  '9',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
]

type Digit = SubTargets[number]

type ReverseString<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? `${ReverseString<Rest>}${First}`
    : T

// Because string extraction works best with the first
// char, we perform the number subtraction in reverse!
type WalkDown<T extends string> =
  T extends `${infer Target extends Digit}${infer Rest}`
    ? Target extends '0'
      ? `${SubTargets[Target]}${WalkDown<Rest>}`
      : `${SubTargets[Target]}${Rest}`
    : T extends Digit
      ? SubTargets[T]
      : T

// The reversing causes the number to have zero padding
// We account for the special '0' result case
type RemovePadZero<T extends string> =
  T extends `0${infer N}`
    ? N extends '' ? '0' : N
    : T

type ExecCalc<T extends number> = ReverseString<
  WalkDown<
    ReverseString<`${T}`>
  >
>

type MinusOne<T extends number> = ParseInt<
  RemovePadZero<
    ExecCalc<T>
  >
>

// ------------------- ACCOUNTING NEGATIVES ------------------------ //

type SumTargets = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
]

type WalkUp<T extends string> =
  T extends `${infer Target extends Digit}${infer Rest}`
    ? Target extends '9'
      ? `${SumTargets[Target]}${Rest extends '' ? '1' : WalkUp<Rest>}`
      : `${SumTargets[Target]}${Rest}`
    : T extends Digit
      ? SumTargets[T]
      : T

type NegativeCalc<T extends number> = ReverseString<
  WalkUp<
    ReverseString<`${T}`>
  >
>

type FullMinusOne<T extends number> =
  T extends 0
    ? -1
    : `${T}` extends `-${infer N extends number}`
      ? ParseInt<
          `-${RemovePadZero<NegativeCalc<N>>}`
      >
      : MinusOne<T>
