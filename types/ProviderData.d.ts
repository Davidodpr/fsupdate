declare type AddOnsRadio = {
  title: string
  subtitle: string
}

declare type AddOnOption = {
  price: number
  grossPrice?: number
}
declare type PriceObject = {
  price: number
  grossPrice?: number
}

declare type MovehelpProvider = {
  rating: number
  provider: string
  reviews: number
  discountAmount?: string
  price: number
  grossPrice?: number
  addOns: AddOns
}

declare type MoveCleanProvider = {
  rating: number
  provider: string
  reviews: number
  discountAmount?: string
  price: number
  grossPrice?: number
}
