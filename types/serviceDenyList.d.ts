export type serviceDenyListType = {
  movehelp: {
    buyer: {
      cleaning: string[]
      cleaningAndMoving: string[]
    }
    seller: {
      cleaning: string[]
      cleaningAndMoving: string[]
    }
  }
  insurance: {
    buyer: string[]
    seller: string[]
  }
}
