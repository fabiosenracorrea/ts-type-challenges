// We basically build a path
type DeepObjectToUniq<T, Source = [T]> = {
  [K in keyof T]: T[K] extends Record<string, unknown> ? DeepObjectToUniq<T[K], [T, K]> : T[K]
} & { [K in symbol]?: Source }
