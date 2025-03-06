import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]

// ------------------- IMPLEMENTATION --------------------------- //

type AppendStr<Options extends string[], Joiner extends string> =
  Options extends [infer _P, ...unknown[]]
    ? `${Joiner}${Options[number]}`
    : ''

type BEM<Block extends string, El extends string[], Modifier extends string[]> = `${Block}${AppendStr<El, '__'>}${AppendStr<Modifier, '--'>}`
