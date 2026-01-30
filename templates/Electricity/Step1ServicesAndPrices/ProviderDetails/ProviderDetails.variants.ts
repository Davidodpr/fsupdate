import { cva } from 'class-variance-authority'

export const providerInfoBulletsVariants = cva(['m-0', '[&_li]:pb-2', '[&_li]:flex', '[&_li]:text-left', '[&_li]:gap-2', '[&_li_svg]:min-w-[17px]', '[&_li:last-child]:pb-0'])

export const questionMarkWrapperVariants = cva(['text-[var(--color-question-icon-color)]', 'h-full', 'w-full', 'flex', 'justify-center', 'items-center'])

export const providerHeaderAndTextVariants = cva(['flex', 'flex-col', 'text-left', 'md:py-4 md:px-0 md:pl-4'])

export const boldTextVariants = cva(['!text-base', '!font-bold'])

export const boldDiscountTextVariants = cva(['!text-base', '!font-bold', 'text-[var(--color-primary-main)]'])

export const detailsTextSectionVariants = cva(['pb-4', 'w-full', 'text-left', '[&_p]:pb-0', '[&_p]:!text-base'])

export const providerHeaderAndBenefitsWrapperVariants = cva(['flex', 'justify-between', 'flex-col', 'md:flex-row'])

export const providerDetailsWrapperVariants = cva(['w-full', 'h-full', 'min-h-[500px]', 'p-4', '[&_ul]:p-0', '[&_li]:list-none'])

export const kwhPriceSectionVariants = cva(['flex', 'justify-between', '[&_p]:text-base'], {
  variants: {
    withBottomBorder: {
      true: 'border-b-2 border-dashed border-[#3879AD80]',
    },
    withDiscountPadding: {
      true: '[&_p]:pb-[5px]',
    },
  },
})

export const kwhPriceSectionWithDiscountVariants = cva(['flex', 'justify-between', '[&_p]:text-base', 'text-[#E9391E]'])

export const monthlyPriceSectionVariants = cva([
  'flex',
  'justify-between',
  'border-b-2 border-solid border-[#3879AD80]',
  'border-t-2 border-solid border-[#3879AD80]',
  'flex-col',
  'py-4',
  'my-4',
])

export const benefitsSectionWrapperVariants = cva(['w-full', 'bg-[var(--color-electricity-details-section-bg)]', 'p-4'])

export const topBenefitsSectionWrapperVariants = cva(['w-full', 'bg-[var(--color-electricity-details-section-bg)]', 'p-4', 'rounded-lg'])

export const greyWrapperVariants = cva(['bg-[#F2F9FF]', 'rounded-lg', 'p-4', '[&_p]:text-base', '[&_p]:pb-2', 'w-full'], {
  variants: {
    withoutTopMargin: {
      true: 'mt-0',
      false: 'mt-4',
    },
  },
})

export const whiteWrapperVariants = cva(['bg-white', 'rounded-lg', 'text-left', 'p-4', '[&_p]:!text-base', '[&_p]:pb-2'], {
  variants: {
    withoutTopMargin: {
      true: 'mt-0',
      false: 'mt-4',
    },
  },
})

export const providerHeaderVariants = cva(['pb-2'])
