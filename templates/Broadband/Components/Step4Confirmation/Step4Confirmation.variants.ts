import { cva, type VariantProps } from 'class-variance-authority'

// MainWrapper - extends Flex with specific padding and width styles
export const mainWrapperVariants = cva([
  'flex flex-col w-full px-4 md:py-8 gap-2',
  // @md breakpoint styles
  'md:p-4 md:w-[400px]',
])

// StyledFlex - extends Flex with responsive width and centering
export const styledFlexVariants = cva([
  'flex justify-center flex-col h-content w-full mx-auto',
  // @md breakpoint styles
  'md:w-[744px]',
])

// ButtonContainer - container for the button with responsive layout
export const buttonContainerVariants = cva([
  'mb-4 h-[47.3px] w-full max-w-[282px] text-sm text-center',
  // Button styles inside the container
  '[&_button]:text-sm',
  // @sm breakpoint styles
  'sm:w-auto sm:mt-4 sm:mr-4 sm:mb-0',
  // @md breakpoint styles
  'md:mt-0',
])

export type MainWrapperVariants = VariantProps<typeof mainWrapperVariants>
export type StyledFlexVariants = VariantProps<typeof styledFlexVariants>
export type ButtonContainerVariants = VariantProps<typeof buttonContainerVariants>
