import { cva } from 'class-variance-authority'

export const cookieBlockedWrapperVariants = cva(['p-8', 'bg-white', 'rounded-lg', 'mb-16'])

export const contactUsVariants = cva(['rounded-lg', 'bg-[#f8f9fa]', 'px-8 py-4', 'mb-4', 'md:w-[400px] md:mr-1 md:mb-0'])

export const infoWrapperVariants = cva(['p-8', 'bg-[#f8f9fa]', 'rounded-lg', 'md:w-[400px] md:ml-1'])

export const buttonsWrapperVariants = cva(['flex', 'w-[200px]', 'justify-between', 'items-center'])
