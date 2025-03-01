// '' is the default case

type Replace<Text, From extends string, To extends string> =
  From extends ''
    ? Text
    : Text extends `${infer P}${From}${infer Z}`
      ? `${P}${To}${Z}`
      : Text
