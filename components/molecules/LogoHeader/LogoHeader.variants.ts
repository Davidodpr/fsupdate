import { cva } from 'class-variance-authority'

export const headerContainerVariants = cva(['text-center', 'my-8 mb-4'])

export const logoWrapperVariants = cva(['flex flex-col items-center justify-center', 'gap-2 mb-5', 'md:flex-row md:items-start md:gap-2.5 md:mb-8'])

export const logoImageVariants = cva(['w-auto max-w-40 object-contain', 'md:max-w-50'], {
  variants: {
    type: {
      primary: ['md:relative md:top-0'],
      secondary: ['max-w-30 relative', 'md:max-w-37.5 md:top-1.5'],
    },
  },
})

export const logoSeparatorVariants = cva([
  'text-lg font-extralight text-[#999]',
  'leading-none',
  'font-[system-ui,-apple-system,sans-serif]',
  'block',
  'md:inline-block md:text-[22px] md:relative md:top-[11px]',
])

export const dividerLineVariants = cva(['w-full max-w-[600px] h-px', 'bg-[#E8E8E8]', 'my-4 mx-auto'])
