import { cva } from 'class-variance-authority'

export const backgroundVariants = cva(['flex bg-[var(--color-inactive-quite-light)] min-h-[65vh]'])

export const containerVariants = cva(['px-4 w-full', 'md:px-6', 'lg:max-w-[1280px]'])

export const wrapperVariants = cva(['w-[90%] mx-auto', 'md:w-[60%]'])

export const paperVariants = cva(['bg-white p-4 mt-12 mb-10', 'text-[15px] break-words', 'md:p-16 md:mt-[104px]'])

export const titleVariants = cva(['font-["PrumoDeckW00-Black"] text-2xl leading-none mb-4', 'md:text-[34px]'])
