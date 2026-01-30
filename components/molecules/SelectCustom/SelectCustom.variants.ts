import { cva } from 'class-variance-authority'

export const selectCustomVariants = () => ({
  inputWrapper: cva(['w-full', 'max-w-full', 'relative', 'box-border', 'h-full']),

  label: cva(['absolute', 'left-3', '-top-2.5', 'bg-white', 'px-1', 'text-xs', 'font-normal', 'text-gray-500', 'pointer-events-none', 'transition-all', 'duration-200']),

  labelWrapper: cva(['bg-white', 'absolute', 'top-[-9px]', 'left-[115px]', 'cursor-pointer']),

  selectTrigger: cva(
    [
      'w-full',
      'inline-flex',
      'items-center',
      'max-h-10',
      'justify-between',
      'py-[14px]',
      'px-[10px]',
      'text-[15px]',
      'leading-none',
      'font-normal',
      'bg-white',
      'text-[var(--color-text-main)]',
      'rounded-sm',
      'border',
      'border-[#CBCBCB]',
      'text-left',
      'outline-none',
      'font-[var(--font-main)]',
      'cursor-pointer',

      // Placeholder styling
      '[&_[data-placeholder]]:!text-[13px]',
      '[&_[data-placeholder]]:!text-gray-400',

      // Open state with chevron rotation
      'data-[state=open]:[&_svg]:rotate-180',
    ],
    {
      variants: {
        isFb: {
          true: ['border-none', 'border-b-2', 'border-b-[#EFB7B6]', 'rounded-none'],
        },
      },
    },
  ),

  selectIcon: cva(['text-black/[0.23]']),

  chevronIcon: cva(['text-[var(--color-text-main)]', 'transition-transform', 'duration-200']),

  selectContent: cva(['overflow-hidden', 'bg-white', 'rounded-md', 'shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)]', 'z-[99]']),

  selectViewport: cva(['py-2']),

  item: cva([
    'font-[var(--font-main)]',
    'leading-none',
    'text-black/[0.87]',
    'flex',
    'items-center',
    'relative',
    'select-none',
    'text-[15px]',
    'py-[14px]',
    'px-[10px]',
    'h-auto',
    'cursor-pointer',

    // Highlighted state
    'data-[highlighted]:outline-none',
    'data-[highlighted]:bg-[var(--color-tertiary-light)]',
  ]),
})
