type Joined<Delimiter extends string, Chars extends string[], Add extends boolean = false> =
  Chars extends [infer Next extends string, ...infer Rest extends string[]]
    ? `${Add extends true ? Delimiter : ''}${Next}${Joined<Delimiter, Rest, true>}`
    : ''

declare function join<Delimiter extends string>(delimiter: Delimiter): <Chars extends string[]>(...parts: Chars) => Joined<Delimiter, Chars>
