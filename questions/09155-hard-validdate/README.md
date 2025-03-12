<!--info-header-start--><h1>ValidDate <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> </h1><blockquote><p>by ch3cknull <a href="https://github.com/ch3cknull" target="_blank">@ch3cknull</a></p></blockquote><p><a href="https://tsch.js.org/9155/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a type `ValidDate`, which takes an input type T and returns whether T is a valid date.

**Leap year is not considered**

Good Luck!

```ts
ValidDate<'0102'> // true
ValidDate<'0131'> // true
ValidDate<'1231'> // true
ValidDate<'0229'> // false
ValidDate<'0100'> // false
ValidDate<'0132'> // false
ValidDate<'1301'> // false
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/9155/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/9155/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
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
```
