<!--info-header-start--><h1>JSON Parser <img src="https://img.shields.io/badge/-extreme-b11b8d" alt="extreme"/> <img src="https://img.shields.io/badge/-%23template--literal-999" alt="#template-literal"/> <img src="https://img.shields.io/badge/-%23json-999" alt="#json"/></h1><blockquote><p>by Hydration <a href="https://github.com/hydrati" target="_blank">@hydrati</a></p></blockquote><p><a href="https://tsch.js.org/6228/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

You're required to implement a type-level partly parser to parse JSON string into a object literal type.

Requirements:
 - `Numbers` and `Unicode escape (\uxxxx)` in JSON can be ignored. You needn't to parse them.


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/6228/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/6228/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
/* eslint-disable ts/no-empty-object-type */
import type { MergeInsertions } from '@type-challenges/utils'

/**
 * --- THIS GOES EVEN BEYOND WHAT IS REQUIRED ---
 *
 * A great challenge to think of all the stop
 * rules and validation edges we have!
 *
 * Even though this passes all the tests,
 * there might be some invalid JSONs that pass
 *
 * Example: the tests did not cover loose commas
 * from array/objects at their end. Or even for strings like "true," (which i added)
 *
 * There's also no number handling in the spec (which, again, I added!)
 *
 * Bottom line: there's room for improvement but its an awesome challenge :)
 */

type WhiteSpace_ = ' ' | '\n' | '\t'

type ValidLiterals = false | true | null | number

type Trim<Text extends string> =
  Text extends `${WhiteSpace_}${infer P}`
    ? Trim<P>
    : Text extends `${infer P}${WhiteSpace_}`
      ? Trim<P>
      : Text

type RemoveStartComma<Text extends string> =
  Trim<Text> extends `,${infer P}`
    ? P extends ''
      ? Trim<Text>
      : P
    : Text

type RemoveEscapeLines<T extends string> =
  T extends `${infer Char}\\n${infer Rest}`
    ? RemoveEscapeLines<`${Char}${Rest}`>
    : T

type IsValidString<Key extends string> =
  RemoveEscapeLines<Key> extends `${string}\n${string}`
    ? false
    : true

/**
 * It can be tricky to reference these
 * all in one go. Union of them are not picked up by ts
 * and we can try to match for \\ as that escapes
 * the context
 *
 * We could create a Tuple from all the values and recursively
 * remove them as well. Your choice really
 */
type RemoveEscapes<T extends string> =
  T extends `${infer Left}${'\\n'}${infer Right}`
    ? RemoveEscapes<`${Left}\n${Right}`>
    : T extends `${infer Left}${'\\r'}${infer Right}`
      ? RemoveEscapes<`${Left}\r${Right}`>
      : T extends `${infer Left}${'\\b'}${infer Right}`
        ? RemoveEscapes<`${Left}\b${Right}`>
        : T extends `${infer Left}${'\\f'}${infer Right}`
          ? RemoveEscapes<`${Left}\f${Right}`>
          : T

type ParseInt<T extends string> =
  T extends `${infer P extends number}`
    ? P
    : T

  type Digit =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '0'

type ParseNumber<Target extends string, Acc extends string = ''> =
  Target extends `${infer Num}${infer Rest}`
    ? Num extends Digit
      ? [Acc, Num] extends ['', '0'] // cant start the num with 0
          ? []
          : ParseNumber<Rest, `${Acc}${Num}`>
      : [ParseInt<Acc>, Target]
    : [ParseInt<Acc>, Target]

/**
 * Trying to make TS infer
 * by doing `${infer Literal extends 'false' | 'true' | 'null''}`
 * can fail to resolve the exact literal as the complexity of the
 * whole Parse evaluation is quite high
 *
 * Its best to be a little more verbose here
 */
type ParseLiteral<Target extends string> =
  Target extends `false${infer Rest}`
    ? [false, RemoveStartComma<Rest>]
    : Target extends `true${infer Rest}`
      ? [true, RemoveStartComma<Rest>]
      : Target extends `null${infer Rest}`
        ? [null, RemoveStartComma<Rest>]
        : ParseNumber<Target> extends [infer Num extends number, infer Rest extends string]
          ? [Num, RemoveStartComma<Rest>]
          : [never, never]

/**
 * Value extractor
 *
 * Parse the receiving string to see if its start matches
 * a known start:
 *
 * - strings = "HERE"
 * - literals = true | false | null
 * - objects = {HERE}
 * - arrays = [HERE]
 */
type ExtractValue<T extends string, _TARGET extends string = Trim<T>> =
  _TARGET extends `"${infer StringValue}"${infer Rest}`
    ? [StringValue, RemoveStartComma<Rest>]
    : _TARGET extends `{${infer Obj}}${infer Rest}`
      ? [BuildObj<Obj>, RemoveStartComma<Rest>]
      : _TARGET extends `[${infer Arr}]${infer Rest}`
        ? [HandleArray<`[${Arr}]`>, RemoveStartComma<Rest>]
        : ParseLiteral<_TARGET> extends [infer Literal extends ValidLiterals, infer Rest]
          ? [Literal] extends [never]
              ? [never]
              : [Literal, Rest]
          : [never]

/**
 * Receives the inner string of a possible object
 * eg {HERE} => Inner = HERE
 *
 * If "prop":any is not a matched pattern,
 * we either have come to the end or received a badly formatted obj
 *
 */
type BuildObj<Inner extends string> =
  Trim<Inner> extends `"${infer Prop}":${infer Rest}`
    ? IsValidString<Prop> extends true
      ? ExtractValue<Rest> extends [infer Value, infer RemainingToParse extends string]
        ? Record<RemoveEscapes<Prop>, Value> & BuildObj<RemainingToParse>
        : never
      : never
    : Trim<Inner> extends `${string}:${string}` // bad prop
      ? never
      : {}

type HandleObject<T extends string> =
  T extends `{${infer Obj}}`
    ? Trim<Obj> extends `${string},`
      ? never
      : MergeInsertions<BuildObj<Trim<Obj>>>
    : never

/**
 * Similar logic to the obj builder,
 * gets the [HERE] string and builds it up
 * a value at a time
 */
type BuildArr<Inner extends string> =
  Inner extends ''
    ? []
    : ExtractValue<Inner> extends [infer Value, infer RemainingToParse extends string]
      ? [Value] extends [never]
          ? never
          : [Value, ...BuildArr<RemainingToParse>]
      : []

type HandleArray<T extends string> =
  T extends `[${infer Arr}]`
    ? Arr extends `${string},`
      ? never
      : BuildArr<Arr>
    : never

type Parse<Json extends string, _TARGET extends string = Trim<Json>> =
  _TARGET extends `${infer Start}${string}`
    ? Start extends '{'
      ? HandleObject<_TARGET>
      : Start extends '['
        ? HandleArray<_TARGET>
        : ParseLiteral<_TARGET> extends [infer Literal, '']
          ? Literal
          : never
    : never
```
