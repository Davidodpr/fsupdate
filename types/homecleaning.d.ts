declare type HomecleaningData = {
  AddressPlaceholder: string
  addressHeader: string
  headerContent: [RTNode]
  headerImage: {
    dimensions: {
      width: number
      height: number
    }
    alt: string
    copyright: null
    url: string
  }
  confirmationImage: {
    dimensions: {
      width: number
      height: number
    }
    alt: string
    copyright: null
    url: string
  }
  headerTitleBlue: string
  headerTitleGreen: string
  uspsWithCheckmarkSlices: { items: UspPoint[]; primary: Record; slice_label: null; slice_type: string; variation: string; version: string }[]
  radioButtonSlices: { items: RadioItem[]; primary: Record; slice_label: null; slice_type: string; variation: string; version: string }[]
  faqSlices: { items: AccordionItem[]; primary: Record; slice_label: null; slice_type: string; variation: string; version: string }[]
  monthPricingSlices: { items: PriceItem[]; primary: Record; slice_label: null; slice_type: string; variation: string; version: string }[]
  occasionPricingSlices: { items: PriceItem[]; primary: Record; slice_label: null; slice_type: string; variation: string; version: string }[]
  sqmImage: {
    dimensions: {
      width: number
      height: number
    }
    alt: string
    copyright: null
    url: string
  }
  sqmPlaceholder: string
  sqmTooltip: [RTNode]
  datePlaceholder: string
  emailPlaceholder: string
  instructionsPlaceholder: string
  phonenumberPlaceholder: string
  personalnumberPlaceholder: string
  namePlaceholder: string
  confirmationText: string
  blueTopText: string
  greenTopText: string
  buttonText: string
  confirmationStartText: string
  bigResidenceTitle: string
  bigResidenceText: [RTNode]
  bigResidenceIcon: {
    dimensions: {
      width: number
      height: number
    }
    alt: string
    copyright: null
    url: string
  }
  bigResidenceCallUsText: string
  bigResidenceChatText: string
  datePickerButtonText: string
  bookButtonText: string
  moneyPerMonth: string
  moneyPerOccasion: string
  extraInstructionsPlaceholder: [RTNode]
  flyttsmartPhone: string
  phoneIcon: {
    dimensions: {
      width: number
      height: number
    }
    alt: string
    copyright: null
    url: string
  }
  successTitle: [RTNode]
  successSubtitle: string
  successFurtherInfo: string
  nextBestActionType: string
}
