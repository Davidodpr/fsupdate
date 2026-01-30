import { cva } from 'class-variance-authority'

export const textTemplateWrapperVariants = cva(['h-full', 'w-full'])

export const textWrapperVariants = cva(
  [
    'h-auto',
    'font-normal',
    'text-base',
    'leading-[120%]',
    'flex',
    'items-start',
    'text-[var(--color-text-main)]',
    'flex-none',
    'z-[10000]',
    'text-[15px]',
    '[&_a]:!text-[var(--color-primary-main)]',
    '[&_a]:no-underline',
    '[&_a]:!font-bold',
    'max-w-[400px]',
  ],
  {
    variants: {
      paddingOn: {
        true: ['py-[5px]'],
      },
      italicText: {
        true: ['py-[5px]', 'italic'],
      },
    },
  },
)

export const linkWrapperVariants = cva(['p-0'])

export const bulletTextListVariants = cva(['flex', 'flex-col', 'flex-wrap', 'text-black', 'list-disc', 'ml-10', 'my-4'])

export const bulletTextListItemVariants = cva(['p-0'])
