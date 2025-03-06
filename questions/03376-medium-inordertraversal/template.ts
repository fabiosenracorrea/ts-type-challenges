interface Node {
  val: number
  left: Node | null
  right: Node | null
}

type InorderTraversal<T extends Node | null> =
  T extends Node
    ? [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>]
    : []
