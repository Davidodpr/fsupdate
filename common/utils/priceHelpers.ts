const setPriceExampleText = (text: string | undefined | null, price?: string | number, priceUnit?: string | number) => {
  const removeExamplePriceText = text?.replace('[price]', price ? price.toString() : '')
  return removeExamplePriceText?.replace('[priceUnit]', priceUnit ? priceUnit.toString() : 'kr')
}

export default setPriceExampleText
