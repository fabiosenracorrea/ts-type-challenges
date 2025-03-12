<!--info-header-start--><h1>Object Key Paths <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23object--keys-999" alt="#object-keys"/></h1><blockquote><p>by CattChen <a href="https://github.com/ChenKS12138" target="_blank">@ChenKS12138</a></p></blockquote><p><a href="https://tsch.js.org/7258/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Get all possible paths that could be called by [_.get](https://lodash.com/docs/4.17.15#get) (a lodash function) to get the value of an object

```typescript
type T1 = ObjectKeyPaths<{ name: string; age: number }>; // expected to be 'name' | 'age'
type T2 = ObjectKeyPaths<{
  refCount: number;
  person: { name: string; age: number };
}>; // expected to be 'refCount' | 'person' | 'person.name' | 'person.age'
type T3 = ObjectKeyPaths<{ books: [{ name: string; price: number }] }>; // expected to be the superset of 'books' | 'books.0' | 'books[0]' | 'books.[0]' | 'books.0.name' | 'books.0.price' | 'books.length' | 'books.find'
```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/7258/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/7258/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end--> 
 
### Solution
 
 
```ts
type IndexPath<Ref extends readonly 1[]> =
  | `.[${Ref['length']}]`
  | `[${Ref['length']}]`
  | `.${Ref['length']}`

type ListPaths<T extends readonly any[], IndexRef extends readonly 1[] = []> =
    T extends readonly [infer P, ...infer Rest]
      ?
      | IndexPath<IndexRef>
      | ListPaths<Rest, [...IndexRef, 1]>
      | (P extends Record<string, unknown> ? `${IndexPath<IndexRef>}.${ObjectKeyPaths<P>}` : never)
      : never

type ObjectKeyPaths<T extends Record<string, unknown>> = {
  [Key in Exclude<keyof T, symbol>]:
    | Key
    | (
      T[Key] extends Record<string, unknown>
        ? `${Key}.${ObjectKeyPaths<T[Key]>}`
        : never
    )
    | (
      T[Key] extends readonly any[]
        ? `${Key}${ListPaths<T[Key]>}`
        : never
    )
}[Exclude<keyof T, symbol>]
```
