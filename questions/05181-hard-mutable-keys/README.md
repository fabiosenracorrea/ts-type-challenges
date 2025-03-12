<!--info-header-start--><h1>Mutable Keys <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23utils-999" alt="#utils"/></h1><blockquote><p>by Yugang Cao <a href="https://github.com/Talljack" target="_blank">@Talljack</a></p></blockquote><p><a href="https://tsch.js.org/5181/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement the advanced util type MutableKeys<T>, which picks all the mutable (not readonly) keys into a union.

For example:

```ts
type Keys = MutableKeys<{ readonly foo: string; bar: number }>;
// expected to be “bar”
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/5181/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/5181/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/02793-medium-mutable/README.md" target="_blank"><img src="https://img.shields.io/badge/-2793%E3%83%BBMutable-d9901a" alt="2793・Mutable"/></a> <!--info-footer-end-->
 
 
### Solution
 
 
```ts
import type { Equal } from '@type-challenges/utils'

type Mutable_<T, Keys extends keyof T> = {
  -readonly [K in Keys]: T[K]
}

/**
 * We basically check for strict equality on the current object for each key
 *  => It produces either { a: string } or { readonly a: string }
 * Then we compare that to an ensured mutable version. If equal = mutable
 * otherwise, exclude.
 *
 * Remember `a` | never = `a`
 */
type MutableKeys<T> = {
  [K in keyof T]-?: Equal<{ [Q in K]: T[K] }, Mutable_<T, K>> extends true ? K : never
}[keyof T]
```
