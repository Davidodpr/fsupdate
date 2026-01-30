import { cva } from 'class-variance-authority'

export const menuIconWrapperVariants = cva(['h-[35px]', 'w-[35px]', 'cursor-pointer', 'ml-[5px]'])

export const styledLinkVariants = cva(['text-2xl', 'font-bold', 'md:text-[15px]', '[&]:!font-bold'], {
  variants: {
    active: {
      true: 'underline underline-offset-4',
    },
  },
})

export const mobileMenuWrapperVariants = cva(['pt-3 px-4', 'bg-white', 'z-[5000]', 'w-full', 'h-screen', 'absolute', 'top-0', 'left-0', 'text-2xl'])

export const iconWrapperVariants = cva(['h-[35px]', 'w-[35px]'])

export const menuButtonVariants = cva(['mb-12', 'uppercase'], {
  variants: {
    withMargin: {
      true: 'mt-20',
    },
  },
})

export const languageSelectWrapperVariants = cva(['mt-8'])

export const headerMenuButtonVariants = cva(['mr-12', 'uppercase', '!font-bold'])
