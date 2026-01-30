import { cva, type VariantProps } from 'class-variance-authority'

export const dropdownTriggerVariants = cva([
  // Reset button styles
  'p-0 bg-transparent cursor-pointer border-none outline-none',
])

export const dropdownContentVariants = cva([
  // Base content styles
  'w-[225px] bg-[var(--color-white-main)] rounded-[4px] py-1',
  // Shadow matching original
  'shadow-[0px_5px_5px_-3px_rgb(0_0_0_/_20%),_0px_8px_10px_1px_rgb(0_0_0_/_14%),_0px_3px_14px_2px_rgb(0_0_0_/_12%)]',
  // Animation support
  'will-change-[transform,opacity]',
  // Animation classes
  'data-[state=open]:animate-in data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
])

export const dropdownItemVariants = cva(
  [
    // Base item styles
    'py-2 pl-2 pr-0 outline-none cursor-pointer pointer-events-auto',
    'flex items-center justify-start w-[225px]',
    // SVG styles
    '[&_svg]:stroke-[1.5px]',
    // Hover styles
    'hover:transition-[background-color] hover:duration-150 hover:ease-[cubic-bezier(0.4,0,0.2,1)]',
    'hover:bg-black/[0.04]',
  ],
  {
    variants: {
      noHoverEffect: {
        true: ['hover:transition-none hover:bg-transparent hover:cursor-default'],
      },
    },
  },
)

export type DropdownTriggerVariants = VariantProps<typeof dropdownTriggerVariants>
export type DropdownContentVariants = VariantProps<typeof dropdownContentVariants>
export type DropdownItemVariants = VariantProps<typeof dropdownItemVariants>
