export function extractChangeAddressSkatteverketProperties(obj: any): {
  kvittensnummer?: string
  samtyckeHarInitierats?: boolean
  inflyttningsdatum?: string
} {
  const result: {
    kvittensnummer?: string
    samtyckeHarInitierats?: boolean
    inflyttningsdatum?: string
  } = {}

  function traverse(current: any) {
    if (typeof current !== 'object' || current === null) {
      return
    }

    for (const key in current) {
      if (key === 'kvittensnummer') {
        result.kvittensnummer = current[key]
      } else if (key === 'samtyckeHarInitierats') {
        result.samtyckeHarInitierats = current[key]
      } else if (key === 'inflyttningsdatum') {
        result.inflyttningsdatum = current[key]
      } else if (typeof current[key] === 'object') {
        traverse(current[key])
      }
    }
  }

  traverse(obj)
  return result
}
