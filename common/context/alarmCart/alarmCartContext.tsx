/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react'

export interface CartItemBase {
  name: string
  price: string
}

export type CartListItem<TItemType extends CartItemBase> = {
  item: TItemType
  quantity: number
}

export type CartContextType<TItemType extends CartItemBase> = {
  cart: CartListItem<TItemType>[]
  addProductToCart: (item: CartListItem<TItemType>) => void
  removeProductFromCart: (item: CartListItem<TItemType>) => void
  isProductInCart: (name: string) => boolean
  addMultipleProductsToCart: (items: CartListItem<TItemType>[]) => void
  removeMultipleProductsFromCart: (items: CartListItem<TItemType>[]) => void
}

const defaultContext = {
  cart: [],
  addProductToCart: () => {},
  addMultipleProductsToCart: () => {},
  removeProductFromCart: () => {},
  removeMultipleProductsFromCart: () => {},
  isProductInCart: () => false,
}

export const CreateCartContext = <TItemType extends CartItemBase>() => {
  return createContext<CartContextType<TItemType>>(defaultContext)
}
