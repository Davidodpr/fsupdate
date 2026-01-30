declare type AlarmData = {
  alarmImage: {
    dimensions: {
      width: number
      height: number
    }
    alt: string
    copyright: null
    url: string
  }
  headerTextBlue: string
  headerTextGreen: string
  startButtonText: string
  additionalServices: string
  startButtonIcon: {
    dimensions: {
      width: number
      height: number
    }
    alt: string
    copyright: null
    url: string
  }
  uspsWithCheckmarkSlices: { items: UspPoint[]; primary: Record; slice_label: null; slice_type: string; variation: string; version: string }[]
  faqSlices: { items: AccordionItem[]; primary: Record; slice_label: null; slice_type: string; variation: string; version: string }[]
  alarmProducts: { items: AlarmProduct[]; primary: Record; slice_label: null; slice_type: string; variation: string; version: string }[]
  productsHeader: string
  basePackage: string
  basePackageIncludes: string
  servicesIncludesList: [RTNode]
  servicesIncludes: string
  townhouseAdditions: string
  livingTypeAdditionsText: string
  moreAdditions: string
  installation: [RTNode]
  installationText: string
  pricePerMonthText: string
  goBackText: string
  goToNextStepButtonText: string
  villaAdditions: string
  apartmentAdditions: string
  livingTypeText: string
  apartment: string
  townhouse: string
  vila: string
  summeryHeader: string
  totalAmount: string
  contactInformation: string
  adressPlaceholder: string
  namePlaceholder: string
  emailPlaceholder: string
  phonePlaceholder: string
  extraPerson: string
  installationDate: string
  recieveProducts: string
  earliestDatePlaceholder: string
  possibleDateCheckbox: string
  orderNowButtonText: string
  installationDatePlaceholder: string
  installationDatePopupText: [RTNode]
  recieveProductsPopupText: [RTNode]
  complementAlarmText: string
  introText: [RTNode]
  datePickerText: string
  confirmationImage: {
    dimensions: {
      width: number
      height: number
    }
    alt: string
    copyright: null
    url: string
  }
  blueTopText: string
  greenTopText: string
  confirmationText: string
  deliveryAsapText: string
  instructionsText: [RTNode]
  deliveryWithDateText: string
  deliveryInstallationText: string
  goBackToDashboard: string
  basePackagePrice: number
  installationPrice: number
  installationProductName: string
  alarmServiceProductName: string
  freeTurnoutsText: string
  guardServiceName: string
  freeTurnouts: string
  successTitle: [RTNode]
  successSubtitle: string
  successFurtherInfo: string
  nextBestActionType: string
}
