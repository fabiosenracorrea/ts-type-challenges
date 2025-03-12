<!--info-header-start--><h1>Run-length encoding <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> </h1><blockquote><p>by Hen Hedymdeith <a href="https://github.com/alfaproxima" target="_blank">@alfaproxima</a></p></blockquote><p><a href="https://tsch.js.org/14188/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
Also make a decoder for that string.


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/14188/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/14188/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
type Encode<
  T extends string,

  Count extends readonly string[] = [],

  Acc extends string = '',
> =
  T extends `${infer Next}${infer Rest}`
    ? Next extends Count[number]
      ? Encode<Rest, [...Count, Next], Acc>
      : 0 extends Count['length']
        ? Encode<Rest, [Next], Acc>
        : 1 extends Count['length']
          ? Encode<Rest, [Next], `${Acc}${Count[0]}`>
          : Encode<Rest, [Next], `${Acc}${Count['length']}${Count[0]}`>
    : 0 extends Count['length']
      ? Acc
      : `${Acc}${Count[0]}`

type TupleFrom<Size extends number, Acc extends readonly 1[] = []>
  = Acc['length'] extends Size
    ? Acc
    : TupleFrom<Size, [...Acc, 1]>

type MultiString<Char extends string, Count extends number, Ref extends readonly unknown[] = TupleFrom<Count>> =
  Ref extends readonly [unknown, ...infer Rest]
    ? `${Char}${MultiString<Char, Count, Rest>}`
    : ''

type Decode<
  T extends string,
> =
  T extends `${infer Count extends number}${infer Letter}${infer Rest}`
    ? `${MultiString<Letter, Count>}${Decode<Rest>}`
    : T extends `${infer Letter}${infer Rest}`
      ? `${Letter}${Decode<Rest>}`
      : ''
```
