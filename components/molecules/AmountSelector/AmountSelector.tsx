import React, { useState } from 'react'
import { CartListItem } from '@/common/context/alarmCart/alarmCartContext'
import { amountSelectorWrapperVariants, minusButtonVariants, plusButtonVariants, amountDisplayVariants } from './AmountSelector.variants'

export interface AmountSelectorProps {
  addProduct: (item: CartListItem<AlarmCartProduct>) => void
  removeProduct: (item: CartListItem<AlarmCartProduct>) => void
  item: AlarmCartProduct
  cartQuantity?: number
}

const AmountSelector = ({ addProduct, removeProduct, item, cartQuantity }: AmountSelectorProps) => {
  const [internalAmount, setInternalAmount] = useState(cartQuantity || 1)

  return (
    <div className={amountSelectorWrapperVariants()} data-testid="amount-selector-container">
      <div
        className={minusButtonVariants()}
        onClick={() => {
          if (internalAmount >= 1) {
            removeProduct({ item, quantity: internalAmount - 1 })
            setInternalAmount(internalAmount - 1)
          }
        }}
      >
        <p>-</p>
      </div>

      <div className={amountDisplayVariants({ large: internalAmount > 9 })}>{internalAmount}</div>

      <div
        className={plusButtonVariants()}
        onClick={() => {
          addProduct({ item, quantity: internalAmount + 1 })
          setInternalAmount(internalAmount + 1)
        }}
      >
        <p>+</p>
      </div>
    </div>
  )
}

export default AmountSelector
