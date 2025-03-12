<!--info-header-start--><h1>Awaited <img src="https://img.shields.io/badge/-easy-7aad0c" alt="easy"/> <img src="https://img.shields.io/badge/-%23promise-999" alt="#promise"/> <img src="https://img.shields.io/badge/-%23built--in-999" alt="#built-in"/></h1><blockquote><p>by Maciej Sikora <a href="https://github.com/maciejsikora" target="_blank">@maciejsikora</a></p></blockquote><p><a href="https://tsch.js.org/189/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-gray" alt="简体中文"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a>  <a href="./README.ko.md" target="_blank"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-gray" alt="한국어"/></a> </p><!--info-header-end-->

If we have a type which is a wrapped type like Promise, how can we get the type which is inside the wrapped type?

For example: if we have `Promise<ExampleType>` how to get ExampleType?

```ts
type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string
```

> This question is ported from the [original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4) by [@maciejsikora](https://github.com/maciejsikora)

<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/189/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/189/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
 
 
### Solution
 
 
```ts
/**
 * Solution 1.
 *
 * If we do not consider
 *
 * type T = { then: (onfulfilled: (arg: number) => any) => any }
 *
 * A valid use case
 */

type PromiseAware<T> = T extends Promise<infer U> ? PromiseAware<U> : T

/**
 * Solution 2.
 *
 * Considering
 *
 * type T = { then: (onfulfilled: (arg: number) => any) => any }
 *
 * A valid use case, meaning any PromiseLike obj is enough
 *
 * Fun Fact: We do have PromiseLike as a built in type. Check Solution 3
 */

type FulFilledCb = (result: any) => any

type ThenCb = (cb: FulFilledCb) => any

type ThenResult<T extends ThenCb> = Parameters<Parameters<T>[0]>[0]

// type MyAwaited<T> = T extends { then: ThenCb } ? MyAwaited<ThenResult<T['then']>> : T

/**
 * Solution 3.
 *
 * Using the built in PromiseLike
 */

type MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T
```
