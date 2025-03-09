type _GetRequired<T extends Record<string, unknown>, Req extends T = Required<T>> = {
  [K in keyof T as T[K] extends Req[K] ? K : never]: T[K]
}

type _RequiredKeys<T extends Record<string, unknown>> = keyof _GetRequired<T>

/**
 * This check is distributive, meaning:
 *
 * Is<a> => true
 * Is<b> => false
 * Result = true | false = boolean
 *
 * To account for this, we perform the distributive check
 * and verify if they all colide to `true`
 *
 * Important to note the order of X extends Y
 */
type InnerCheck<T extends Record<string, unknown>, Keys extends keyof T> = Keys extends _RequiredKeys<T> ? true : false

type IsRequiredKey<T extends Record<string, unknown>, Keys extends keyof T> = InnerCheck<T, Keys> extends true ? true : false
