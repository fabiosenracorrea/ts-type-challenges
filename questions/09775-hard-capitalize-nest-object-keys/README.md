<!--info-header-start--><h1>Capitalize Nest Object Keys <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23object-999" alt="#object"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/></h1><blockquote><p>by MayanDev <a href="https://github.com/Mayandev" target="_blank">@Mayandev</a></p></blockquote><p><a href="https://tsch.js.org/9775/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Capitalize the key of the object, and if the value is an array, iterate through the objects in the array.


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/9775/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/9775/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
type HandleArray<T extends unknown[]> =
  T extends [infer Next extends Record<string, unknown>, ...infer Rest]
    ? [CapitalizeNestObjectKeys<Next>, ...HandleArray<Rest>]
    : T

type CapitalizeNestObjectKeys<T> = {
  [K in (keyof T & string) as Capitalize<K>]:
  T[K] extends Record<string, unknown>
    ? CapitalizeNestObjectKeys<T[K]>
    : T[K] extends unknown[]
      ? HandleArray<T[K]>
      : T[K]
}
```
