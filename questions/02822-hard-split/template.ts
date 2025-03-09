/**
 * Don't know if i'm a fan of the edge cases
 */
type Split<T extends string, Ref extends string | undefined = undefined> =
  T extends ''
    ? Ref extends ''
      ? []
      : ['']
    : T extends `${infer Piece}${Ref}${infer Rest}`
      ? [Piece, ... Split<Rest, Ref>]
      : string extends T
        ? string[]
        : [T]
