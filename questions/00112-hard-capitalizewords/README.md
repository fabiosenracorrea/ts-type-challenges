<!--info-header-start--><h1>Capitalize Words <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23template--literal-999" alt="#template-literal"/></h1><blockquote><p>by Anthony Fu <a href="https://github.com/antfu" target="_blank">@antfu</a></p></blockquote><p><a href="https://tsch.js.org/112/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-gray" alt="简体中文"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a> </p><!--info-header-end-->

Implement `CapitalizeWords<T>` which converts the first letter of **each word of a string** to uppercase and leaves the rest as-is.

For example

```ts
type capitalized = CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/112/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/112/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
 
 
### Solution
 
 
```ts
type Alphabet = 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'

type IsLetter<T> = T extends Alphabet | Capitalize<Alphabet> ? true : false

/**
 * Interesting note:
 *
 * This version is logically correct. But not using an accumulator makes TS
 * deconstruct the emoji and show it as the unicode sequence, breaking inference
 * and making every char after it 'any'
 *
 * Try it: use this version instead and hover over the result of that last string
 */
type CapitalizeWords____<T extends string, Transform extends boolean = true>
  = T extends `${infer NextChar}${infer Rest}`
    ? `${
      Transform extends true ? Capitalize<NextChar> : NextChar
    }${
      CapitalizeWords<Rest, IsLetter<NextChar> extends true ? false : true>
    }`

    : Capitalize<T>

type CapitalizeWords<T extends string, Transform extends boolean = true, Acc extends string = ''>
  = T extends `${infer NextChar}${infer Rest}`
    ? CapitalizeWords<
      Rest,
      IsLetter<NextChar> extends true ? false : true,
        `${Acc}${Transform extends true ? Capitalize<NextChar> : NextChar}`
    >
    : Acc
```
