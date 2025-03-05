type GetSign<T extends string> = T extends `${infer P}${infer _Rest}`
  ? P extends '+' | '-'
    ? P
    : ''
  : ''

type RemovePercent<T extends string> = T extends `${infer N}%` ? N : T

type RemoveSign<T extends string> = T extends `${'+' | '-'}${infer N}` ? N : T

type GetNum<T extends string> = RemovePercent<
  RemoveSign<T>
>

type GetPercent<T extends string> = T extends `${infer _Rest}%` ? '%' : ''

type PercentageParser<T extends string> = [
  GetSign<T>,
  GetNum<T>,
  GetPercent<T>,
]
