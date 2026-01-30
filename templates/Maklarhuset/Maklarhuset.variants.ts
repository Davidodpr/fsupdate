import { cva } from 'class-variance-authority'

// Container styles
export const containerVariants = cva(['min-h-screen', 'bg-gradient-to-br from-white to-gray-50', 'p-3', 'relative', 'md:pt-2 md:px-8 md:pb-8'])

export const contentVariants = cva(['max-w-[1200px]', 'mx-auto'])

// Typography styles
export const titleVariants = cva(['text-3xl', 'font-normal', 'text-[#2B2B2B]', 'mb-2', 'leading-tight', 'tracking-wide', 'text-center', 'md:!text-[40px] md:mb-3'])

export const subtitleVariants = cva([
  'text-2xl',
  'font-semibold',
  'font-[var(--font-family-main)]',
  'text-[#B8860B]',
  'mb-4',
  'leading-tight',
  'text-center',
  'md:text-[28px] md:mb-5',
])

export const descriptionVariants = cva([
  'text-lg',
  'text-[#4A4A4A]',
  'mb-10',
  'leading-relaxed',
  'font-light',
  'text-center',
  'px-4',
  '[&_span]:text-[#B8860B] [&_span]:font-semibold',
  'md:text-xl md:mb-12',
])

// Main section styles
export const mainSectionVariants = cva(['bg-white', 'rounded-2xl', 'shadow-[0_8px_32px_rgba(43,43,43,0.08)]', 'relative', 'overflow-hidden', 'mb-8'])

// Table styles
export const tableContainerVariants = cva(['bg-white', 'rounded-xl', 'overflow-hidden', 'shadow-[0_4px_16px_rgba(43,43,43,0.08)]'])

export const tableVariants = cva(['w-full', 'border-collapse'])

export const tableHeaderVariants = cva(['bg-gray-50', 'border-b-2 border-[#E8E8E8]'])

export const tableHeaderCellVariants = cva([
  'px-[16px] py-[12px]',
  'text-left',
  'text-xs',
  'font-semibold',
  'text-[#2B2B2B]',
  'uppercase',
  'tracking-wider',
  'sticky',
  'top-0',
  'bg-gray-50',
  'z-[1]',
  'first:pl-[20px]',
  'last:pr-[20px] last:text-right',
  'md:px-5 md:py-4',
  'md:text-sm',
  'md:first:pl-8',
  'md:last:pr-8 md:last:text-right',
])

export const tableBodyVariants = cva([])

export const tableRowVariants = cva(['border-b border-gray-100', 'transition-colors duration-200', 'hover:bg-gray-50', 'last:border-b-0'], {
  variants: {
    highlight: {
      true: ['bg-gray-50', 'font-medium'],
      false: {},
    },
  },
  defaultVariants: {
    highlight: false,
  },
})

export const tableCellVariants = cva([
  'px-[16px] py-[16px]',
  'text-sm',
  'text-[#2B2B2B]',
  'align-middle',
  'first:pl-[20px]',
  'first:text-[18px]',
  'last:pr-[20px] last:text-right',
  'md:p-5',
  'md:text-base',
  'md:first:pl-8',
  'md:last:pr-8',
])

export const rankCellVariants = cva(['font-semibold', 'text-lg', 'w-[20px]'], {
  variants: {
    isTop3: {
      true: ['text-xl'],
      false: ['text-[#4A4A4A]'],
    },
  },
})

export const brokerNameVariants = cva(['font-medium', 'text-base', 'text-[#2B2B2B]'])

// Error styles
export const errorContainerVariants = cva([
  'flex',
  'flex-col',
  'items-center',
  'p-6',
  'bg-red-50',
  'border',
  'border-red-200',
  'rounded-xl',
  'text-center',
  'mb-6',
  'md:max-w-md md:mx-auto md:p-5',
])

export const errorTextVariants = cva(['text-red-600', 'text-base', 'mb-2', 'font-medium'])

// Footer styles
export const footerVariants = cva(['text-center', 'mt-12', 'p-6', 'border-t border-[#E8E8E8]'])

export const footerTextVariants = cva(['text-sm', 'text-gray-500', 'mb-2', 'font-light', 'font-[var(--font-family-main)]', 'last:mb-0'])

// Table wrapper for scrolling
export const tableWrapperVariants = cva(['w-full', 'overflow-x-auto', 'webkit-overflow-scrolling-touch', 'md:overflow-x-visible'])

export const noDataMessageVariants = cva(['text-center', 'py-12 px-6', 'text-base', 'text-gray-500', 'font-light', 'font-[var(--font-family-main)]'])

export const documentCountVariants = cva(['font-semibold', 'text-base'], {
  variants: {
    highlight: {
      true: ['text-[#2B2B2B]', 'font-bold'],
      false: ['text-[#4A4A4A]'],
    },
  },
  defaultVariants: {
    highlight: false,
  },
})

// Podium styles
export const podiumContainerVariants = cva([
  'mb-8',
  'py-8',
  'px-4',
  'bg-gradient-to-br from-gray-50 to-gray-100',
  'rounded-t-2xl',
  'relative',
  'flex',
  'justify-center',
  'after:content-[""] after:absolute after:bottom-8 after:left-0 after:right-0 after:h-px after:bg-[#E8E8E8]',
  'md:mb-12',
  'md:after:hidden',
])

export const podiumItemVariants = cva(
  ['flex flex-col justify-center items-center', 'w-full max-w-[220px]', 'md:w-auto', '[&_.mobile-rank-emoji]:block [&_.mobile-rank-emoji]:md:hidden'],
  {
    variants: {
      position: {
        first: [
          'order-1',
          'md:order-2', // 1st place in center on desktop
        ],
        second: [
          'order-2',
          'md:order-1', // 2nd place on left on desktop
        ],
        third: [
          'order-3',
          'md:order-3', // 3rd place on right on desktop
        ],
      },
    },
  },
)

export const podiumCardVariants = cva(
  [
    'w-[200px]',
    'h-[200px]',
    'p-6',
    'bg-white',
    'rounded-full',
    'shadow-[0_4px_20px_rgba(0,0,0,0.08)]',
    'text-center',
    'transition-all duration-300',
    'relative',
    'overflow-visible',
    'p-5 mb-4',
    'md:w-[240px] md:h-[240px] md:p-7 md:mb-5',
    'lg:w-[260px] lg:h-[260px] lg:p-8',
    'hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]',
    'flex flex-col justify-center items-center',
  ],
  {
    variants: {
      rank: {
        1: [
          'w-[220px]',
          'h-[220px]',
          'bg-gradient-to-br from-yellow-200 via-yellow-400 to-orange-500',
          'border-4 border-orange-600',
          'shadow-[0_12px_40px_rgba(255,140,0,0.5),inset_0_4px_8px_rgba(255,230,102,0.3),0_0_30px_rgba(255,215,0,0.2)]',
          'w-[200px] h-[200px]',
          'md:w-[260px] md:h-[260px]',
          'lg:w-[280px] lg:h-[280px]',
        ],
        2: [
          'w-[200px]',
          'h-[200px]',
          'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-400',
          'border-4 border-gray-500',
          'shadow-[0_8px_30px_rgba(105,105,105,0.4),inset_0_3px_6px_rgba(248,248,255,0.4),0_0_20px_rgba(192,192,192,0.15)]',
          'md:w-[240px] md:h-[240px]',
          'lg:w-[260px] lg:h-[260px]',
        ],
        3: [
          'w-[180px]',
          'h-[180px]',
          'bg-gradient-to-br from-orange-300 via-orange-400 to-orange-600',
          'border-4 border-orange-700',
          'shadow-[0_6px_25px_rgba(139,69,19,0.4),inset_0_2px_5px_rgba(244,164,96,0.25),0_0_15px_rgba(205,127,50,0.12)]',
          'w-[180px] h-[180px]',
          'md:w-[220px] md:h-[220px]',
          'lg:w-[240px] lg:h-[240px]',
        ],
      },
    },
  },
)

export const podiumBaseVariants = cva(
  [
    'w-full',
    'bg-gradient-to-br from-[#2B2B2B] to-[#4A4A4A]',
    'rounded-t-lg',
    'text-white',
    'text-5xl',
    'font-bold',
    'font-[var(--font-family-main)]',
    'text-shadow-[0_2px_4px_rgba(0,0,0,0.3)]',
    '[&_span]:opacity-100 [&_span]:drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]',
  ],
  {
    variants: {
      height: {
        first: ['h-[120px]', 'hidden', 'md:flex md:justify-center md:items-center'],
        second: ['h-[80px]', 'hidden', 'md:flex md:justify-center md:items-center'],
        third: ['h-[60px]', 'hidden', 'md:flex md:justify-center md:items-center'],
      },
    },
  },
)

export const podiumNameVariants = cva([
  'text-[22px]',
  'font-bold',
  'mb-3',
  'mt-0',
  'leading-tight',
  'font-[var(--font-family-main)]',
  'min-h-[30px]',
  'px-3 py-2',
  'text-center',
  'text-lg px-2.5 py-1.5 min-h-[28px]',
  'md:text-2xl',
  'lg:text-[26px]',
  '[.rank-1_&]:text-[#5D4E37] [.rank-1_&]:text-shadow-[0_1px_2px_rgba(255,255,255,0.3)]',
  '[.rank-2_&]:text-[#2F2F2F] [.rank-2_&]:text-shadow-[0_1px_2px_rgba(255,255,255,0.3)]',
  '[.rank-3_&]:text-white [.rank-3_&]:text-shadow-[0_1px_3px_rgba(0,0,0,0.4)]',
])

export const podiumDocumentsVariants = cva(['flex flex-col', 'gap-0.5', 'mt-1'])

export const prizeDisplayVariants = cva([
  'absolute',
  '-top-[22px]',
  'left-1/2',
  '-translate-x-1/2',
  'bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500',
  'text-[#5D4E37]',
  'px-4 py-1.5',
  'rounded-[18px]',
  'text-xs',
  'font-extrabold',
  'font-[SF_Pro_Display,sans-serif]',
  'font-variant-numeric-tabular',
  'text-center',
  'whitespace-nowrap',
  'shadow-[0_3px_12px_rgba(255,140,0,0.25),inset_0_1px_2px_rgba(255,255,255,0.3)]',
  'border border-[#B8860B]',
  'flex gap-[5px]',
  'z-10',
  'transition-all duration-200',
  'hover:-translate-x-1/2 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(255,140,0,0.35),inset_0_1px_2px_rgba(255,255,255,0.4)]',
  'before:content-["💵"] before:text-sm before:leading-none before:drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]',
  'text-[10px] px-3 py-[5px] -top-[18px] gap-1 rounded-[15px]',
  'before:text-xs',
  'md:text-[13px] md:px-[18px] md:pb-[7px] md:pt-[9px] md:-top-2 md:gap-1.5 md:rounded-[20px]',
  'md:before:text-xl',
])

export const podiumWrapperVariants = cva([
  'max-w-[800px]',
  'mx-auto',
  'flex',
  'flex-col',
  'gap-6',
  'gap-3 flex-col items-center',
  'md:flex-row md:flex md:items-end md:gap-10 md:max-w-[900px]',
  'lg:gap-[60px] lg:max-w-[1100px]',
  'xl:gap-20 xl:max-w-[1200px]',
])

export const podiumValueVariants = cva([
  'text-4xl',
  'font-extrabold',
  'font-[var(--font-family-main)]',
  'leading-none',
  'text-center',
  'text-3xl',
  'md:text-[42px]',
  'lg:text-5xl',
  '[.rank-1_&]:text-[#5D4E37] [.rank-1_&]:text-shadow-[0_1px_2px_rgba(255,255,255,0.3)]',
  '[.rank-2_&]:text-[#2F2F2F] [.rank-2_&]:text-shadow-[0_1px_2px_rgba(255,255,255,0.3)]',
  '[.rank-3_&]:text-white [.rank-3_&]:text-shadow-[0_1px_3px_rgba(0,0,0,0.4)]',
])

export const podiumLabelVariants = cva([
  'text-sm',
  'font-semibold',
  'font-[var(--font-family-main)]',
  'uppercase',
  'tracking-wide',
  'text-center',
  'mt-1',
  '[.rank-1_&]:text-[#5D4E37] [.rank-1_&]:text-shadow-[0_1px_2px_rgba(255,255,255,0.3)]',
  '[.rank-2_&]:text-[#2F2F2F] [.rank-2_&]:text-shadow-[0_1px_2px_rgba(255,255,255,0.3)]',
  '[.rank-3_&]:text-white [.rank-3_&]:text-shadow-[0_1px_3px_rgba(0,0,0,0.4)]',
  'text-xs tracking-[0.8px]',
])

export const sectionTitleVariants = cva(['text-xl', 'font-semibold', 'text-[#2B2B2B]', 'mb-4', 'text-center', 'font-[var(--font-family-main)]', 'md:text-2xl md:mb-6'])

// Rules section styles
export const rulesSectionVariants = cva(['bg-white', 'rounded-2xl', 'shadow-[0_8px_32px_rgba(43,43,43,0.08)]', 'p-6', 'mt-6', 'mb-6', 'md:p-8 md:mt-8 md:mb-8'])

export const rulesTitleVariants = cva(['text-2xl', 'font-semibold', 'text-[#2B2B2B]', 'mb-5', 'text-left', 'font-[var(--font-family-main)]', 'md:text-[28px] md:mb-6'])

export const rulesContentVariants = cva([
  'text-base',
  'leading-relaxed',
  'text-[#4A4A4A]',
  'whitespace-pre-wrap',
  'font-[var(--font-family-main)]',
  '[&_strong]:font-bold [&_strong]:text-[#2B2B2B]',
  '[&_.golden-ticket]:font-extrabold [&_.golden-ticket]:bg-gradient-to-r [&_.golden-ticket]:from-yellow-400 [&_.golden-ticket]:via-yellow-500 [&_.golden-ticket]:to-orange-500',
  '[&_.golden-ticket]:bg-clip-text [&_.golden-ticket]:text-transparent [&_.golden-ticket]:webkit-bg-clip-text [&_.golden-ticket]:webkit-text-fill-transparent',
  '[&_.prize-money]:font-bold [&_.prize-money]:text-green-500',
  'text-sm',
  'md:text-base',
])

// Contact section styles
export const contactSectionVariants = cva(['bg-gray-50', 'rounded-xl', 'p-5', 'mt-5', 'mb-6', 'text-center', 'md:p-6 md:mt-6 md:mb-8'])

export const contactTitleVariants = cva(['text-lg', 'font-semibold', 'text-[#2B2B2B]', 'mb-2.5', 'font-[var(--font-family-main)]', 'md:text-xl md:mb-3'])

export const contactTextVariants = cva([
  'text-base',
  'text-[#4A4A4A]',
  'font-[var(--font-family-main)]',
  '[&_a]:!text-[#B8860B] [&_a]:no-underline [&_a]:!font-semi-bold',
  '!hover:underline',
  'text-sm',
  'md:text-base',
])
