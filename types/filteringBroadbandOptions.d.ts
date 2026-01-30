declare type BroadbandFilterOptions = {
  speed?: number
  sortBy?: string
  isRouter?: boolean
  types?: string[]
  selectedPackages?: SelectedPackage
}

declare type SelectedPackage = {
  router?: boolean
  tv?: boolean
}
