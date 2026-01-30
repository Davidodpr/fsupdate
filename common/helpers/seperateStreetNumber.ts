export default (fullStreet: string) => {
  const streetNumber = fullStreet.match(/\d+/g)?.join('')
  const street = fullStreet.replace(/\d+/g, '').trim()
  return { street, streetNumber }
}
