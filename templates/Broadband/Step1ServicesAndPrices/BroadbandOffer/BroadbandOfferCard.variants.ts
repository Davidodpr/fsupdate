import { cva, type VariantProps } from 'class-variance-authority'

// ShowMoreSection - clickable section with hover cursor
export const showMoreSectionVariants = cva(['flex justify-center items-center m-auto cursor-pointer'])

// AdditionalServices - container with specific paragraph styles
export const additionalServicesVariants = cva([
  // Using CSS-in-JS style targeting for nested p elements since Tailwind can't easily target them
  // The p styles will be applied directly in the component
  '',
])

// ShowMoreText - extends Text with specific colors and font styles
export const showMoreTextVariants = cva(['text-[var(--color-secondary-main-dark)] !font-bold text-[15px]', 'md:text-[16px]'])

// Speed - container with styled paragraph for speed display
export const speedVariants = cva([
  'text-left',
  // The nested p styles will be applied directly to the child Text component
])

// LargeButtonWrapper - button wrapper with height and conditional padding/font size
export const largeButtonWrapperVariants = cva('h-12', {
  variants: {
    withLessPaddingAndFontSize: {
      true: [
        // These styles target the button inside - will be applied directly
        '[&_button]:px-3 [&_button]:py-2 [&_button]:text-sm',
      ],
    },
  },
})

// PriceAndDiscountTextBold - extends Text with specific font size and weight
export const priceAndDiscountTextBoldVariants = cva(['text-[var(--font-size-5)] !font-bold'])

// DiscountPrice - extends Text with specific pricing text styles
export const discountPriceVariants = cva([
  'text-[var(--font-size-price-text)] text-[var(--color-secondary-text)]',
  'tracking-normal font-[var(--font-family-main)] !font-bolder leading-[120%]',
])

// ElectricityProviderCardWrapper - main card container
export const electricityProviderCardWrapperVariants = cva([
  'w-full min-w-full h-full flex flex-col items-center',
  'bg-[var(--color-white-main)] rounded-[var(--radius-border-radius-main)]',
  'relative shadow-[var(--shadow-regular)]',
  'md:max-w-[640px] md:p-8',
])

// PriceAndDiscountWrapper - price display container
export const priceAndDiscountWrapperVariants = cva(['flex flex-col justify-end flex-1 text-right'])

// MovingPriceBox - type indicator box with conditional styling
export const movingPriceBoxVariants = cva(['px-3 py-2 rounded-lg h-fit min-w-fit'], {
  variants: {
    isFixed: {
      true: ['bg-[#DCEFFF] text-[var(--color-secondary-main)]'],
      false: ['bg-[#FFF1E5] text-[#DB4F00]'],
    },
  },
})

// PriceAndDiscountInfoWrapper - main content area
export const priceAndDiscountInfoWrapperVariants = cva([
  'flex w-full flex-col justify-between text-left items-center',
  'p-4 flex-1 gap-4',
  'md:justify-start md:pt-4 md:pr-0 md:pb-0 md:pl-0 md:gap-[10px] md:flex-row',
])

// ElectricityProviderCardHeaderContent - header section
export const electricityProviderCardHeaderContentVariants = cva([
  'flex border-b border-[var(--color-inactive-light)] relative',
  'justify-between py-4 flex-wrap w-[90%]',
  'md:w-full md:p-0 md:border-b-0 md:items-center',
])

export type ShowMoreSectionVariants = VariantProps<typeof showMoreSectionVariants>
export type AdditionalServicesVariants = VariantProps<typeof additionalServicesVariants>
export type ShowMoreTextVariants = VariantProps<typeof showMoreTextVariants>
export type SpeedVariants = VariantProps<typeof speedVariants>
export type LargeButtonWrapperVariants = VariantProps<typeof largeButtonWrapperVariants>
export type PriceAndDiscountTextBoldVariants = VariantProps<typeof priceAndDiscountTextBoldVariants>
export type DiscountPriceVariants = VariantProps<typeof discountPriceVariants>
export type ElectricityProviderCardWrapperVariants = VariantProps<typeof electricityProviderCardWrapperVariants>
export type PriceAndDiscountWrapperVariants = VariantProps<typeof priceAndDiscountWrapperVariants>
export type MovingPriceBoxVariants = VariantProps<typeof movingPriceBoxVariants>
export type PriceAndDiscountInfoWrapperVariants = VariantProps<typeof priceAndDiscountInfoWrapperVariants>
export type ElectricityProviderCardHeaderContentVariants = VariantProps<typeof electricityProviderCardHeaderContentVariants>
