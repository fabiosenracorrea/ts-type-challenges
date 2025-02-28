type WhiteSpace = ' ' | '\n' | '\t'

// Recursive remove 1 bad char at a time
type TrimLeft<Target extends string> =
  Target extends `${WhiteSpace}${infer P}`
    ? TrimLeft<P>
    : Target
