<!--info-header-start--><h1>Capitalize <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23template--literal-999" alt="#template-literal"/></h1><blockquote><p>by Anthony Fu <a href="https://github.com/antfu" target="_blank">@antfu</a></p></blockquote><p><a href="https://tsch.js.org/110/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-gray" alt="简体中文"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a>  <a href="./README.ko.md" target="_blank"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-gray" alt="한국어"/></a> </p><!--info-header-end-->

Implement `Capitalize<T>` which converts the first letter of a string to uppercase and leave the rest as-is.

For example

```ts
type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/110/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/110/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
 
 
### Solution
 
 
```ts
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
// Disabled to not fix the format, its easier to read like that

type MyCapitalize<Text extends string> =
      Text extends `a${infer P}` ? `A${P}`
    : Text extends `b${infer P}` ? `B${P}`
    : Text extends `c${infer P}` ? `C${P}`
    : Text extends `d${infer P}` ? `D${P}`
    : Text extends `e${infer P}` ? `E${P}`
    : Text extends `f${infer P}` ? `F${P}`
    : Text extends `g${infer P}` ? `G${P}`
    : Text extends `h${infer P}` ? `H${P}`
    : Text extends `i${infer P}` ? `I${P}`
    : Text extends `j${infer P}` ? `J${P}`
    : Text extends `k${infer P}` ? `K${P}`
    : Text extends `l${infer P}` ? `L${P}`
    : Text extends `m${infer P}` ? `M${P}`
    : Text extends `n${infer P}` ? `N${P}`
    : Text extends `o${infer P}` ? `O${P}`
    : Text extends `p${infer P}` ? `P${P}`
    : Text extends `q${infer P}` ? `Q${P}`
    : Text extends `r${infer P}` ? `R${P}`
    : Text extends `s${infer P}` ? `S${P}`
    : Text extends `t${infer P}` ? `T${P}`
    : Text extends `u${infer P}` ? `U${P}`
    : Text extends `v${infer P}` ? `V${P}`
    : Text extends `w${infer P}` ? `W${P}`
    : Text extends `x${infer P}` ? `X${P}`
    : Text extends `y${infer P}` ? `Y${P}`
    : Text extends `z${infer P}` ? `Z${P}`
    : Text

// Using built ins...

type MyCapitalize2<Text extends string> =
      Text extends `${infer P}${infer U}` ? `${Uppercase<P>}${U}` : Text
```
