import { cva } from 'class-variance-authority'

export const styledFlexContainerVariants = cva([
  'w-full border-t border-[var(--color-inactive-main)]',
  'h-max pt-4',
  'md:w-[311px] md:pt-0 md:pl-8',
  'md:border-l md:border-l-[var(--color-inactive-main)] md:border-t-0',
])

export const styledNoSupplierContainerVariants = cva([
  'w-full border-t border-[var(--color-inactive-main)]',
  'h-max pt-4',
  'md:w-[311px] md:pt-4 md:pb-4 md:pl-8',
  'md:border-l md:border-l-[var(--color-inactive-main)] md:border-t-0',
])

export const styledLinkVariants = cva(['!text-[var(--color-primary-main)] cursor-pointer !font-bold'])

export const contactTextPartVariants = cva(['text-[var(--color-primary-main)] pl-1'])

export const autocompleteStyledVariants = cva(['w-full py-4 px-0', 'md:pt-4 md:pb-8'])
