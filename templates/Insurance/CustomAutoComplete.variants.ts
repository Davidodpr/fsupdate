import { cva } from 'class-variance-authority'

export const wrapperVariants = cva(['relative'])

export const menuVariants = cva([
  'list-none shadow-[0px_8px_16px_rgba(0,0,0,0.08)] rounded-lg',
  'p-0 m-[1px_0] z-[5000] bg-white absolute w-full',
  'rounded-b-[var(--radius-border-radius-main)]',
])

export const itemVariants = cva(
  [
    'px-4 py-2',
    'cursor-pointer',
    'hover:bg-[var(--color-primary-main)] hover:text-white',
    'active:bg-[var(--color-primary-main)] active:text-white',
    'transition-colors duration-150',
    'text-gray-900',
    'border-b border-gray-100 last:border-b-0',
    'last:rounded-b-[var(--radius-border-radius-main)]',
  ],
  {
    variants: {
      highlighted: {
        true: 'bg-[var(--color-primary-main)] text-white',
      },
    },
  },
)
