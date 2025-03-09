// ------------------- IMPLEMENTATION --------------------------- //

type Returns<T> = {
  [K in keyof T]: T[K] extends (...p: any[]) => any ? ReturnType<T[K]> : never
}

declare function defineStore<
  State extends object,

  Getters extends object,

  Actions extends object,
>(store: {
  id: string

  state: () => State

  getters: Getters & ThisType<Readonly<State> & Returns<Getters>>

  actions: Actions & ThisType<State & Actions>
}): Actions & Readonly<State> & Returns<Getters>
