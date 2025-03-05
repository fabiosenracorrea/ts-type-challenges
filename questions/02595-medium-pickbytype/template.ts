type PickByType<Obj, T> = {
  [Key in keyof Obj as Obj[Key] extends T ? Key : never]: Obj[Key]
}
