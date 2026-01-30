import { cva } from 'class-variance-authority'

export const step1ProvidersWrapperVariants = cva([
  'w-full',
  'h-full',
  'md:p-4 p-3',
  'md:px-10',
  'md:py-4',
  'lg:px-[10%]',
  'lg:py-4',
  '[&_a]:text-[var(--color-primary-main)]',
  '[&_a]:font-bold',
])

export const customModalWrapperVariants = cva([
  'border-b',
  'border-[#fdf6ee]',
  'pb-4',
  'flex',
  'flex-row',
  'justify-between',
  'items-center',
  '[&_h3]:mb-0',
  '[&_h3]:font-[var(--font-family-main)]',
  '[&_h3]:text-[var(--color-text-main)]',
  '[&_svg]:cursor-pointer',
])

export const loadingCardVariants = cva(['w-full', 'mt-[50px]', 'h-[500px]', 'rounded-[var(--radius-small)]'])

export const filterButtonVariants = cva(['flex', 'pt-4', 'hover:cursor-pointer'])

export const modalTextVariants = cva(['text-[var(--color-text-main)]'])

export const imageWrapperVariants = cva(['h-full', 'w-[50px]', 'relative', 'mx-1.5'])

export const noProvidersWrapperVariants = cva(['flex', 'py-12', 'px-8', 'pb-16'], {
  variants: {
    isTooBig: {
      true: ['mx-auto', 'max-w-[520px]'],
    },
  },
})

export const sortByFilterVariants = cva([
  'bg-[var(--color-background-default)]',
  'text-xl',
  'w-fit',
  '[&_button]:pl-[15px]',
  '[&_button]:pr-0',
  '[&_button]:py-4',
  'md:[&_button]:px-[14px]',
  'md:[&_button]:py-4',
])

export const popularTextWrapperVariants = cva(['mx-4', 'rounded-2xl', 'p-4', 'border', 'border-[rgba(33,71,102,0.20)]', 'md:mx-8', 'md:py-4', 'md:px-6'])

export const bottomSectionTitleWrapperVariants = cva([
  'text-center',
  'md:pb-4',
  'flex',
  'w-full',
  'justify-between',
  'md:w-full',
  'md:min-w-[744px]',
  'md:text-left',
  'md:justify-between',
])

export const buttonSectionVariants = cva(['flex', 'items-end', 'justify-end', 'md:w-[640px]'])

export const addProductTextVariants = cva(['text-[20px]', 'max-w-full'])

export const buttonWrapperVariants = cva(['h-12', 'w-[200px]', '[&_svg]:mt-0.5', '[&_svg_path]:text-white', '[&_svg_path]:stroke-white'], {
  variants: {
    isDisabled: {
      true: ['[&_svg]:mt-0.5', '[&_svg_path]:text-[var(--color-disabled-button-color)]', '[&_svg_path]:stroke-[var(--color-disabled-button-color)]'],
    },
  },
})

export const serviceWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'relative', 'gap-4', 'w-full', 'md:w-fit', 'md:items-start', 'md:max-w-[744px]'])

export const mainSectionWrapperVariants = cva(['flex', 'justify-center', 'h-full'])
