interface Constraint {
  [key: string]: string
}

interface Node {
  constraints?: Constraint
  [key: string]: unknown
}

export function extractDtoValidationErrors(obj: Node | Node[]): string[] {
  const messages: string[] = []

  // Helper function to recursively traverse the object
  function traverse(node: Node | Node[]): void {
    if (Array.isArray(node)) {
      node.forEach(traverse)
    } else if (node && typeof node === 'object') {
      if (node.constraints && typeof node.constraints === 'object') {
        Object.values(node.constraints).forEach((message) => messages.push(message))
      } else if (node.error === 'Bad Request') {
        messages.push(node.message as string)
      }

      Object.values(node).forEach((value) => traverse(value as Node | Node[]))
    }
  }

  traverse(obj)

  const messagesToReturn = messages.map((message) => {
    if (typeof message === 'string') {
      return message
    } else return null
  })

  return messagesToReturn?.filter((message) => message !== null) as string[]
}
