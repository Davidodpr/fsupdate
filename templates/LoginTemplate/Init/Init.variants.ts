import { cva } from 'class-variance-authority'

export const changeLogInButtonVariants = cva(['text-[var(--fs-fontSizes-1)]', 'text-[var(--color-secondary-main)]', 'underline', 'cursor-pointer'])

export const headerSubtitleVariants = cva(['!text-xs', 'xs:!text-sm', 'sm:!text-sm', 'mb-1', 'text-center'])

export const initWrapperVariants = cva(
  [
    'flex',
    'flex-col',
    'items-center',
    'flex-grow-0',
    'max-w-[90%]',
    'flex-[66%]',
    'mx-auto',
    'rounded-[var(--radius-main)]',
    'bg-white',
    'shadow-[rgb(0_0_0_/_7%)_0px_4px_32px]',
    'w-full',
    'h-auto',
    'pt-12',
    'px-4',
    'pb-16',
    '[&_a]:text-[var(--color-primary-main)]',
    '[&_a]:font-bold',
    'sm:max-w-[820px]',
    'sm:py-16',
    'sm:px-8',
  ],
  {
    variants: {
      leadHasAlreadyUsedInvitationLink: {
        true: ['py-8', 'px-4'],
      },
    },
  },
)

export const largeButtonWrapperVariants = cva(['w-full', 'h-12', 'md:w-[340px]', 'md:!text-md !text-sm', 'flex justify-center', 'items-center'])

export const buttonWrapperVariants = cva(['mt-5', 'mb-2.5', 'flex', 'w-full', 'justify-between', 'text-xs'])

export const thisDeviceButtonWrapperVariants = cva(['flex', 'w-full', 'mt-4', 'justify-center', 'text-xs'])

export const innerWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'w-[340px]', 'max-w-full', 'mt-1.5'])

export const headerVariants = cva(['!text-[22px]', 'font-bolder', '!m-0', 'md:text-2xl', '!mb-4', 'sm:!text-4xl', 'sm:mb-4'], {
  variants: {
    leadHasAlreadyUsedInvitationLink: {
      true: ['mb-[22px]'],
    },
  },
})

export const inputAndButtonsWrapperVariants = cva(['w-full', 'flex', 'flex-col', 'items-center', 'text-center'])

export const infoWrapperVariants = cva(['flex', 'gap-2', 'rounded-lg', 'bg-[#ECF9F7]', 'px-2', 'py-1', 'mt-8', 'inline-flex', 'items-center'])

export const iconWrapperVariants = cva([])

export const textWrapperVariants = cva(['font-[Gilroy]', 'font-normal', 'text-xs', 'text-left'])

export const logoWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'mb-8'])

export const titleWrapperVariants = cva(['mt-4', 'mb-0', 'font-black', 'xs:text-[32px]', 'sm:text-4xl'])

export const continueButtonVariants = cva(['w-full', 'sm:w-[200px]'])
