type NumTuple<Size extends number, Acc extends readonly any[] = []> =
  Acc['length'] extends Size
    ? Acc[number]
    : NumTuple<Size, [...Acc, Acc['length']]>

/**
 * We add Start/End back to ensure exclusion does not, well, exclude them ;)
 */
type NumberRange<Start extends number, End extends number> = Exclude<NumTuple<End>, NumTuple<Start>> | Start | End
