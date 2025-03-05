/**
 * Here we do a clever check, because never extends never = false
 */
type IsNever<T> = [T] extends [never] ? true : false
