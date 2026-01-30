import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(['flex justify-center items-center', 'px-2 pl-4', 'hover:cursor-pointer', 'md:p-0'], {
  variants: {
    withoutPadding: {
      true: 'p-0',
      false: '',
    },
  },
  defaultVariants: {
    withoutPadding: false,
  },
})

export const goBackTopWrapperVariants = cva(['w-full p-2', 'flex justify-center items-center'], {
  variants: {
    variant: {
      primary: 'bg-[color:var(--color-white-main)]',
      secondaryLight: ['bg-[color:var(--color-secondary-light)]', 'text-[color:var(--color-white-main)]', 'underline'],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export const goBackToTopInnerWrapperVariants = cva(['w-full', 'md:w-[1168px] md:pl-4'])

export type ButtonVariants = VariantProps<typeof buttonVariants>
export type GoBackTopWrapperVariants = VariantProps<typeof goBackTopWrapperVariants>
