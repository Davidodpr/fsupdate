import { cva } from 'class-variance-authority'

export const modalHeaderWrapperVariants = cva(['flex', 'h-[30px]', 'pb-2.5', 'w-full', 'items-center', 'border-b', 'border-inactive-main', 'md:h-10'])

export const modalContentWrapperVariants = cva(['flex', 'flex-col', 'justify-between', 'md:flex-row'])

export const modalContentTextWrapperVariants = cva(['leading-[30px]', 'mt-5', 'md:max-w-[65%]'])

export const modalContentTextVariants = cva(['!leading-6', 'text-[15px]', 'mt-4'])
