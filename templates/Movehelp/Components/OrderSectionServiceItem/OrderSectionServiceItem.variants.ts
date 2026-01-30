import { cva, type VariantProps } from 'class-variance-authority'

export const itemVariants = cva(
  [
    'flex',
    'items-start',
    'flex-col',
    'rounded-[var(--border-radius-small)]',
    'relative',
    'bg-white',
    'w-full',
    'p-4',
    'shadow-[var(--shadow-regular)]',
    'mb-4',
    'md:max-w-[640px]',
    'md:p-8',
  ],
  {
    variants: {
      noMarginBottom: {
        true: 'mb-0',
      },
    },
    defaultVariants: {
      noMarginBottom: false,
    },
  },
)

export const buttonWrapperVariants = cva(['w-full', 'h-12', 'mt-[10px]', 'ml-auto', 'md:w-[200px]'])

export const penWrapperVariants = cva(['absolute', 'right-0', 'top-4', 'text-[var(--color-primary-main)]', 'hover:cursor-pointer'])

export const textWrapperVariants = cva(
  [
    'h-auto',
    'font-normal',
    'text-[var(--font-size-4)]',
    'leading-[120%]',
    'flex',
    'items-left',
    'text-[var(--color-text-main)]',
    '[&_a]:text-[var(--color-primary-main)]',
    '[&_a]:no-underline',
    '[&_a]:font-bold',
  ],
  {
    variants: {
      paddingOn: {
        true: 'py-[5px]',
      },
      italicText: {
        true: 'py-[5px] italic',
      },
    },
    defaultVariants: {
      paddingOn: false,
      italicText: false,
    },
  },
)

export const topSectionVariants = cva(['flex', 'border-b', 'border-b-[var(--color-border)]', 'w-full', 'justify-between', 'md:pb-4'], {
  variants: {
    paddingBottom: {
      true: 'pb-4',
    },
  },
  defaultVariants: {
    paddingBottom: false,
  },
})

export const textSectionWrapperVariants = cva(['flex', 'flex-col', 'pt-4', 'relative', 'w-full'])

export const textSectionVariants = cva(['pb-4', 'flex', 'flex-col', 'items-start'], {
  variants: {
    noPadding: {
      true: 'pb-0',
    },
  },
  defaultVariants: {
    noPadding: false,
  },
})

export const alwaysIncludedTextSectionVariants = cva(['pb-4', 'flex', 'flex-col', 'items-start', 'flex-row', 'items-center'])

export const boldTextVariants = cva(['text-[var(--font-size-5)]', 'font-bold'])

export const largerTextVariants = cva(['text-[var(--font-size-5)]'])

export type ItemVariants = VariantProps<typeof itemVariants>
export type ButtonWrapperVariants = VariantProps<typeof buttonWrapperVariants>
export type PenWrapperVariants = VariantProps<typeof penWrapperVariants>
export type TextWrapperVariants = VariantProps<typeof textWrapperVariants>
export type TopSectionVariants = VariantProps<typeof topSectionVariants>
export type TextSectionWrapperVariants = VariantProps<typeof textSectionWrapperVariants>
export type TextSectionVariants = VariantProps<typeof textSectionVariants>
export type AlwaysIncludedTextSectionVariants = VariantProps<typeof alwaysIncludedTextSectionVariants>
export type BoldTextVariants = VariantProps<typeof boldTextVariants>
export type LargerTextVariants = VariantProps<typeof largerTextVariants>
