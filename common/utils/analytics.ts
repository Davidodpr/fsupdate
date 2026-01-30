// GTM
export const setEventParameter = (param: Record<string, string>) => {
  window?.dataLayer?.push(param)
}

export const sendEcommercePush = ({
  event,
  checkoutStep,
  items,
  flyttsmartRevenue,
  userData,
  transactionId,
  sendEvidentlyEvent,
  pathname,
}: {
  event: string
  checkoutStep?: string
  items?: Record<string, string | number | Date | boolean>[]
  flyttsmartRevenue?: string | number
  userData?: Record<string, string | number | null | undefined | Record<string, string | number | null | undefined>>
  transactionId?: string | boolean
  sendEvidentlyEvent?: (detailsData: Record<string, number>) => void
  pathname?: string
}): void => {
  const gaItems: Record<string, string | number | Date | boolean>[] = []
  if (items) {
    items.map((item) => {
      gaItems.push({
        item_id: `SKU_${item.name}`,
        item_name: item.name,
        currency: 'SEK',
        item_brand: item.brand,
        item_category: item.category,
        price: Number(item.price) ? Number(item.price) : 0,
        quantity: item.quantity,
        date: item.date,
        providerPosition: item?.position,
        sorting: item?.sorting,
        showedMoreAlternatives: item?.showedMoreAlternatives,
      })
    })
  }
  window.dataLayer?.push({})
  if (event === 'begin_checkout' || event === 'purchase' || event === 'add_to_cart' || event === 'remove_from_cart') {
    const totalValue = gaItems
      .filter((item) => !item.price.toString().includes('mån') && !item.price.toString().includes('month') && !item.price.toString().includes('hour'))
      .reduce((previousValue, { price, quantity }) => previousValue + Number(price) * Number(quantity), 0)
    window.dataLayer?.push({
      event: event,
      flyttsmartRevenue: Number(flyttsmartRevenue) || 0,
      ecommerce: {
        transaction_id: transactionId,
        value: Number(totalValue),
        currency: 'SEK',
        checkout_step: checkoutStep,
        flyttsmartRevenue: Number(flyttsmartRevenue) || 0,
        items: gaItems,
        user_data: userData ? userData : null,
      },
    })
    if (event === 'purchase' && sendEvidentlyEvent) {
      if (pathname?.includes('movehelp') || pathname?.includes('moveclean')) {
        sendEvidentlyEvent({
          purchase: 1.0,
          purchaseRevenue: Number(totalValue) || 0,
        })
      }
    }
  } else if (!checkoutStep) {
    window.dataLayer?.push({
      event: event,
      ecommerce: {
        checkout_step: checkoutStep,
        items: gaItems,
      },
    })
  }
}
