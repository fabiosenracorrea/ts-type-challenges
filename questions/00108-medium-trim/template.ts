type WhiteSpace_ = ' ' | '\n' | '\t'

// Recursive remove 1 bad char at a time, each side
type Trim<Text extends string> =
  Text extends `${WhiteSpace_}${infer P}`
    ? Trim<P>
    : Text extends `${infer P}${WhiteSpace_}`
      ? Trim<P>
      : Text
