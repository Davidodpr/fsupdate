import { cva } from 'class-variance-authority'

export const topSectionWrapperVariants = cva([
  'w-full',
  'flex',
  'flex-col',
  'p-4',
  'text-center',
  'justify-center',
  'items-center',
  'bg-[var(--color-secondary-light)]',
  'md:px-40 md:pb-8 md:pt-0',
])

export const styledFlexVariants = cva(['p-0', 'md:!py-2 md:!pr-2 md:!pl-4', 'text-[15px]'], {
  variants: {
    isFromAddress: {
      true: ['p-0', 'md:py-0 md:pr-3 md:pl-4'],
    },
  },
})

export const textButtonWrapperVariants = cva(
  [
    'py-3 px-8',
    'border border-[rgba(33,71,102,0.20)]',
    'rounded-lg',
    'h-[42px]',
    'flex',
    'justify-center',
    'items-center',
    'flex-1',
    'w-0',
    'hover:cursor-pointer',
    'md:w-[100px]',
  ],
  {
    variants: {
      selected: {
        true: ['bg-[var(--color-secondary-light)]', 'text-white', 'font-bold', 'hover:cursor-pointer'],
      },
    },
  },
)

export const buttonsWrapperVariants = cva(['flex', 'gap-2', 'justify-center', 'items-center', 'w-full', 'md:gap-2 md:justify-start'])

export const questionMarkWrapperVariants = cva([])

export const popupWrapperVariants = cva(['text-[15px]', 'text-[#112E46]'])

export const pencilWrapperVariants = cva([
  'w-8',
  'h-8',
  'text-[#4C96D0]',
  'bg-white',
  'rounded-full',
  'flex',
  'justify-center',
  'items-center',
  'absolute',
  'right-3',
  'top-3',
  'hover:cursor-pointer',
])

export const questionIconWrapperVariants = cva([
  'w-6',
  'h-6',
  'text-[var(--color-question-icon-color]',
  'text-[15px]',
  'hover:cursor-pointer',
  '[&_svg]:text-[var(--color-question-icon-color)]',
  '[&_svg_path]:text-[var(--color-question-icon-color)]',
])

export const errorTextVariants = cva(['absolute', 'left-0', 'bottom-[-30px]', 'text-[var(--color-error-red)]', 'md:right-[105px] md:bottom-[-35px]'])

export const inputAndDateWrapperVariants = cva(
  ['w-full', 'flex', 'relative', 'gap-2', 'text-[15px]', 'md:pr-2 md:w-full md:max-w-[240px] md:flex md:justify-end md:ml-auto md:items-end md:gap-2 md:text-[15px]'],
  {
    variants: {
      isFullWidth: {
        true: ['md:max-w-[325px]'],
      },
    },
  },
)

export const userDataSectionVariants = cva([
  'w-full',
  'flex',
  'items-space-between',
  'md:!text-[20px] !text-[15px]',
  'font-bold',
  'text-white',
  'text-left',
  'bg-[#4C96D0]',
  'rounded-2xl',
  'relative',
  'flex-col',
  'py-3 pl-4 pr-3',
  'mb-4',
  'h-fit',
  '[&_p]:text-[15px] [&_p]:font-bold',
  'md:max-w-[250px] md:w-content md:min-w-[208px] md:mb-0 md:ml-4',
  'md:[&_p]:text-[24px]',
])

export const dividerVariants = cva(['w-full', 'h-[1px]', 'bg-[#21476633]', 'opacity-50', 'my-4'], {
  variants: {
    noMarginTop: {
      true: 'm-0 mb-4',
    },
    lessMarginTop: {
      true: ['mt-[9px] mb-4', 'md:mt-[17px] md:mb-4'],
    },
  },
})

export const styledHeaderVariants = cva(
  ['!m-0', '!text-[48px]', 'text-white', 'text-center', 'font-bold', 'min-[380px]:whitespace-nowrap min-[380px]:pl-0', 'md:!text-[64px] md:whitespace-nowrap md:text-left'],
  {
    variants: {
      isSecondaryFont: {
        true: 'font-[var(--font-secondary)]',
      },
    },
  },
)

export const styledIntroSectionTitleVariants = cva([
  'mt-0',
  '!font-bold',
  'text-white',
  'pt-0 pb-8',
  'text-center',
  'leading-[120%]',
  '!text-[16px]',
  'md:!text-[20px] md:max-w-[744px] md:text-left md:font-bold',
])

export const userDataHeaderVariants = cva(['mb-2.5', 'mt-0', '!text-[18px]'])

export const introSectionVariants = cva(
  ['flex', 'flex-col', 'justify-between', 'text-left', 'rounded-2xl', 'bg-white', 'relative', 'text-[32px]', 'max-w-full', 'p-4', 'md:min-w-[520px] md:h-max md:py-2 md:px-0'],
  {
    variants: {
      editIsClosed: {
        true: 'min-w-full',
      },
      noEditIsOpen: {
        true: '!p-0',
      },
    },
  },
)

export const topSectionContentWrapperVariants = cva(['flex', 'flex-col-reverse', 'max-w-full', 'w-full', 'md:flex-row md:justify-center md:w-auto'], {
  variants: {
    editIsClosed: {
      true: 'min-w-full',
    },
  },
})

export const styledIntroSectionTextVariants = cva(['text-[20px]', 'leading-[22px]', 'text-[var(--color-text-main)]', 'font-normal', 'md:text-[24px]'])
