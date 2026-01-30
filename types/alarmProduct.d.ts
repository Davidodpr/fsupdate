declare type AlarmProduct = {
  name: string
  image: { dimensions: { width: number; height: number }; alt: string; copyright: null; url: string }
  description: [RTNode]
  price: string
  categories: string
}

declare type AlarmCartProduct = {
  name: string
  price: string
}
