import { cva } from 'class-variance-authority'

export const ssoWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'justify-center', 'w-full', 'h-screen', 'pt-12', 'px-5', 'pb-0'])

export const spinnerWrapperVariants = cva(['flex', 'mt-[50px]'])

export const buttonWrapperVariants = cva(['mt-5', 'h-12', 'w-full'])

export const styledFlexVariants = cva(['flex', 'flex-col', 'items-center', 'justify-center', 'md:w-screen', 'md:h-screen'])

export const imageWrapperVariants = cva([
  'flex',
  'relative',
  'items-center',
  'justify-center',
  'mt-6',
  'bg-white',
  'z-[1]',
  'rounded-[var(--radius-main)]',
  'w-[210px]',
  'h-16',
  '[&_svg]:ml-[-40px]',
  '[&_svg]:sm:ml-0',
  'md:top-[10px]',
  '2xl:top-[58px]',
  'md:w-[300px]',
  'md:h-[84px]',
  'md:absolute',
])

export const noAddressBackgroundVariants = cva([
  'w-screen',
  'h-screen',
  'flex',
  'justify-center',
  'items-center',
  'absolute',
  'top-0',
  'left-0',
  'bottom-0',
  'right-0',
  'bg-[url(/images/bg_onboarding_mobile.jpg)]',
  'bg-no-repeat',
  'bg-contain',
  'md:bg-[url(/images/bg_onboarding_desktop.jpg)]',
  'md:bg-no-repeat',
  'md:bg-cover',
])
