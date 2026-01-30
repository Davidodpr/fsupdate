import { cva, type VariantProps } from 'class-variance-authority'

export const failedWrapperVariants = cva(
  'flex flex-col items-center flex-grow-0 max-w-[95%] basis-2/3 mx-auto p-4 rounded-[var(--radius-border-radius-main,4px)] w-full h-auto bg-white sm:max-w-[629px]',
)

export const innerWrapperVariants = cva('flex flex-col items-center mt-5 text-center sm:w-[350px]')

export const subButtonWrapperVariants = cva('flex w-full justify-center text-xs flex-col my-[10px] sm:flex-row lg:flex-row md:w-[820px]')

export const subLargeButtonWrapperVariants = cva('h-12 m-[5px] min-w-[260px]')

export type FailedWrapperVariants = VariantProps<typeof failedWrapperVariants>
export type InnerWrapperVariants = VariantProps<typeof innerWrapperVariants>
export type SubButtonWrapperVariants = VariantProps<typeof subButtonWrapperVariants>
export type SubLargeButtonWrapperVariants = VariantProps<typeof subLargeButtonWrapperVariants>
