import { cva } from 'class-variance-authority'

export const autocompleteStyledVariants = cva(['w-full'])

export const wrapperVariants = cva(['mx-8 my-[100px]', 'sm:my-[100px] sm:mx-auto sm:w-full sm:max-w-[800px]', 'bg-white'])

export const listItemVariants = cva([
  'justify-between items-center py-2.5 px-0',
  'border-t border-b border-[var(--color-inactive-main)]',
  'min-h-[62px]',
  'first:border-t-0 first:pt-8',
])

export const infoVariants = cva(['bg-[var(--color-inactive-quite-light)] p-4'])
