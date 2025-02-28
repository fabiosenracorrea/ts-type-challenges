type If<T extends boolean, Y, N> = T extends true ? Y : N

// ------------------- EXTENDING... --------------------------- //

/**
 * Considers Falsy values too! (Except for NaN)
 */
type Falsy = false | undefined | null | 0 | ''

type IfExtended<T, Y, N> = T extends Falsy ? N : Y

// Note: this does not narrow if something like null | number | string | undefined
// is passed, as we can't guarantee which would be
