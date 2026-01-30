import { cva, type VariantProps } from 'class-variance-authority'

export const step1ProvidersWrapperVariants = cva([
  'w-full',
  'h-full',
  'p-4',
  'md:py-4',
  'md:px-10',
  'lg:py-4',
  'lg:px-[10%]',
  '[&_a]:text-[var(--color-primary-main)]',
  '[&_a]:font-[var(--font-weight-bold)]',
])

export const imageWrapperVariants = cva(['h-full', 'w-[50px]', 'relative', 'mx-1.5', 'my-0'])

export const bottomSectionTitleWrapperVariants = cva(['text-center', 'py-4', 'px-0', 'md:w-full'])

export const noProvidersWrapperVariants = cva(['pt-12', 'pb-16', 'px-8'])

export const buttonSectionVariants = cva(['flex', 'items-end', 'justify-end', 'md:w-[640px]'])

export const addProductTextVariants = cva(['text-[var(--font-size-5)]', 'max-w-full'])

export const buttonWrapperVariants = cva(['h-12', 'w-[200px]', '[&_svg]:mt-0.5', '[&_svg_path]:text-[var(--color-white-main)]', '[&_svg_path]:stroke-[var(--color-white-main)]'], {
  variants: {
    isDisabled: {
      true: ['[&_svg]:mt-0.5', '[&_svg_path]:text-[var(--color-disabled-button-color)]', '[&_svg_path]:stroke-[var(--color-disabled-button-color)]'],
    },
  },
})

export const serviceWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'relative', 'gap-4', 'w-full', 'md:items-end', 'md:w-fit'])

export const mainSectionWrapperVariants = cva(['flex', 'justify-center', 'h-full'])

export const textWrapperVariants = cva(
  [
    'h-auto',
    'font-normal',
    'font-normal',
    'text-[var(--font-size-4)]',
    'leading-[120%]',
    'flex',
    'items-left',
    'text-[var(--color-text-main)]',
    '[&_a]:text-[var(--color-primary-main)]',
    '[&_a]:no-underline',
    '[&_a]:font-[var(--font-weight-bold)]',
  ],
  {
    variants: {
      paddingOn: {
        true: ['py-[5px]', 'px-0'],
      },
      italicText: {
        true: ['py-[5px]', 'px-0', 'italic'],
      },
    },
  },
)

export const bottomSectionWrapperVariants = cva(['pt-[7px]', 'pb-0', 'pl-[25px]', 'pr-0'])

export const styledFlexVariants = cva(['[&_ul]:pl-5', '[&_ul_li]:list-disc', '[&_ul_li]:ml-0'])

export const textSectionWrapperVariants = cva(['p-4', 'w-full', 'h-full', 'md:py-4', 'md:pr-4', 'md:pb-4', 'md:pl-8'])

export const textTopWrapperVariants = cva(['flex', 'items-center', 'justify-between'])

export const errorMessageFrameVariants = cva(['flex', 'flex-col', 'items-center', 'p-4', 'gap-4', 'md:py-8', 'md:px-2.5'], {
  variants: {
    variant: {
      fb: ['bg-[var(--color-background-default)]'],
      fortum: [],
      normal: [],
    },
  },
})

export const isLoadingContainerVariants = cva(['flex', 'flex-col', 'relative', 'items-center', 'py-6', 'px-4', 'min-h-[100px]', 'h-[400px]', 'w-full', 'md:h-[220px]'])

export const serviceVariants = cva(
  [
    'flex',
    'items-start',
    'flex-col',
    'rounded-[var(--radius-border-radius-small)]',
    'relative',
    'bg-[var(--color-white-main)]',
    'w-full',
    'shadow-[var(--shadow-regular)]',
    'md:max-w-[640px]',
    'md:max-h-[152px]',
    'md:flex-row',
  ],
  {
    variants: {
      checked: {
        true: ['outline', 'outline-2', 'outline-[var(--color-primary-main)]'],
      },
    },
  },
)

export const serviceSmallVariants = cva(
  [
    'flex',
    'items-start',
    'flex-col',
    'rounded-[var(--radius-border-radius-small)]',
    'relative',
    'bg-[var(--color-white-main)]',
    'w-full',
    'shadow-[var(--shadow-regular)]',
    'h-[200px]',
    'md:max-w-[640px]',
    'md:max-h-[152px]',
    'md:flex-row',
    'md:h-[98px]',
  ],
  {
    variants: {
      checked: {
        true: ['outline', 'outline-2', 'outline-[var(--color-primary-main)]'],
      },
    },
  },
)

export const serviceImageVariants = cva(['relative', 'rounded-lg', 'w-full', 'min-h-[96px]', 'flex', 'justify-center', 'md:w-[180px]', 'md:min-w-[180px]', 'md:h-full'])

export const imageCheckedOverlayVariants = cva(
  [
    'absolute',
    'top-0',
    'left-0',
    'bottom-0',
    'right-0',
    'bg-[rgba(81,200,180,0.30)]',
    'flex',
    'justify-center',
    'items-center',
    'rounded-tl-lg',
    'rounded-tr-lg',
    'md:rounded-tl-lg',
    'md:rounded-bl-lg',
    'md:rounded-tr-none',
    'md:rounded-br-none',
  ],
  {
    variants: {
      isFb: {
        true: ['bg-[rgba(255,95,0,0.30)]'],
      },
    },
  },
)

export type Step1ProvidersWrapperVariants = VariantProps<typeof step1ProvidersWrapperVariants>
export type ImageWrapperVariants = VariantProps<typeof imageWrapperVariants>
export type BottomSectionTitleWrapperVariants = VariantProps<typeof bottomSectionTitleWrapperVariants>
export type NoProvidersWrapperVariants = VariantProps<typeof noProvidersWrapperVariants>
export type ButtonSectionVariants = VariantProps<typeof buttonSectionVariants>
export type AddProductTextVariants = VariantProps<typeof addProductTextVariants>
export type ButtonWrapperVariants = VariantProps<typeof buttonWrapperVariants>
export type ServiceWrapperVariants = VariantProps<typeof serviceWrapperVariants>
export type MainSectionWrapperVariants = VariantProps<typeof mainSectionWrapperVariants>
export type TextWrapperVariants = VariantProps<typeof textWrapperVariants>
export type BottomSectionWrapperVariants = VariantProps<typeof bottomSectionWrapperVariants>
export type StyledFlexVariants = VariantProps<typeof styledFlexVariants>
export type TextSectionWrapperVariants = VariantProps<typeof textSectionWrapperVariants>
export type TextTopWrapperVariants = VariantProps<typeof textTopWrapperVariants>
export type ErrorMessageFrameVariants = VariantProps<typeof errorMessageFrameVariants>
export type IsLoadingContainerVariants = VariantProps<typeof isLoadingContainerVariants>
export type ServiceVariants = VariantProps<typeof serviceVariants>
export type ServiceSmallVariants = VariantProps<typeof serviceSmallVariants>
export type ServiceImageVariants = VariantProps<typeof serviceImageVariants>
export type ImageCheckedOverlayVariants = VariantProps<typeof imageCheckedOverlayVariants>
