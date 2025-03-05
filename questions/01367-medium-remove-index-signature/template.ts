/**
 * This works because:
 *  'hello' extends string => true
 *  string extends 'hello' => false
 *
 * We want only the actual defined keys (eg 'hello') to pass on
 */
type RemovePrimitive<K> =
  string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K

type RemoveIndexSignature<T> = {
  [K in keyof T as RemovePrimitive<K>]: T[K];
}
