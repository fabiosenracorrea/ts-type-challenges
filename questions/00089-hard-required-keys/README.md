<!--info-header-start--><h1>Required Keys <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23utils-999" alt="#utils"/></h1><blockquote><p>by yituan <a href="https://github.com/yi-tuan" target="_blank">@yi-tuan</a></p></blockquote><p><a href="https://tsch.js.org/89/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-gray" alt="简体中文"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a> </p><!--info-header-end-->

Implement the advanced util type `RequiredKeys<T>`, which picks all the required keys into a union.

For example

```ts
type Result = RequiredKeys<{ foo: number; bar?: string }>;
// expected to be “foo”
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/89/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/89/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00005-extreme-readonly-keys/README.md" target="_blank"><img src="https://img.shields.io/badge/-5%E3%83%BBGet%20Readonly%20Keys-b11b8d" alt="5・Get Readonly Keys"/></a> <!--info-footer-end-->
 
 
### Solution
 
 
```ts
/**
 * GetRequired was done before this one ;)
 */
type GetRequired_<T extends Record<string, unknown>, Req extends T = Required<T>> = {
  [K in keyof T as T[K] extends Req[K] ? K : never]: T[K]
}

type RequiredKeys<T extends Record<string, unknown>> = keyof GetRequired_<T>
```
