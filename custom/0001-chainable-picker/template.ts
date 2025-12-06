type AnyObject = Record<string, unknown>

type Caller<
  T extends AnyObject,
  Picked extends keyof T | never,
> = (IsNever<Picked> extends true
  ? unknown
  : {
      (): Pick<T, Picked>
    })

type ChainPicker<
  T extends AnyObject,
  Picked extends keyof T | never = never,
> = Caller<T, Picked> & {
  [Key in keyof Pick<T, Exclude<keyof T, Picked>>]: ChainPicker<T, Picked | Key>
}

declare function pick<T extends AnyObject>(obj: T): ChainPicker<T>

type Person = {
  name: string
  id: string
  age: string
  fuck: string
}

const picked = pick({} as Person).fuck.age.name()
