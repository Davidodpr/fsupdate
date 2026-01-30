import { cva } from 'class-variance-authority'

export const mainWrapperVariants = cva(['py-8', 'px-4', 'flex', 'flex-col', 'w-full', 'md:p-4', 'md:w-[450px]'])

export const textWithWidthVariants = cva(['w-[150px]', 'text-right', 'md:w-auto'])

export const flexWithPaddingVariants = cva(['pb-4'])
