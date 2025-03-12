<!--info-header-start--><h1>Intersection <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23union-999" alt="#union"/> <img src="https://img.shields.io/badge/-%23array-999" alt="#array"/></h1><blockquote><p>by Pineapple <a href="https://github.com/Pineapple0919" target="_blank">@Pineapple0919</a></p></blockquote><p><a href="https://tsch.js.org/5423/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement the type version of Lodash.intersection with a little difference. Intersection<T> takes an Array T containing several arrays or any type element including the union type, and returns a new union containing all intersection elements.

```ts
type Res = Intersection<[[1, 2], [2, 3], [2, 2]]>; // expected to be 2
type Res1 = Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>; // expected to be 2 | 3
type Res2 = Intersection<[[1, 2], [3, 4], [5, 6]]>; // expected to be never
type Res3 = Intersection<[[1, 2, 3], [2, 3, 4], 3]>; // expected to be 3
type Res4 = Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>; // expected to be 2 | 3
type Res5 = Intersection<[[1, 2, 3], 2, 3]>; // expected to be never
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/5423/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/5423/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
import type { Equal } from '@type-challenges/utils'

type IsPresent<Entry, LookupList extends readonly unknown[]> =
  LookupList extends [infer Next, ...infer Rest]
    ? Next extends unknown[]
      ? Rest extends [unknown, ...unknown[]]
        ? IsPresent<Entry, Next> & IsPresent<Entry, Rest>
        : IsPresent<Entry, Next>
      : Equal<Entry, Next> extends true
        ? Entry
        : IsPresent<Entry, Rest>
    : never

/**
 * We do this to make it easier to compare, as
 * [
 *  [1, 2, 3]
 *  3,
 *  2
 * ]
 *
 * Should be treated as
 * [
 *  [1, 2, 3]
 *  [3],
 *  [2]
 * ]
 *
 * (see the last test)
 */
type UnFlat<List extends readonly unknown[]> =
  List extends [infer Next, ...infer Rest]
    ? Next extends unknown[]
      ? [Next, ...UnFlat<Rest>]
      : [[Next], ...UnFlat<Rest>]
    : []

type Intersection<List extends readonly unknown[]> =
  List extends [infer Start extends readonly unknown[], ...infer Rest]
    ? Start extends [infer First, ...infer StartRest]
      ? IsPresent<First, Rest> | Intersection<[StartRest, ...UnFlat<Rest>]>
      : never
    : never

/**
 * Solution 2
 *
 * youtube.com/watch?v=8-Z_MbkjkkY
 *
 * This works because the last unknown cancels out
 * any item that does not exist on any following interaction
 */
  type Intersection2<List extends readonly unknown[]> =
  List extends [infer Head, ...infer Rest]
    ? Head extends unknown[]
      ? Extract<Head[number], Intersection<Rest>>
      : Extract<Head, Intersection<Rest>>
    : unknown

/**
 * Solution 3
 *
 * youtube.com/watch?v=8-Z_MbkjkkY
 *
 * This one kinda illustrates the solution i came up with
 * in an ultra simplified manner
 *
 * type a1 = 2 | 3 | 4
 * type a2 = 2
 * type a3 = a1 & a2 ==> 2!!!
 *
 * So we basically & all the items from the array and the common factors come out
 *
 * This is the best one to picture whats going on
 */
  type Intersection3<List extends readonly unknown[]> =
  List extends [infer Head, ...infer Rest]
    ?
      & (Head extends unknown[] ? Head[number] : Head)
      & Intersection3<Rest>
    : unknown
```
