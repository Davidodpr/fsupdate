import { cva } from 'class-variance-authority'

export const serviceFlowHeaderWrapperVariants = cva(['w-full h-10', 'flex items-center', 'bg-[color:var(--color-white-main)]', 'md:h-15 md:px-6'])

export const headerTextVariants = cva(['font-secondary text-base ml-2', 'md:text-3xl md:!text-3xl'])

export const innerWrapperVariants = cva(['max-w-full w-full mx-auto', 'flex justify-start items-center', 'md:max-w-[1000px]'])
