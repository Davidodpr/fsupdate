import { cva } from 'class-variance-authority'

export const contactMeModalWrapperVariants = cva(['w-full', 'h-full'])

export const imageWrapperVariants = cva(['w-[50px]', 'h-[50px]'])

export const subtitelWrapperVariants = cva(['text-[13px]', 'text-[var(--color-inactive-dark)]', 'leading-[11px]'])

export const modalHeaderVariants = cva(['w-full', 'flex', 'items-center', 'justify-between', 'pb-1'])

export const modalDividerVariants = cva(['w-full', 'h-[1px]', 'bg-[var(--color-inactive-main)]', 'my-3'])

export const headerAndCheckboxVariants = cva(['h-10', 'pt-[5px]', 'flex', 'justify-center', 'items-center'])

export const checkboxWrapperVariants = cva(['pt-[3px]', 'pr-[18px]', 'pb-0', 'pl-2'])

export const largeButtonWrapperVariants = cva(['w-full', 'max-w-[320px]'])

export const buttonWrapperVariants = cva(['mt-6', 'flex', 'w-full', 'justify-center', 'text-xs'])

export const textWrapperVariants = cva(['!text-black', 'text-sm', 'text-center', 'pb-0'])

export const radioItemWrapperVariants = cva([
  'w-full',
  'max-w-full',
  'flex',
  'flex-row',
  'justify-start',
  'items-center',
  'relative',
  'hover:cursor-pointer',
  '[&>label]:ml-[10px]',
])

export const radioTextVariants = cva(['ml-[10px]', 'relative', 'text-[15px]', 'flex', 'flex-row', 'justify-start', 'items-start', 'flex-1', 'grow'])

export const labelVariants = cva(['max-w-full', 'text-[15px]', 'mr-[10px]', 'w-fit', 'flex', 'flex-row', 'items-center', 'hover:cursor-pointer'])

export const inputWrapperVariants = cva([
  'mt-2',
  'w-full',
  '[&_p]:leading-[0.5]',
  '[&_p]:mb-[5px]',
  '[&_textarea]:font-normal',
  '[&_span]:text-[var(--color-inactive-dark)]',
  '[&_span]:font-normal',
  '[&_span:hover]:cursor-pointer',
])

export const emailWrapperVariants = cva(['mt-[10px]'])

export const confirmedWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'justify-center', 'relative'])

export const bottomWrapperVariants = cva(['my-[15px]', 'w-full'])

export const textPartWrapperVariants = cva(['flex', 'flex-col', 'py-[10px]'])

export const chatImageWrapperVariants = cva(['absolute', 'right-[10px]', 'bottom-[-10px]'])

export const titleWrapperVariants = cva(['text-center', 'w-full'])

export const successWrapperVariants = cva([
  'grow-0',
  'max-w-[90%]',
  'basis-[66%]',
  'mx-auto',
  'rounded-[var(--radius-border-radius-main)]',
  'w-full',
  'h-auto',
  '[&_a]:text-[var(--color-primary-main)]',
  '[&_a]:font-bold',
  'sm:max-w-[820px]',
])

export const smallButtonWrapperVariants = cva(['w-[180px]', 'h-12', 'px-[5px]'])

export const subLargeButtonWrapperVariants = cva(['w-[260px]', 'h-12'])

export const dubbleButtonWrapperVariants = cva(['my-5', 'flex', 'w-full', 'justify-between', 'text-xs', 'px-[50px]'])

export const subButtonWrapperVariants = cva(['flex', 'w-full', 'justify-center', 'text-xs'])

export const innerWrapperVariants = cva(['w-full', 'mt-5', 'text-center'])

export const headerVariants = cva(['text-2xl', 'font-black', 'my-0', 'mb-[10px]', 'sm:text-4xl'])

export const contactWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'justify-center', 'p-0', 'gap-3', 'w-full', 'h-auto', 'order-0', 'grow-0'])

export const contactFrameVariants = cva(['flex', 'flex-row', 'items-center', 'justify-center', 'p-3', 'gap-4', 'h-auto', 'order-0', 'grow-0'])

export const contactMeContentVariants = cva(['flex', 'flex-col', 'sm:flex-row', 'sm:content-between', 'sm:justify-between'])

export const contactDescriptionVariants = cva([
  'h-auto',
  'font-normal',
  'leading-[1.4]',
  'flex',
  'w-full',
  'items-center',
  'justify-center',
  'text-center',
  'text-[15px]',
  'order-1',
  'grow-0',
])

export const contactButtonFrameVariants = cva(['flex', 'flex-row', 'items-center', 'justify-center', 'p-0', 'gap-3', 'w-full', 'order-1', 'grow-0'])

export const contactButtonWrapperVariants = cva(['gap-1', 'flex-1', 'max-w-[160px]', 'order-0', 'grow-0'], {
  variants: {
    usage: {
      move: 'w-[48%]',
    },
  },
})
