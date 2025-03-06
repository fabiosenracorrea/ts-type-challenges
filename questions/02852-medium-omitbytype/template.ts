type OmitByType<Obj, T> = {
  [Key in keyof Obj as Obj[Key] extends T ? never : Key]: Obj[Key]
}
