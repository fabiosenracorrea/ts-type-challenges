// We could add a never check if necessary....
type EnsureArray<T> = T extends unknown[] ? T : [T]

type Without<T extends unknown[], ToRemove>
  = T extends [infer R, ...infer Rest]
    ? R extends EnsureArray<ToRemove>[number]
      ? Without<Rest, ToRemove>
      : [R, ...Without<Rest, ToRemove>]
    : T
