<!--info-header-start--><h1>Permutation <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23union-999" alt="#union"/></h1><blockquote><p>by Naoto Ikuno <a href="https://github.com/pandanoir" target="_blank">@pandanoir</a></p></blockquote><p><a href="https://tsch.js.org/296/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> &nbsp;&nbsp;&nbsp;<a href="./README.zh-CN.md" target="_blank"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-gray" alt="简体中文"/></a>  <a href="./README.ja.md" target="_blank"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-gray" alt="日本語"/></a>  <a href="./README.ko.md" target="_blank"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-gray" alt="한국어"/></a> </p><!--info-header-end-->

Implement permutation type that transforms union types into the array that includes permutations of unions.

```typescript
type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/296/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/296/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
/**
 * Ref: https://github.com/type-challenges/type-challenges/issues/14483
 *
 * why [K] extends [never]？
 * TypeScript treats never as an empty union when distributing over conditionals.
 * This means that 'a' | never when getting distributed just gets shortened to 'a'
 * when distributing. This also means 'a' | (never | 'b') | (never | never) just becomes
 * 'a' | 'b' when distributing, because the never part is equivalent to an empty union
 * and we can just combine all the unions.
 *
 * why K extends K？
 * K extends K is obviously always going to be true right?
 * So why even have it in a conditional in the first place?
 * We know that type unions get distributed over conditionals, we also know that...wait!?!?
 * "Type unions get distributed over conditionals", that's it!
 *
 * This is a cheeky hack to make 'a' | 'b' | 'c' result parse over a then b then c
 * in the conditional. It makes each one trigger the conditional then unions the results
 *  together. Pretty awesome huh? It's kinda like a for-each loop for type unions.
 *
 * For our example K extends K will be evaluated for 'a' | 'b' | 'c' three times.
 * Then there will be N! tuples built per iteration (because we recurse with N-1).
 * The way TypeScript works is that unions are flat, so all the unions of the inner
 * recursions will be lifted to the final level.
 *
 * ============= My comments =============
 *
 * If we do type Str<T> = T extends string ? `_${T}` : T;
 * to 'A' | 'B' the result is like doing Str<'A'> | Str<'B'>
 * But if we "save" the type in a accumulator/other variable,
 * its saved as the whole 'A' | 'B' type, meaning
 */
type Permutation<T, Acc = T> =
    [T] extends [never]
      ? []
      : Acc extends Acc
        ? [Acc, ...Permutation<Exclude<T, Acc>>]
        : never
```
