type AppendStr<Options extends string[], Joiner extends string> =
  Options extends [infer _P, ...unknown[]]
    ? `${Joiner}${Options[number]}`
    : ''

type BEM<Block extends string, El extends string[], Modifier extends string[]> = `${Block}${AppendStr<El, '__'>}${AppendStr<Modifier, '--'>}`
