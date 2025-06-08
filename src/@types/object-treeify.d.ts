declare module 'object-treeify' {
  export type Node = boolean | null | number | string | Tree | undefined

  export type Tree = {
    [key: string]: Node
  }

  export type Options = {
    breakCircularWith?: null | string
    joined?: boolean
    keyNeighbour: ?string
    keyNoNeighbour: ?string
    renderFn?: (node: Node) => boolean | undefined
    separator: ?string
    sortFn?: ((a: string, b: string) => number) | null
    spacerNeighbour?: string
    spacerNoNeighbour?: string
  }

  function F(tree: Tree, options?: Options): string

  export = F
}
