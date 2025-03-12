<!--info-header-start--><h1>ToPrimitive <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> </h1><blockquote><p>by 前端子鱼 <a href="https://github.com/mwc" target="_blank">@mwc</a></p></blockquote><p><a href="https://tsch.js.org/16259/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-gray" alt="简体中文"/></a> </p><!--info-header-end-->

Convert a property of type literal (label type) to a primitive type.

For example

```typescript
type X = {
  name: 'Tom',
  age: 30,
  married: false,
  addr: {
    home: '123456',
    phone: '13111111111'
  }
}

type Expected = {
  name: string,
  age: number,
  married: boolean,
  addr: {
    home: string,
    phone: string
  }
}
type Todo = ToPrimitive<X> // should be same as `Expected`
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/16259/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/16259/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
/* eslint-disable ts/no-unsafe-function-type */

type ToPrimitive<T> = {
  [K in keyof T]:
  T[K] extends string
    ? string
    : T[K] extends number
      ? number
      : T[K] extends (...p: any[]) => any
        ? Function
        : T[K] extends boolean
          ? boolean
          : ToPrimitive<T[K]>
}

// Using valueOf and account for T = number | string etc!
// youtube.com/watch?v=oh4KYm5-3KA
type ToPrimitive2<T> =
  T extends (...p: any[]) => any
    ? Function
    : T extends object
      ? { [K in keyof T]: ToPrimitive2<T[K]> }
      : T extends { valueOf: () => infer P }
        ? P
        : T
```
