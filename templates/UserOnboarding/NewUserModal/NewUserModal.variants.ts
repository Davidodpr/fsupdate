import { cva, type VariantProps } from 'class-variance-authority'

export const styledModalVariants = cva(['!overflow-visible'])

export const styledModalOverlayVariants = cva(['fixed bg-black/25 backdrop-blur-[16px]'])

export const styledHeaderVariants = cva(['text-[var(--color-secondary-main)] text-[length:var(--font-sizes-8)]', 'mt-5 mb-0 leading-[0.7]', 'md:text-2xl'])

export const styledHeaderBottomVariants = cva(['text-[var(--color-primary-main)] text-[length:var(--font-sizes-8)]', 'mb-0', 'md:text-2xl'])

export const buttonWrapperVariants = cva(['relative mt-5 w-full h-12'])

export const imageWrapperVariants = cva(['w-full border-b border-[var(--color-inactive-main)] mb-5', '[&_svg]:ml-[-40px]', 'sm:[&_svg]:ml-0'], {
  variants: {
    extraPadding: {
      true: 'py-[5px]',
    },
  },
})

export const termsTextVariants = cva(['text-[10px] m-0'])

export const termsTextLinkVariants = cva(['text-[10px] text-[var(--color-primary-main)] font-bold', 'hover:cursor-pointer', 'sm:pl-[3px]'])

export const termsWrapperVariants = cva(['flex-col', 'sm:flex-row'])

export type ImageWrapperVariants = VariantProps<typeof imageWrapperVariants>
