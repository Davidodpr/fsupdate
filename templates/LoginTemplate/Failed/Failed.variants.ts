import { cva } from 'class-variance-authority'

export const failedWrapperVariants = cva([
  'flex-grow-0 max-w-[90%] basis-2/3 mx-auto',
  'rounded-[var(--radius-main)] bg-white',
  'shadow-[rgb(0_0_0_/_8%)_0px_4px_8px]',
  'w-full h-auto p-8 min-h-[400px]',
  '[&_a]:text-[var(--color-primary-main)] [&_a]:font-bold',
  'sm:max-w-[820px]',
])

export const smallButtonWrapperVariants = cva(['w-[180px] h-12 px-[5px]'])

export const largeButtonWrapperVariants = cva(['w-[260px] h-12'])

export const dubbleButtonWrapperVariants = cva(['my-5 flex w-full justify-between', '!text-xs md:px-[50px]'])

export const buttonWrapperVariants = cva(['flex w-full justify-center text-xs'])

export const innerWrapperVariants = cva(['w-full mt-5 text-center', 'sm:w-[500px]'])

export const headerVariants = cva(['text-2xl font-black mb-2.5', 'sm:text-4xl'])
