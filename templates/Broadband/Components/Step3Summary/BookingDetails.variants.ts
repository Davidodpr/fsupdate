import { cva, type VariantProps } from 'class-variance-authority'

// InputSectionWrapper with isOpen variant
export const inputSectionWrapperVariants = cva(['w-full', 'h-full', 'relative'], {
  variants: {
    isOpen: {
      true: 'max-w-[400px]',
      false: 'max-w-full',
    },
  },
})

// SelectFlatWrapper
export const selectFlatWrapperVariants = cva(['w-full', 'mb-4', 'mt-2'])

// SelectFlatInputWrapper
export const selectFlatInputWrapperVariants = cva(['w-full', 'mb-4', 'md:w-[200px]', 'md:mb-0', 'md:mr-4'])

// PenWrapper
export const penWrapperVariants = cva(['absolute', 'right-0', 'top-0', 'text-[var(--color-primary-main)]', 'hover:cursor-pointer'])

// ButtonWrapper
export const buttonWrapperVariants = cva(['w-full', 'h-12', 'mt-2.5', 'mr-auto', 'md:w-[200px]'])

// InputWrapper with error variant
export const inputWrapperVariants = cva(['mb-4', 'sm:w-1/2'], {
  variants: {
    error: {
      true: 'mb-[25px]',
    },
  },
})

// CardTitle with leftJustify variant
export const cardTitleVariants = cva(['flex', 'flex-row', 'items-center', 'font-bold', 'leading-[25px]', 'text-left', 'justify-start', 'text-[var(--color-text-main)]', 'pb-4'], {
  variants: {
    leftJustify: {
      true: ['justify-start', 'mt-4'],
    },
  },
})

// CardTitleText with leftMargined variant
export const cardTitleTextVariants = cva(
  [
    'h-[18px]',
    'font-normal',
    '!font-bold',
    '!text-xl',
    'leading-[18px]',
    'flex',
    'items-center',
    'text-center',
    'text-[var(--color-text-main)]',
    'flex-none',
    'order-0',
    'flex-grow-0',
    'm-0',
  ],
  {
    variants: {
      leftMargined: {
        true: ['ml-0.5', 'text-base'],
      },
    },
    compoundVariants: [
      {
        leftMargined: true,
        class: 'text-base',
      },
    ],
  },
)

// TextSection with noPadding variant
export const textSectionVariants = cva(['pb-4', 'flex', 'flex-col', 'items-start'], {
  variants: {
    noPadding: {
      true: 'pb-0',
    },
  },
})

// EmailAndPhoneSection with noPadding variant (same as TextSection)
export const emailAndPhoneSectionVariants = cva(['flex', 'flex-col', 'items-start'], {
  variants: {
    noPadding: {
      true: 'pb-0',
    },
  },
})

// BoldText (extends Text)
export const boldTextVariants = cva(['!text-[length:var(--font-size-5)]', '!font-bold', 'pb-1'])

// LargerText (extends Text)
export const largerTextVariants = cva(['!text-[length:var(--font-size-5)]', 'pb-1'])

// Export types for TypeScript
export type InputSectionWrapperVariants = VariantProps<typeof inputSectionWrapperVariants>
export type SelectFlatWrapperVariants = VariantProps<typeof selectFlatWrapperVariants>
export type SelectFlatInputWrapperVariants = VariantProps<typeof selectFlatInputWrapperVariants>
export type PenWrapperVariants = VariantProps<typeof penWrapperVariants>
export type ButtonWrapperVariants = VariantProps<typeof buttonWrapperVariants>
export type InputWrapperVariants = VariantProps<typeof inputWrapperVariants>
export type CardTitleVariants = VariantProps<typeof cardTitleVariants>
export type CardTitleTextVariants = VariantProps<typeof cardTitleTextVariants>
export type TextSectionVariants = VariantProps<typeof textSectionVariants>
export type EmailAndPhoneSectionVariants = VariantProps<typeof emailAndPhoneSectionVariants>
export type BoldTextVariants = VariantProps<typeof boldTextVariants>
export type LargerTextVariants = VariantProps<typeof largerTextVariants>
