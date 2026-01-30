export type ExternalAddress = { city?: string; zip?: string; street?: string }

export const addressToString = (address?: ExternalAddress): string => {
  if (!address) return ''
  return `${address.street ?? ''}, ${address.zip ?? ''}, ${address.city ?? ''}`
}
