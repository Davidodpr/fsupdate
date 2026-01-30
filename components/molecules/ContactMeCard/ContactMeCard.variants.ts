import { cva } from 'class-variance-authority'

export const contactCardWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'justify-center', 'w-[calc(100%-32px)]', 'mx-auto', 'md:w-full', 'md:m-0', 'h-auto'], {
  variants: {
    usage: {
      movehelpClean: ['max-w-[583px]', 'md:max-w-[629px]', 'md:w-[629px]'],
    },
  },
})

export const contactWrapperVariants = cva([
  'flex',
  'flex-col',
  'py-4',
  'px-8',
  'items-center',
  'rounded-lg',
  'border-2',
  'border-[rgba(33,71,102,0.10)]',
  'justify-center',
  'bg-[var(--color-standard-move-section-background)]',
  'shadow-[var(--shadows-regular)]',
  'w-full',
])

export const contactFrameVariants = cva(['flex', 'flex-row', 'items-left', 'justify-left', 'w-full', 'h-auto'])

export const contactTitleVariants = cva(['h-auto', 'font-bold', 'text-[18px]', 'mb-2', 'flex', 'items-left', 'text-[var(--color-text-main)]'], {
  variants: {
    usage: {
      movehelpClean: ['w-[70%]'],
    },
  },
})

export const contactDescriptionVariants = cva(['h-auto', 'py-1', 'mb-4', 'font-normal', 'leading-[120%]', 'flex', 'items-center', 'sm:w-[48%]', 'sm:mb-0'], {
  variants: {
    usage: {
      movehelpClean: ['md:w-[55%]'],
    },
  },
})

export const contactButtonFrameVariants = cva([
  'block',
  'whitespace-nowrap',
  'flex-row',
  'items-center',
  'justify-center',
  'p-0',
  'gap-2',
  'w-full',
  'h-12',
  'flex-none',
  'order-1',
  'flex-grow-0',
  'sm:w-[45%]',
])

export const contactButtonWrapperVariants = cva(['gap-1', 'h-12', 'rounded-[22.5px]', 'flex-none', 'order-0', 'flex-grow-0'], {
  variants: {
    usage: {
      movehelpClean: ['w-full'],
    },
  },
})
