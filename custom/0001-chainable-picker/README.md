<!--info-header-start--><h1>Chainable Picker <img src="https://img.shields.io/badge/-medium-d9901a" alt="medium"/> <img src="https://img.shields.io/badge/-%23chainable-999" alt="#chainable"/> <img src="https://img.shields.io/badge/-%23mapped--types-999" alt="#mapped-types"/> <img src="https://img.shields.io/badge/-%23conditional--types-999" alt="#conditional-types"/></h1><!--info-header-end-->

Implement a `pick` function that returns a chainable object allowing you to select properties from an object by chaining property access. When you call the chain with `()`, it returns an object containing only the picked properties.

The chainable picker should:
- Allow chaining property names to select multiple properties
- Prevent picking the same property twice
- Only allow picking properties that exist on the object
- Return the picked object when called with `()`

For example:

```ts
type Person = {
  name: string
  id: string
  age: number
  email: string
}

const obj = {} as Person

// Pick multiple properties by chaining
const result1 = pick(obj).name.age()
// result1: { name: string, age: number }

const result2 = pick(obj).email.id.name()
// result2: { email: string, id: string, name: string }

// You cannot pick the same property twice
const invalid = pick(obj).name.name() // Type error!

// You can only pick existing properties
const invalid2 = pick(obj).invalid() // Type error!
```


### Solution


```ts
type AnyObject = Record<string, any>

type Caller<
  T extends AnyObject,
  Picked extends keyof T | never,
> = (IsNever<Picked> extends true
  ? unknown
  : {
      (): Pick<T, Picked>
    })

type Picker<
  T extends AnyObject,
  Picked extends keyof T | never = never,
> = Caller<T, Picked> & {
  [Key in keyof Pick<T, Exclude<keyof T, Picked>>]: Picker<T, Picked | Key>
}

declare function pick<T extends AnyObject>(obj: T): Picker<T>
```
