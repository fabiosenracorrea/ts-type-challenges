type OneNineDigits = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

type Digit = '0' | OneNineDigits

type AlwaysPresentDays = `0${OneNineDigits}` | `1${Digit}`

type BigMonth = AlwaysPresentDays | `2${Digit}` | `3${'0' | '1'}`
type SmallMonth = AlwaysPresentDays | `2${Digit}` | `30`

type MonthValidDays = {
  [K in '1' | '3' | '5' | '7' | '8' as `0${K}`]: BigMonth
} & {
  [K in '2' | '4' | '6' | '9' as `0${K}`]: SmallMonth
} & {
  '02': AlwaysPresentDays | `2${Exclude<Digit, '9'>}`
  '11': SmallMonth
  '12': BigMonth
}

type isValidDay<Day extends string, Month extends keyof MonthValidDays> =
   Day extends MonthValidDays[Month]
     ? true
     : false

type ValidDate<T extends string> =
  T extends `${infer MonthStart}${infer MonthEnd}${infer Day}`
    ? `${MonthStart}${MonthEnd}` extends keyof MonthValidDays
      ? isValidDay<Day, `${MonthStart}${MonthEnd}`>
      : false
    : false
