import { cva } from 'class-variance-authority'

export const styledModalVariants = cva(
  [
    'fixed',
    'bottom-0',
    'left-0',
    'right-0',
    'max-w-screen',
    'w-full',
    'rounded-t-[32px]',
    'bg-white',
    'z-[3000000000]',
    'px-4',
    'py-5',
    'md:p-6',
    'shadow-[rgba(14,18,22,0.35)_0px_10px_38px_-10px,rgba(14,18,22,0.2)_0px_10px_20px_-15px]',
    'md:static',
    'md:max-w-[528px]',
    'md:rounded-[var(--radius-border-radius-main)]',
    'md:h-auto',
    'md:overflow-visible',
    'min-h-[420px]',
    'max-h-[85vh]',
    'md:min-h-0',
    'md:max-h-none',
    'transition-[height]',
    'duration-300',
    'ease-out',
  ],
  {
    variants: {
      fullHeight: {
        true: ['overflow-y-auto'],
        false: ['overflow-hidden'],
      },
      isStepTwo: {
        true: ['md:min-h-auto', 'md:h-auto'],
      },
      isStepTwoAndTwoDates: {
        true: ['md:min-h-auto', 'md:h-auto'],
      },
    },
    defaultVariants: {
      fullHeight: false,
    },
  },
)

export const dragHandleVariants = cva(['w-12', 'h-1', 'bg-gray-300', 'rounded-full', 'mx-auto', 'mb-4', 'flex-shrink-0'])

export const styledHeaderSectionVariants = cva(['text-center', 'flex', 'justify-center', 'items-center', 'md:mt-0'])

export const modalDividerVariants = cva(['w-full', 'my-4', 'border-b border-[#E1E1E3]'])

export const styledHeaderVariants = cva(['mb-0', 'ml-0.5', 'text-[var(--color-secondary-main)]', 'text-[18px]', 'md:!text-[20px]', '!font-bold'])

export const styledSubHeaderVariants = cva(['text-[var(--color-secondary-main)]'])

export const styledDisclaimerTextVariants = cva(['text-center', 'mt-4', 'text-sm', 'italic'])

export const termsTextVariants = cva(['text-xs', 'm-0'])

export const termsTextLinkVariants = cva(['text-xs', '!text-[#065f46]', '!font-bold', 'hover:cursor-pointer', 'underline'])

export const termsWrapperVariants = cva(['flex', 'flex-wrap', 'justify-center', 'gap-x-1'])

export const introSectionVariants = cva(['text-center', 'mb-4'])

export const introTitleVariants = cva(['text-lg', 'font-bold', 'text-[var(--color-secondary-main)]', 'mb-1'])

export const introDescriptionVariants = cva(['text-sm', 'text-[#767678]', 'leading-relaxed'])
