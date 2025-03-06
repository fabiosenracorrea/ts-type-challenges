/**
 * Because Required<{ key?: undefined }> = { key: never } instead of { key: undefined }
 *
 * We need the special case. Optional keys are already handled by the -?
 *
 * Also important to note undefined extends X != X extends undefined
 */
type ObjectEntries<T> = {
  [K in keyof T]-?: [
    K,
    undefined extends Required<T>[K]
      ? T[K]
      : [Exclude<T[K], undefined>] extends [never] ? undefined : Exclude<T[K], undefined>,
  ]
}[keyof T]
