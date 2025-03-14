<!--info-header-start--><h1>DeepPick <img src="https://img.shields.io/badge/-hard-de3d37" alt="hard"/> <img src="https://img.shields.io/badge/-%23deep-999" alt="#deep"/></h1><blockquote><p>by hiroya iizuka <a href="https://github.com/hiroyaiizuka" target="_blank">@hiroyaiizuka</a></p></blockquote><p><a href="https://tsch.js.org/956/play" target="_blank"><img src="https://img.shields.io/badge/-Take%20the%20Challenge-3178c6?logo=typescript&logoColor=white" alt="Take the Challenge"/></a> </p><!--info-header-end-->

Implement a type DeepPick, that extends Utility types `Pick`.
A type takes two arguments.


For example:

```ts
type obj = {
  name: 'hoge', 
  age: 20,
  friend: {
    name: 'fuga',
    age: 30,
    family: {
      name: 'baz',  
      age: 1 
    }
  }
}

type T1 = DeepPick<obj, 'name'>   // { name : 'hoge' }
type T2 = DeepPick<obj, 'name' | 'friend.name'>  // { name : 'hoge' } & { friend: { name: 'fuga' }}
type T3 = DeepPick<obj, 'name' | 'friend.name' |  'friend.family.name'>  // { name : 'hoge' } &  { friend: { name: 'fuga' }} & { friend: { family: { name: 'baz' }}}

```


<!--info-footer-start--><br><a href="../../README.md" target="_blank"><img src="https://img.shields.io/badge/-Back-grey" alt="Back"/></a> <a href="https://tsch.js.org/956/answer" target="_blank"><img src="https://img.shields.io/badge/-Share%20your%20Solutions-teal" alt="Share your Solutions"/></a> <a href="https://tsch.js.org/956/solutions" target="_blank"><img src="https://img.shields.io/badge/-Check%20out%20Solutions-de5a77?logo=awesome-lists&logoColor=white" alt="Check out Solutions"/></a> <!--info-footer-end-->
 
 
### Solution
 
 
```ts
type DeepPick<T, Keys extends string> =
  UnionToIntersection<
    Keys extends ''
      ? never
      :
        & (Keys extends keyof T ? Pick<T, Extract<keyof T, Keys>> : unknown)
        &
        (
            Keys extends `${keyof T & string}.${string}`
              ? {
                  [K in Keys as K extends `${infer Start extends keyof T & string}.${string}` ? Start : never]:
                  K extends `${infer Start extends keyof T & string}.${infer DeepPath}`
                    ? DeepPick<T[Start], DeepPath>
                    : never
                }
              : unknown
          )
  >

// Using a modification of the "Get" type we build earlier
type DeepGet<T, Prop extends string> =
  Prop extends keyof T
    ? { [K in Prop]: T[Prop] }
    : Prop extends `${infer FirstPath extends keyof T & string}.${infer Rest}`
      ? { [K in FirstPath]: DeepGet<T[FirstPath], Rest> }
      : never

type DeepPick2<T, Keys extends string> = UnionToIntersection<DeepGet<T, Keys>>
```
