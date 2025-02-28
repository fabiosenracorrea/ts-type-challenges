type AnyArray = unknown[] | readonly unknown[]

type Concat<T extends AnyArray, U extends AnyArray> = [...T, ...U]
