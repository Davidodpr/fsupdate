import { cva } from 'class-variance-authority'

export const step1ProvidersWrapperVariants = cva([
  'w-full',
  'h-full',
  'bg-[var(--color-background-default)]',
  'p-4',
  'scroll-mt-20',
  'md:px-10',
  'md:py-4',
  'md:scroll-mt-[50px]',
  'lg:px-32',
  '[&_a]:text-[var(--color-primary-main)]',
  '[&_a]:font-bold',
])

export const buttonSectionVariants = cva(['flex', 'items-end', 'justify-end', 'my-12', 'md:w-[640px]'])

export const buttonSectionStep2Variants = cva(['flex', 'items-center', 'justify-center', 'mt-8', 'mb-0', 'md:w-auto'])

export const submitButtonVariants = cva(['h-12', 'rounded-[var(--radius-button)]', 'mt-4', 'flex justify-center items-center'])

export const arrowWrapperVariants = cva(['absolute', 'left-0', 'flex', 'justify-center', 'items-center', 'md:flex', 'md:justify-center', 'md:items-center', 'md:pr-4'])

export const styledFlexVariants = cva(['[&_ul]:pl-5', '[&_ul_li]:list-disc', '[&_ul_li]:ml-0'])

export const priceWrapperVariants = cva(['flex', 'items-center', 'justify-center', 'w-full', 'mt-8', 'border-t', 'border-[#21476633]', 'pt-8'])

export const innerPriceWrapperVariants = cva(['w-[298px]', 'flex', 'flex-col', 'justify-between', 'md:w-auto'])

export const moveSummaryHeadlineVariants = cva(['italic', 'font-normal', '!text-[15px]', 'leading-[120%]', 'flex', 'items-center', 'text-[var(--color-text-main)]'], {
  variants: {
    withUnderline: {
      true: ['underline', 'decoration-[var(--color-text-main)]'],
    },
  },
})

export const summaryWrapperVariants = cva([
  'p-4',
  'max-w-full',
  'flex',
  'flex-col',
  'bg-[var(--color-white-main)]',
  'rounded-2xl',
  'relative',
  'shadow-[0px_4px_32px_0px_rgba(0,0,0,0.07)]',
  'mb-4',
  'md:p-8',
  'md:rounded-[var(--radius-border-radius-small)]',
])

export const cardWrapperVariants = cva(['w-full', 'h-full', 'md:mx-auto'])

export const bottomSectionTitleWrapperVariants = cva([
  'flex',
  'h-8',
  'items-center',
  'justify-center',
  'w-full',
  'relative',
  'mb-4',
  'text-[var(--color-text-main)]',
  '[&_svg]:text-[var(--color-text-main)]',
  'hover:cursor-pointer',
  'md:w-full',
  'md:my-4',
  'md:mb-8',
])

export const serviceWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'relative', 'w-full', 'md:px-4', 'md:overflow-hidden', 'md:w-[772px]'])

export const mainSectionWrapperVariants = cva(['flex', 'justify-center', 'h-full', 'flex-col', 'md:flex-row'])

export const buttonWrapperVariants = cva(['h-12', 'w-[200px]', '[&_svg_path]:text-[var(--color-white-main)]', '[&_svg_path]:stroke-[var(--color-white-main)]'])

export const errorMessageFrameVariants = cva(['flex', 'flex-col', 'items-center', 'px-[10px]', 'py-6', 'gap-4'], {
  variants: {
    variant: {
      fb: 'bg-[var(--color-background-default)]',
      fortum: '',
      normal: '',
    },
  },
})

export const isLoadingContainerVariants = cva(['flex', 'flex-col', 'relative', 'items-center', 'px-4', 'py-6', 'min-h-[100px]', 'h-[400px]', 'w-full', 'md:h-[220px]'])
