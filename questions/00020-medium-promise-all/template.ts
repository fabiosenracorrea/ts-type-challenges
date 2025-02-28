declare function PromiseAll<T extends [any?, ...any[]]>(values: T): Promise<{
  [Index in keyof T]: Awaited<T[Index]>
}>
