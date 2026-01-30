import { cva, type VariantProps } from 'class-variance-authority'

export const styledModalVariants = cva(['overflow-visible flex flex-col justify-center items-center p-4'])

export const inputWrapperVariants = cva(['mt-4 w-full'])

export const emailWrapperVariants = cva(['mb-6'])

export const styledModalTitleVariants = cva(['border-b border-[var(--color-inactive-main)] w-full text-left pb-4', 'text-[var(--fs-fontSizes-6)]'])

export const buttonWrapperVariants = cva(['relative mt-8 w-full h-12', '[&_button]:px-8 [&_button]:py-2'])

export const imageWrapperVariants = cva(['w-full border-b border-[var(--color-inactive-main)] mb-5', '[&_svg]:ml-[-40px] sm:[&_svg]:ml-0'], {
  variants: {
    extraPadding: {
      true: 'py-1.25',
      false: '',
    },
  },
  defaultVariants: {
    extraPadding: false,
  },
})

export const termsTextVariants = cva(['text-[10px] m-0'])

export const termsTextLinkVariants = cva(['text-[10px] text-[var(--color-primary-main)] font-[var(--fontWeights-bold)]', 'hover:cursor-pointer', 'sm:pl-0.75'])

export const termsWrapperVariants = cva(['flex-col', 'sm:flex-row'])

export type ImageWrapperVariants = VariantProps<typeof imageWrapperVariants>
