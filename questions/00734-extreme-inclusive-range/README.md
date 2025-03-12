<!--info-header-start--><h1>Inclusive Range <img src="https://img.shields.io/badge/-extreme-b11b8d" alt="extreme"/> <img src="https://img.shields.io/badge/-%23infer-999" alt="#infer"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/></h1><blockquote><p>by Sg <a href="https://github.com/suica" target="_blank">@suica</a></p></blockquote><p><a href="https://tsch.js.org/734/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Recursion depth in type system is one of the limitations of TypeScript, the number is around 45. 

*We need to go deeper*. And we could go deeper.

In this challenge, you are given one lower boundary and one higher boundary, by which a range of natural numbers is inclusively sliced. You should develop a technique that enables you to do recursion deeper than the limitation, since both boundary vary from 0 to 200. 

Note that when `Lower > Higher`, output an empty tuple.


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/734/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/734/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
import type { GreaterThan } from '../04425-medium-greater-than/template'

/**
 * The GreaterThan helper we created a while back is the MVP!
 *
 * We get around the recursive limit with the tuple limit (1000 > 40)
 */

type TupleFrom<Size extends number, Acc extends readonly 1[] = []>
  = Acc['length'] extends Size
    ? Acc
    : TupleFrom<Size, [...Acc, 1]>

type PlusOne<
  Num extends number,
> = [
  ...TupleFrom<Num>,
  1,
]['length'] & number

type TupleRange<Size extends number, Item extends number = 1, Acc extends readonly number[] = []>
  = Acc['length'] extends Size
    ? Acc
    : TupleRange<Size, PlusOne<Item>, [...Acc, Item]>

type PurgeRange<
  End extends number,
  Range extends number[],
> =
 Range extends [...infer Rest extends number[], infer Last]
   ? Last extends End
     ? Range
     : PurgeRange<End, Rest>
   : []

type InclusiveRange<
  Start extends number,
  End extends number,
> =
  Start extends End
    ? [Start]
    : GreaterThan<Start, End> extends true
      ? []
      : 0 extends Start
        ? [...TupleRange<End, Start>, End] // its created properly
        : PurgeRange<
          End,
          TupleRange<End, Start>
        >
```
