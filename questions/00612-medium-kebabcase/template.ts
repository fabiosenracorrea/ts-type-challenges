// Holding a value...
type KebabCase1<T extends string, Result extends string = ''> =
  T extends `${infer P}${infer Rest}`
    ? P extends Exclude<Uppercase<P>, '-' | '_'>
      ? KebabCase1<Rest, Result extends '' ? `${Lowercase<P>}` : `${Result}-${Lowercase<P>}`>
      : KebabCase1<Rest, `${Result}${P}`>
    : Result

type KebabCase<T extends string> =
  T extends `${infer P}${infer R}`
    ? R extends Uncapitalize<R>
      ? `${Lowercase<P>}${KebabCase<R>}`
      : `${Lowercase<P>}-${KebabCase<R>}`
    : T
