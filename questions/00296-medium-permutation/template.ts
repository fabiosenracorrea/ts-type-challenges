/**
 * Ref: https://github.com/type-challenges/type-challenges/issues/14483
 *
 * why [K] extends [never]？
 * TypeScript treats never as an empty union when distributing over conditionals.
 * This means that 'a' | never when getting distributed just gets shortened to 'a'
 * when distributing. This also means 'a' | (never | 'b') | (never | never) just becomes
 * 'a' | 'b' when distributing, because the never part is equivalent to an empty union
 * and we can just combine all the unions.
 *
 * why K extends K？
 * K extends K is obviously always going to be true right?
 * So why even have it in a conditional in the first place?
 * We know that type unions get distributed over conditionals, we also know that...wait!?!?
 * "Type unions get distributed over conditionals", that's it!
 *
 * This is a cheeky hack to make 'a' | 'b' | 'c' result parse over a then b then c
 * in the conditional. It makes each one trigger the conditional then unions the results
 *  together. Pretty awesome huh? It's kinda like a for-each loop for type unions.
 *
 * For our example K extends K will be evaluated for 'a' | 'b' | 'c' three times.
 * Then there will be N! tuples built per iteration (because we recurse with N-1).
 * The way TypeScript works is that unions are flat, so all the unions of the inner
 * recursions will be lifted to the final level.
 *
 * ============= My comments =============
 *
 * If we do type Str<T> = T extends string ? `_${T}` : T;
 * to 'A' | 'B' the result is like doing Str<'A'> | Str<'B'>
 * But if we "save" the type in a accumulator/other variable,
 * its saved as the whole 'A' | 'B' type, meaning
 */
type Permutation<T, Acc = T> =
    [T] extends [never]
      ? []
      : Acc extends Acc
        ? [Acc, ...Permutation<Exclude<T, Acc>>]
        : never
