import React, { useState, HTMLAttributes } from 'react'
import { sendEcommercePush } from '@/common/utils/analytics'
import { CartContextType, CartListItem, CartItemBase } from './alarmCartContext'

export type CartContextProps<TItemType extends CartItemBase> = {
  context: React.Context<CartContextType<TItemType>>
} & HTMLAttributes<HTMLDivElement>

export const CartContextProvider = <TItemType extends CartItemBase>({ children, context }: CartContextProps<TItemType>) => {
  const [products, setProducts] = useState<CartListItem<TItemType>[]>([])
  const getProductByName = (name: string): CartListItem<TItemType> | undefined => {
    return products.find((p) => p.item.name === name)
  }

  const addMultipleProductsToCart = (allProducts: CartListItem<TItemType>[]) => {
    let newState: CartListItem<TItemType>[] = products
    allProducts.forEach((product) => {
      const existingProduct = getProductByName(product.item.name)
      if (existingProduct) {
        newState = newState.map((p) => {
          if (p.item.name === existingProduct.item.name) {
            return {
              item: p.item,
              quantity: product.quantity,
            }
          }
          return p
        })
      } else {
        newState = [...newState, product]
      }
    })
    sendEcommercePush({
      event: 'add_to_cart',
      items: newState.map((item) => {
        return { name: item.item.name, brand: 'Widesec', category: 'Hemlarm', price: item.item.price, quantity: item.quantity, date: new Date().toLocaleDateString('se-sv') }
      }),
    })
    setProducts(newState)
  }

  const addProductToCart = (product: CartListItem<TItemType>): void => {
    const existingProduct = getProductByName(product.item.name)
    let newState: CartListItem<TItemType>[] = []
    if (existingProduct) {
      newState = products.map((p) => {
        if (p.item.name === existingProduct.item.name) {
          return {
            item: p.item,
            quantity: product.quantity,
          }
        }
        return p
      })
      setProducts(newState)
    } else {
      setProducts([...products, product])
    }
    sendEcommercePush({
      event: 'add_to_cart',
      items: [
        { name: product.item.name, brand: 'Widesec', category: 'Hemlarm', price: product.item.price, quantity: product.quantity, date: new Date().toLocaleDateString('se-sv') },
      ],
    })
  }
  const removeProductFromCart = (product: CartListItem<TItemType>): void => {
    const productInCart = getProductByName(product.item.name)
    if (!!productInCart) {
      if (product.quantity < 1) {
        const newProducts = products.filter((p) => p.item.name !== product.item.name)
        setProducts(newProducts)
      } else {
        let newState: CartListItem<TItemType>[] = []
        if (productInCart) {
          newState = products.map((p) => {
            if (p.item.name === productInCart.item.name) {
              return {
                item: p.item,
                quantity: product.quantity,
              }
            }
            return p
          })
          setProducts(newState)
        }
      }
      sendEcommercePush({
        event: 'remove_from_cart',
        items: [
          {
            name: product.item.name,
            brand: 'Widesec',
            category: 'Hemlarm',
            price: product.item.price,
            quantity: product.quantity + 1,
            date: new Date().toLocaleDateString('se-sv'),
          },
        ],
      })
    }
  }
  const removeMultipleProductsFromCart = (allProducts: CartListItem<TItemType>[]) => {
    let newState: CartListItem<TItemType>[] = products
    allProducts.forEach((product) => {
      newState = newState.filter((p) => p.item.name !== product.item.name)
    })
    sendEcommercePush({
      event: 'remove_from_cart',
      items: newState.map((item) => {
        return { name: item.item.name, brand: 'Widesec', category: 'Hemlarm', price: item.item.price, quantity: item.quantity + 1, date: new Date().toLocaleDateString('se-sv') }
      }),
    })
    setProducts(newState)
  }
  const isProductInCart = (name: string) => {
    return !!getProductByName(name)
  }

  const contextValue: CartContextType<TItemType> = {
    cart: products,
    addProductToCart: addProductToCart,
    removeProductFromCart: removeProductFromCart,
    isProductInCart: isProductInCart,
    addMultipleProductsToCart: addMultipleProductsToCart,
    removeMultipleProductsFromCart: removeMultipleProductsFromCart,
  }

  return <context.Provider value={contextValue}>{children}</context.Provider>
}
