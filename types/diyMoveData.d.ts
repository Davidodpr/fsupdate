export type UserDIYMoveData = {
  customer: {
    name: string
    phoneNumber: string
    email: string
  }
  products: Product[]
  deliveryAddress: DeliveryAddress
  date: string
  time: string
  price: number
  numberOfPackages: number | string
  totalPackageWeight: string
}

declare type DeliveryAddress = {
  address: string
  additionalInfo: string
}

declare type Product = {
  name: string
  quantity: number
  price: number
}
