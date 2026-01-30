import { cva, type VariantProps } from 'class-variance-authority'

export const step3SummaryWrapperVariants = cva([
  'w-full h-full px-4 pb-[50px]',
  'md:max-w-[744px] md:mx-auto md:p-0',
  // Hover styles for bold elements
  '[&_b]:hover:cursor-pointer',
])

export const infoAboutOrderBoxWrapperVariants = cva(['w-full max-w-[360px] flex flex-col justify-end items-center my-4'])

export const infoAboutOrderBoxVariants = cva([
  'rounded-[var(--radius-border-radius-small)] bg-[rgb(236,249,247)]',
  'flex items-center p-2 pl-2.5 my-2.5 w-full text-left',
  'md:my-0',
])

export const priceAndDiscountTextVariants = cva(['text-[length:var(--font-size-5)] font-[var(--font-weight-normal)]'])

export const priceAndDiscountTextBoldVariants = cva(['!font-bold'])

export const movingPriceBoxVariants = cva(['px-3 py-2 rounded-lg h-fit !font-bold min-w-fit'], {
  variants: {
    isFixed: {
      true: 'bg-[#DCEFFF] text-[var(--color-secondary-main)] !font-bold',
      false: 'bg-[#FFF1E5] text-[#DB4F00] !font-bold',
    },
  },
})

export const bottomSectionTitleWrapperVariants = cva([
  'flex items-center justify-center w-full relative',
  'text-[var(--color-text-main)]',
  '[&_svg]:text-[var(--color-text-main)]',
  'hover:cursor-pointer',
  'md:w-full md:my-4 md:h-8',
])

export const arrowWrapperVariants = cva(['absolute left-0 flex justify-center items-center', 'md:flex md:justify-center md:items-center md:pr-4'])

export const questionIconWrapperVariants = cva(['w-5 h-5 mr-[3px]', 'hover:cursor-pointer'])

// For backwards compatibility - this was originally exported from the main component
export const QuestionIconWrapper = 'w-5 h-5 mr-[3px] hover:cursor-pointer'

export const largeButtonWrapperVariants = cva(['w-[248px] h-12 mt-[22px]', 'md:p-0 md:w-[248px] md:min-w-[248px]'])

export const buttonsWrapperVariants = cva(['md:p-0'])

export const headerWrapperVariants = cva([
  'flex border-b border-[var(--color-background-default)] relative',
  'items-center justify-between pb-4 px-0 flex-wrap',
  'md:w-full md:p-0 md:pb-4 md:border-b md:border-[#21476633]',
  'md:text-[32px]',
  'md:[&>p]:text-[32px] md:[&>p]:font-bold',
])

export const mainWrapperVariants = cva(['px-4 py-8 flex flex-col border-b border-[#21476633]', 'md:px-4 md:py-8'])

export const innerWrapperVariants = cva([
  'p-4 w-[822px] max-w-full mx-auto flex flex-col',
  'bg-[var(--color-white-main)] rounded-[var(--radius-border-radius-main)]',
  'relative shadow-[var(--shadow-regular)]',
  'md:p-8 md:mt-4 md:mx-auto',
  // Link styles
  '[&_a]:text-[var(--color-tertiary-text)] [&_a]:font-bold',
])

// Export type for TypeScript
export type Step3SummaryWrapperVariants = VariantProps<typeof step3SummaryWrapperVariants>
export type InfoAboutOrderBoxWrapperVariants = VariantProps<typeof infoAboutOrderBoxWrapperVariants>
export type InfoAboutOrderBoxVariants = VariantProps<typeof infoAboutOrderBoxVariants>
export type PriceAndDiscountTextVariants = VariantProps<typeof priceAndDiscountTextVariants>
export type PriceAndDiscountTextBoldVariants = VariantProps<typeof priceAndDiscountTextBoldVariants>
export type MovingPriceBoxVariants = VariantProps<typeof movingPriceBoxVariants>
export type BottomSectionTitleWrapperVariants = VariantProps<typeof bottomSectionTitleWrapperVariants>
export type ArrowWrapperVariants = VariantProps<typeof arrowWrapperVariants>
export type QuestionIconWrapperVariants = VariantProps<typeof questionIconWrapperVariants>
export type LargeButtonWrapperVariants = VariantProps<typeof largeButtonWrapperVariants>
export type ButtonsWrapperVariants = VariantProps<typeof buttonsWrapperVariants>
export type HeaderWrapperVariants = VariantProps<typeof headerWrapperVariants>
export type MainWrapperVariants = VariantProps<typeof mainWrapperVariants>
export type InnerWrapperVariants = VariantProps<typeof innerWrapperVariants>
