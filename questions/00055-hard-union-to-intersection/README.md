<!--info-header-start--><h1>Union to Intersection <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23utils-999" alt="#utils"/> <img src="https://img.shields.io/badge/-%23infer-999" alt="#infer"/></h1><blockquote><p>by Zheeeng <a href="https://github.com/zheeeng" target="_blank">@zheeeng</a></p></blockquote><p><a href="https://tsch.js.org/55/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-gray" alt="简体中文"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a> </p><!--info-header-end-->

Implement the advanced util type `UnionToIntersection<U>`

For example

```ts
type I = UnionToIntersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/55/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/55/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
/**
 * Why this works?
 * youtube.com/watch?v=43aKbkDgN_w
 *
 * 1. T extends T forces distributive
 * 2. (p: T) => any | (p: U) => any
 *
 * To INFER (!) an argument that satisfies T and U
 * the type of that inference must be T & U, as the rest is the same
 */
type UnionToIntersection<T> =
  (
    T extends T ? (arg: T) => any : never
  ) extends (param: infer P) => void
    ? P
    : never
```
