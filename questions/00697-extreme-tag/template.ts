/**
 * Wacky concept aside, this challenge is
 * a resistance test to see how far you can tweak
 * and dance around type restrictions and assign-abilities
 * inside TS
 *
 * It really takes it to the `extreme` levels,
 * enforcing lots of never any unknown checks,
 * union distributivity / handling
 *
 * The core idea is simple:
 *
 * A tagged token is an object that has a symbol key,
 * which in turn saves the applied tags + the type value that was tagged
 *
 * After that is decided, the 'fun' begins. We need assignable cases,
 * as in:
 *  string extends Tag<string, 'hi!'>
 *
 * We need to handle edge cases that are greedy to checks, such as never, unknown and any,
 * as to prevent `string extends any` and such
 *
 * Check comments to see the full reasoning to each.
 *
 * Yes, it takes time to understand it. Play around with the test results to
 * see what each call results into
 *
 * Check my breakdown on the repo:
 *
 */
type IsNull<T> = [T] extends [null] ? true : false

type IsUnknown<T> = (
	unknown extends T // `T` can be `unknown` or `any`
	  ? IsNull<T> extends false // `any` can be `null`, but `unknown` can't be
	    ? true
	    : false
	  : false
)

type Tagged = { [K in symbol]: { _______________tags___________: string[], __value__: any } }

/**
 * A simply T extends Tagged is not enough,
 * but because how TS can resolve the type
 * after we go for the true branch on IsTagged<T>
 * you'll often see `IsTagged` followed by `T extends Tagged`
 * to make TS happy and let us access the internal structure
 *
 * Edge cases:
 *
 * any | never causes either `boolean` or `true` to be returned
 */
type IsTagged<
  T,

  _Ref = Extract<T, Tagged>,
> =
  [_Ref] extends [never]
    ? false
    : IsAny<_Ref> extends true
      ? false
      : symbol extends keyof _Ref
        ? '__value__' extends keyof _Ref[symbol]
          ? '_______________tags___________' extends keyof _Ref[symbol]
            ? true
            : false
          : false
        : false

type GetTaggedValue<T, Fallback = T> =
  IsTagged<T> extends true
    ? T extends Tagged
      ? T[symbol]['__value__']
      : Fallback
    : Fallback

/**
 * ======================== GET TAGS ============================
 */

/**
 * Usage as described in IsTagged
 */
type GetTagsInner<B> =
    IsTagged<B> extends true
      ? B extends Tagged
        ? B[symbol]['_______________tags___________']
        : []
      : []

/**
 * Here we can't simply return _RESULT,
 * as if we have:
 *
 *  GetTags<Tag<0, 'foo'> | 1>
 *
 * we don't really have tags, as we have a non-tagged union,
 * but _RESULT gets us ['foo'], as we narrow our type before
 * calling GetTagsInner, which is correct to not get us [] | []
 * scenarios
 *
 * Because of this, we need to verify if:
 *  - GetTags is being called on a non-nullable union (as our requirements!)
 *       If not, _RESULT is expected
 *  - If we are inside a non-nullable union, we still can't return [],
 *    as GetTags<
 *        | Tag<0, 'foo'>
 *        | Tag<1, 'foo'>
 *       >
 *    is a valid call, meaning _RESULT = ['foo']
 *
 *    AND! Even if it wasn't, because of the assign-ability requirement,
 *      Tag<0, 'foo'> == 1 | Tagged<1>
 *    which is a union by itself!!
 *
 *    As a conclusion, need a further check after we know its a union:
 *
 *    Do we still have anything left on this union if we remove any Tagged trace of it?
 *      ==> To remove the trace, we need to Exclude BOTH the `Tagged` type AND its value
 *    If we do have anything left, we have a bad union
 */
type GetTags<
  B,

  _RESULT = GetTagsInner<
    Extract<NonNullable<B>, Tagged>
  >,
> =
  IsUnion<NonNullable<B>> extends true
    ? [Exclude<NonNullable<B>, Tagged | GetTaggedValue<B, never>>] extends [never]
        ? _RESULT
        : []
    : _RESULT

/**
 * ======================== TAGGING ============================
 */

/**
 * Here's where the magic happens, we have the main Tag<> with 2 inner helpers to
 * facilitate breaking the actions in pieces we can grasp
 */

/**
 * To ensure assign-ability (string extends Tag<string> for example),
 * we MUST have a union, because string itself needs to be inside Tag<string>
 * for that to be true
 *
 * (Always good to remember: X extends Y == does Y contain X?)
 *
 * Obviously we cannot simply do Tagged | T,
 * so the union is only returned if T is NOT:
 *  - any
 *  - never
 *  - unknown
 *  - nullable (undefined | null)
 *  - object (because for those we merge!)
 *
 * Having that extensive ruleset out of the way,
 * the main Tagged type:
 *
 * - Gets merged with Target if its an object (remember obj & unknown = obj)
 * - Is just the Tagged we defined at the start, properly merged, meaning:
 *    _value is always 1 level, if Target is already an Tagged type we retrieve it, otherwise _value = Target
 *    _tags are concat'd easily, as our GetTags already accounts for Tagged or not
 *
 */
type ResolveTag<Target, T extends string> =
  | (
    & {
      [K in symbol]: {
        __value__: GetTaggedValue<Target>

        _______________tags___________:
        GetTags<Target> extends unknown[]
          ? [...GetTags<Target>, T]
          : [T]
      }
    }
    & (
        // Merge Target to Tagged if obj
        [Target] extends [never]
          ? unknown
          : IsAny<Target> extends true
            ? unknown
            : Target extends Record<string, unknown>
              ? IsTagged<Target> extends true
                ? unknown
                : Target
              : unknown
      )
  )
  | (
    IsAny<Target> extends true
      ? never
      : Target extends Record<string, unknown>
        ? never
        : IsTagged<Target> extends true
          ? never
          : IsUnknown<Target> extends true
            ? never
            : NonNullable<Target>
  )

/**
 * Here we split calls with edge-awareness:
 *
 * - If we receive a tagged item, we need to further Tag it,
 *   NOT create variant unions out of it. For every other type inside our union,
 *   we simply return it back
 *
 * - Never and any are edged-out to ensure our nullable check
 *   picks up properly
 *
 * - Otherwise, ResolveTag ensures the action
 */
type TagInner<B, T extends string> =
  IsTagged<B> extends true
    ? ResolveTag<Extract<B, Tagged>, T> | Exclude<B, Tagged> // prevent distribution to create more tag unions
    : [B] extends [never]
        ? ResolveTag<B, T>
        : IsAny<B> extends true
          ? ResolveTag<B, T>
          : B extends undefined | null
            ? B
            : ResolveTag<B, T>

/**
 * Get the undefined | null out of the way immediately!
 *
 * Otherwise is way harder to add filters for them
 * on the much more complex inner logic
 */
type Tag<B, T extends string> =
  IsUnion<B> extends true
    ? NonNullable<TagInner<B, T>>
    : TagInner<B, T>

/**
 * ======================== REMOVING THE TAG ============================
 */

/**
 * The concept here is simple:
 *
 * Check if we tagged and dig for the value, otherwise, simply return the non-tagged type
 *
 * Its important to note we can't use GetTaggedValue directly because of the Unions
 * inside the Tag result
 *
 * Doing it like this ensures
 *  UnTag<number | Tagged<number>> = number | number = number
 */
type UnTag<B> = IsTagged<B> extends true
  ? B extends Tagged
    ? B[symbol]['__value__']
    : B
  : B

/**
 * ======================== HAS TAG ============================
 */

/**
 * This one is simple: get the tags and see if their
 * union matches the test value
 *
 * Because TS can't really infer GetTags<X> as a list with certainty,
 * we add narrow for it with the extends
 */
type HasTagInner<
  B,
  T extends string,
  _Tags = GetTags<NonNullable<B>>,
> =
  _Tags extends string[]
    ? T extends _Tags[number]
      ? true
      : false
    : false

type HasTag<B, T extends string> = HasTagInner<B, T> extends true ? true : false

/**
 * ======================== HAS TAGS ============================
 */

/**
 * Important: Checks if the tags were applied in succession, as requirement
 *
 * The name choice here is BAD. Oh well!
 *
 * To check if we have the correct order applied, we need:
 *
 * 1. control variable to tell recursive calls we are in the middle of the tag streak
 * 2. Properly control our end cases:
 *     - if we get to the end with 0 tags in our list = yes, we have a streak!
 *     - if we find a tag that is not in our streak (CheckStarted = true + NextTag != TagToCheck)
 *       we restart the whole check, sending all the tags again to ensure we can streak them all
 */
type HasTagsInner<
  B,
  T extends readonly string[],

  _TAGS = GetTags<B>,

  CheckStarted extends boolean = false,
> =
  _TAGS extends readonly [infer NextTag extends string, ...infer Rest extends readonly string[]]
    ? T extends readonly [infer TagToCheck extends string, ...infer RestTags extends readonly string[]]
      ? NextTag extends TagToCheck
        ? HasTagsInner<B, RestTags, Rest, true>
        : CheckStarted extends true
          ? false // streak break
          : HasTagsInner<B, [TagToCheck, ...RestTags], Rest> // we need to start the streak all over
      : true
    : T['length'] extends 0
      ? true // we consumed all the tags successfully!
      : false

type HasTags<
  B,
  T extends readonly string[],
> =
  true extends HasTagsInner<B, T>
    ? true
    : false

type HasExactTags<
  B,
  T extends readonly string[],

  _TAGS = GetTags<B>,
> =
  _TAGS extends unknown[]
    ? _TAGS['length'] extends T['length']
      ? HasTags<B, T>
      : false
    : false
