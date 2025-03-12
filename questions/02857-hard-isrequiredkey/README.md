<!--info-header-start--><h1>IsRequiredKey <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23utils-999" alt="#utils"/></h1><blockquote><p>by jiangshan <a href="https://github.com/jiangshanmeta" target="_blank">@jiangshanmeta</a></p></blockquote><p><a href="https://tsch.js.org/2857/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a generic ```IsRequiredKey<T, K>```  that return whether ```K``` are required keys of ```T``` .

For example

```typescript
type A = IsRequiredKey<{ a: number, b?: string },'a'> // true
type B = IsRequiredKey<{ a: number, b?: string },'b'> // false
type C = IsRequiredKey<{ a: number, b?: string },'b' | 'a'> // false
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/2857/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/2857/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
type _GetRequired<T extends Record<string, unknown>, Req extends T = Required<T>> = {
  [K in keyof T as T[K] extends Req[K] ? K : never]: T[K]
}

type _RequiredKeys<T extends Record<string, unknown>> = keyof _GetRequired<T>

/**
 * This check is distributive, meaning:
 *
 * Is<a> => true
 * Is<b> => false
 * Result = true | false = boolean
 *
 * To account for this, we perform the distributive check
 * and verify if they all colide to `true`
 *
 * Important to note the order of X extends Y
 */
type InnerCheck<T extends Record<string, unknown>, Keys extends keyof T> = Keys extends _RequiredKeys<T> ? true : false

type IsRequiredKey<T extends Record<string, unknown>, Keys extends keyof T> = InnerCheck<T, Keys> extends true ? true : false

// More direct
type IsRequiredKey2<T, K extends keyof T> =
  T[K] extends Required<T>[K]
    ? true
    : false
```
