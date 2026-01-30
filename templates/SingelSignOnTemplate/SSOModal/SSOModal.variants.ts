import { cva, type VariantProps } from 'class-variance-authority'

export const styledModalVariants = cva(
  [
    'absolute bottom-0 max-w-[100vw] top-auto left-0 right-0',
    'transform-none w-screen',
    'rounded-t-[32px] bg-white z-[3000000000]',
    'transition-[height] duration-200',
    'p-[32px_24px] min-h-[379px]',
    'shadow-[rgba(14,18,22,0.35)_0px_10px_38px_-10px,rgba(14,18,22,0.2)_0px_10px_20px_-15px]',
    'h-px',
    'md:max-w-[528px] md:relative md:rounded-[var(--radius-main)]',
    'md:h-auto md:overflow-visible',
  ],
  {
    variants: {
      fullHeight: {
        true: 'h-[90vh] transition-[height] duration-200',
      },
    },
  },
)

export const styledModalOverlayVariants = cva(['fixed bg-black/25 backdrop-blur-[16px]'])

export const styledHeaderVariants = cva(['text-[var(--color-secondary-main)] text-[length:var(--font-sizes-8)]', 'mt-4 mb-0 leading-[0.7]', 'md:text-2xl md:mt-6'])

export const styledHeaderBottomVariants = cva(['text-[var(--color-primary-main)] text-[length:var(--font-sizes-8)]', 'mb-0', 'md:text-2xl'])

export const buttonWrapperVariants = cva(['relative mt-4 w-full h-12'])

export const imageWrapperVariants = cva(['w-full border-b border-[var(--color-inactive-main)] mb-5', '[&_svg]:ml-[-40px]', 'sm:[&_svg]:ml-0'])

export const termsTextVariants = cva(['!text-[10px] m-0'])

export const termsTextLinkVariants = cva(['text-[10px] !text-[var(--color-primary-main)] !font-bold', 'hover:cursor-pointer', 'sm:pl-[3px]'])

export const termsWrapperVariants = cva(['flex-col', 'sm:flex-row'])

export type StyledModalVariants = VariantProps<typeof styledModalVariants>
