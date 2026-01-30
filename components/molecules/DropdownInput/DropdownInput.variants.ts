import { cva, type VariantProps } from 'class-variance-authority'

export const dropdownWrapperVariants = cva('flex flex-col items-center justify-center relative')

export const triggerVariants = cva('cursor-pointer flex rounded-[var(--radius-input,4px)] h-10 border-[1.9px] border-[rgba(118,118,118,0.4)] transition-colors', {
  variants: {
    fullWidth: {
      true: 'w-full max-w-full',
    },
    isOpen: {
      true: 'border-2 border-primary-main',
    },
    noOutline: {
      true: 'border-0',
    },
  },
  defaultVariants: {
    fullWidth: false,
    isOpen: false,
    noOutline: false,
  },
})

export const itemVariants = cva(
  'flex flex-row items-center pl-[15px] rounded-[var(--radius-input,4px)] h-10 font-normal cursor-pointer transition-colors duration-150 ease-out hover:bg-[var(--color-inactive-light)]',
  {
    variants: {
      selected: {
        true: 'bg-primary-light',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
)

export const contentVariants = cva(
  'w-full bg-white absolute top-[50px] right-0 rounded-[4px] py-2 z-[99] shadow-[0px_5px_5px_-3px_rgb(0_0_0_/_20%),0px_8px_10px_1px_rgb(0_0_0_/_14%),0px_3px_14px_2px_rgb(0_0_0_/_12%)] animate-in fade-in-0 zoom-in-95 duration-300',
  {
    variants: {
      fullWidth: {
        true: 'min-w-40',
      },
    },
    defaultVariants: {
      fullWidth: false,
    },
  },
)

export const labelVariants = cva('absolute -top-[7.5px] left-[10px] text-[length:var(--font-size-1,12px)] text-inactive-dark bg-white font-normal flex')

export const selectedItemLabelVariants = cva('cursor-pointer flex flex-row justify-between items-center px-[10px] flex-none self-stretch flex-grow')

export type DropdownWrapperVariants = VariantProps<typeof dropdownWrapperVariants>
export type TriggerVariants = VariantProps<typeof triggerVariants>
export type ItemVariants = VariantProps<typeof itemVariants>
export type ContentVariants = VariantProps<typeof contentVariants>
export type LabelVariants = VariantProps<typeof labelVariants>
export type SelectedItemLabelVariants = VariantProps<typeof selectedItemLabelVariants>
