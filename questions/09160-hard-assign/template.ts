import type { MergeInsertions } from '@type-challenges/utils'

type Assign<T extends Record<string, unknown>, Mergers extends unknown[]> =
  Mergers extends [infer Next extends Record<string, unknown>, ...infer Rest]
    ? Assign<
      Omit<T, keyof Next> & Next,
      Rest
    >
    : MergeInsertions<T>
