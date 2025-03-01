type AppendArgument<Fn extends (...p: any[]) => any, Arg> =
  Fn extends (...r: infer Params) => any
    ? (...p: [...Params, Arg]) => ReturnType<Fn>
    : (p: Arg) => ReturnType<Fn>
