<!--info-header-start--><h1>Combination <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/> <img src="https://img.shields.io/badge/-%23application-999" alt="#application"/> <img src="https://img.shields.io/badge/-%23string-999" alt="#string"/></h1><blockquote><p>by Homyee King <a href="https://github.com/HomyeeKing" target="_blank">@HomyeeKing</a></p></blockquote><p><a href="https://tsch.js.org/8767/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given an array of strings, do Permutation & Combination.
It's also useful for the prop types like video [controlsList](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/controlsList)

```ts
// expected to be `"foo" | "bar" | "baz" | "foo bar" | "foo bar baz" | "foo baz" | "foo baz bar" | "bar foo" | "bar foo baz" | "bar baz" | "bar baz foo" | "baz foo" | "baz foo bar" | "baz bar" | "baz bar foo"`
type Keys = Combination<['foo', 'bar', 'baz']>
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/8767/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/8767/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <hr><h3>Related Challenges</h3><a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00296-medium-permutation/README.md" target="_blank"><img src="https://img.shields.io/badge/-296%E3%83%BBPermutation-d9901a" alt="296・Permutation"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
// Really similar to the all combinations we did (4260)
type CombinationInner<T extends readonly string[], Acc extends string = T[number]> =
  [Acc] extends [never]
    ? ''
    : '' | {
      [Key in Acc]: `${Key} ${CombinationInner<never, Exclude<Acc, Key>>}`
    }[Acc]

type Combination<T extends readonly string[]> =
  Trim<
    Exclude<CombinationInner<T>, ''>
  >

// Note: because of the distributive property x hack we use
// if we do not declare U = T[number] and pass in T[number] to
// the exclude, it does not work as intended
// youtube.com/watch?v=BgbZKd2DpQM
type Combination2<
  T extends string[],
  Union = T[number],
  Acc = Union,
> =
  Acc extends string
    ? Acc | `${Acc} ${Combination2<[], Exclude<Union, Acc>>}`
    : never
```
