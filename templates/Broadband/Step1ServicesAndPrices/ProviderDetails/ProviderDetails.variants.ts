import { cva, type VariantProps } from 'class-variance-authority'

export const showMoreWrapperVariants = cva(['cursor-pointer'])

export const questionMarkWrapperVariants = cva(['text-[var(--color-question-icon-color)]', 'h-full w-full flex justify-center items-center'])

export const detailsTextSectionVariants = cva(['pb-4 w-full text-left', '[&_p]:pb-1'])

export const providerDetailsWrapperVariants = cva(['w-full h-full px-4 pt-4', '[&_ul]:p-0', '[&_li]:list-none'], {
  variants: {
    withPaddingBottom: {
      true: 'pb-4 md:pb-0',
    },
  },
})

export const priceSectionVariants = cva(['flex justify-between', '[&_p]:text-base'], {
  variants: {
    withBottomBorder: {
      true: 'border-b-2 border-dashed border-[#3879AD80]',
    },
    withHover: {
      true: 'cursor-pointer',
    },
    withNormalBorderTop: {
      true: 'border-t-2 border-solid border-[#3879AD80] pb-3 mt-2 mb-0',
    },
    withTopBorder: {
      true: 'border-t border-dashed border-[#3879AD80] pb-3 mt-2 mx-4 mb-0',
    },
    withDiscountPadding: {
      true: '[&_p]:pb-[5px]',
    },
  },
})

export const kwhPriceSectionWithDiscountVariants = cva(['flex justify-between text-[#E9391E]', '[&_p]:text-base'], {
  variants: {
    withBottomBorder: {
      true: 'border-b-2 border-dashed border-[#3879AD80]',
    },
    withHover: {
      true: 'cursor-pointer',
    },
    withNormalBorderTop: {
      true: 'border-t-2 border-solid border-[#3879AD80] pb-3 mt-2 mb-0',
    },
    withTopBorder: {
      true: 'border-t border-dashed border-[#3879AD80] pb-3 mt-2 mx-4 mb-0',
    },
    withDiscountPadding: {
      true: '[&_p]:pb-[5px]',
    },
  },
})

export const benefitsSectionWrapperVariants = cva(['w-full bg-[var(--color-electricity-details-section-bg)]'])

export const greyWrapperVariants = cva(['w-full bg-[#F2F9FF] rounded-lg mt-4 p-4', '[&_p]:text-base [&_p]:pb-2'], {
  variants: {
    withoutTopMargin: {
      true: 'mt-0',
    },
  },
})

export const whiteWrapperVariants = cva(['w-full bg-white rounded-lg text-left mt-4 pl-4 md:pl-0', '[&_p]:text-base [&_p]:pb-2'], {
  variants: {
    withoutTopMargin: {
      true: 'mt-0',
    },
  },
})

export type ShowMoreWrapperVariants = VariantProps<typeof showMoreWrapperVariants>
export type QuestionMarkWrapperVariants = VariantProps<typeof questionMarkWrapperVariants>
export type DetailsTextSectionVariants = VariantProps<typeof detailsTextSectionVariants>
export type ProviderDetailsWrapperVariants = VariantProps<typeof providerDetailsWrapperVariants>
export type PriceSectionVariants = VariantProps<typeof priceSectionVariants>
export type KwhPriceSectionWithDiscountVariants = VariantProps<typeof kwhPriceSectionWithDiscountVariants>
export type BenefitsSectionWrapperVariants = VariantProps<typeof benefitsSectionWrapperVariants>
export type GreyWrapperVariants = VariantProps<typeof greyWrapperVariants>
export type WhiteWrapperVariants = VariantProps<typeof whiteWrapperVariants>
