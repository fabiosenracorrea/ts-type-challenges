// Buildup from Replace

type ReplaceAll<Text, From extends string, To extends string> =
  From extends ''
    ? Text
    : Text extends `${infer P}${From}${infer Z}`
      ? `${ReplaceAll<P, From, To>}${To}${ReplaceAll<Z, From, To>}`
      : Text
