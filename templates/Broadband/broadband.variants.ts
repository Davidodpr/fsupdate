import { cva } from 'class-variance-authority'

export const wrapperVariants = cva([
  'bg-[var(--color-background-default)]',
  'font-[var(--font-family-main)]',
  'text-[var(--color-text-main)]',
  'w-full',
  'flex-1',
  'flex',
  'flex-col',
])

export const contentContainerVariants = cva(['flex', 'flex-col', 'items-center', 'w-full', 'flex-1', 'md:w-full', 'md:flex', 'md:flex-col', 'md:items-center'])

export const popupHeaderVariants = cva(['!font-bold', '!text-[14px]', 'mb-2'])

export const accordionButtonWrapperVariants = cva(
  [
    'w-full',
    'text-[15px]',
    '!text-left',
    'md:text-[20px]',
    '[&_button]:bg-[#DCEFFF]',
    '[&_button]:p-4',
    '[&_button]:font-bold',
    '[&_button]:overflow-visible',
    '[&_button[data-state="open"]]:bg-[#DCEFFF]',
    '[&_button[data-state="closed"]]:bg-[#DCEFFF]',
    'md:[&_button]:py-3',
    'md:[&_button]:px-8',
    '[&_svg_path]:stroke-[var(--color-text-main)]',
  ],
  {
    variants: {
      isCustomButton: {
        true: ['[&_button]:m-0', '[&_button]:overflow-visible'],
      },
    },
  },
)

export const buttonWrapperVariants = cva([
  'min-w-[168px]',
  'w-full',
  'mt-4',
  '[&_button]:bg-[#DCEFFF]',
  '[&_button:hover]:bg-[#DCEFFF]',
  'md:mt-0',
  'md:min-w-[168px]',
  'md:w-max-content',
  'md:min-h-12',
  'md:ml-6',
])

export const accordionContentWrapperVariants = cva([
  '[&_div]:bg-[#DCEFFF]',
  '[&_div]:text-[var(--color-secondary-main)]',
  '[&_div]:text-base',
  '[&_ul]:m-0',
  '[&_a]:!text-[var(--color-primary-main)]',
])

export const imageWrapperVariants = cva([
  'flex',
  'w-[82px]',
  'h-[110px]',
  'justify-end',
  'items-end',
  'flex-shrink-0',
  'rounded-[var(--radius-main)]',
  'bg-cover',
  'relative',
  'bg-center',
  'border',
  'border-gray-400',
  'mb-6',
  'md:w-[120px]',
  'md:h-[120px]',
  'md:ml-8',
  'md:mb-6',
])

export const accordianWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'text-[var(--color-text-main)]', 'w-full', 'mb-16', 'px-4', '[&>div]:p-0', 'md:px-0 md:w-[740px]'])

export const spinnerBgWrapperVariants = cva(['w-screen', 'h-screen', 'bg-[var(--color-background-default)]'])

export const contactMeCardWrapperVariants = cva(['mt-4'])

export const faqWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'px-4', 'mb-6', 'bg-[var(--color-background-default)]', 'gap-4', 'md:flex-row', 'md:px-0'])
