import { cva } from 'class-variance-authority'

export const completedListContainerVariants = cva(['w-full max-w-[818px] mx-auto', 'bg-white rounded-lg shadow-sm', 'py-4 px-3 md:p-6', 'mb-4 mt-6'])

export const completedListHeaderVariants = cva(['text-sm font-semibold tracking-wide text-[#626263]', 'mb-4', 'uppercase'])

export const activityListWrapperVariants = cva(['w-full flex flex-col gap-2'])

export const showAllVariants = cva(['underline mx-auto', 'text-[var(--color-text-main)]', 'mt-[15px]', 'hover:cursor-pointer'])

export const faderVariants = cva([
  'h-[100px] w-full',
  'bottom-[70px] absolute',
  'bg-gradient-to-t from-[rgba(232,237,240,0.99)] via-[rgba(232,237,240,0.6)] to-[rgba(232,237,240,0.2)]',
])
