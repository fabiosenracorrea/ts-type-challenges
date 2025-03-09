type FromConstructor<T> =
  T extends StringConstructor
    ? string
    : T extends NumberConstructor
      ? number
      : T extends BooleanConstructor
        ? boolean
        : T extends RegExpConstructor
          ? RegExp
          : T extends unknown[]
            ? FromConstructor<T[number]>
            : T extends new () => infer P
              ? P
              : any

type FromProps<T> = {
  [K in keyof T]:
  T[K] extends { type: any }
    ? FromConstructor<T[K]['type']>
    : FromConstructor<T[K]>
}

declare function VueBasicProps<
  Props,
  Data,
  Computed extends Record<string, () => any>,
  Methods,
>(options: {
  props: Props

  data: (this: FromProps<Props>, ...p: never) => Data

  computed: Computed & ThisType<Data>

  methods: Methods & ThisType<FromProps<Props> & Data & Methods & ToReturnType<Computed>>
}): void
