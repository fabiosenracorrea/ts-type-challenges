<!--info-header-start--><h1>IsAny <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23utils-999" alt="#utils"/></h1><blockquote><p>by Pavel Glushkov <a href="https://github.com/pashutk" target="_blank">@pashutk</a></p></blockquote><p><a href="https://tsch.js.org/223/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a> </p><!--info-header-end-->

Sometimes it's useful to detect if you have a value with `any` type. This is especially helpful while working with third-party Typescript modules, which can export `any` values in the module API. It's also good to know about `any` when you're suppressing implicitAny checks.

So, let's write a utility type `IsAny<T>`, which takes input type `T`. If `T` is `any`, return `true`, otherwise, return `false`.


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/223/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/223/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/01042-medium-isnever/README.md" target="_blank"><img src="https://img.shields.io/badge/-1042%E3%83%BBIsNever-d9901a" alt="1042・IsNever"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/01097-medium-isunion/README.md" target="_blank"><img src="https://img.shields.io/badge/-1097%E3%83%BBIsUnion-d9901a" alt="1097・IsUnion"/></a>  <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/04484-medium-istuple/README.md" target="_blank"><img src="https://img.shields.io/badge/-4484%E3%83%BBIsTuple-d9901a" alt="4484・IsTuple"/></a> <!--info-footer-end-->
 
 
### Solution
 
 
```ts
type IsNever_<T> = [T] extends [never] ? true : false

/**
 * First Solution i came up with
 */
type IsAny<T> =
  IsNever_<T> extends true
    ? false
    : IsNever_<keyof T> extends true
      ? false
      : T extends T & 1
        ? true
        : false

/**
 * Then i realized the keyof unknown
 * check was redundant
 */
type IsAny2<T> =
  IsNever_<T> extends true
    ? false
    : T extends T & 1
      ? true
      : false

/**
 * Which is almost the normal IsAny check we find online:
 *
 * This works because the any value & 1 results into:
 *
 * - 1 if T = unknown
 * - 1 if T = number
 * - never for anything other than explicit any
 */
type IsAny3<T> =
  0 extends T & 1
    ? true
    : false
```
