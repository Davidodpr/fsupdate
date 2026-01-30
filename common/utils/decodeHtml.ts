export const decodeHtmlEntities = (str: string) => {
  const parser = new DOMParser()
  const dom = parser.parseFromString(`<!doctype html><body>${str}`, 'text/html')
  return dom.body.textContent ?? str
}
