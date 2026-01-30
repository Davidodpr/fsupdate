import { cva } from 'class-variance-authority'

// Container styles
export const containerVariants = cva(['min-h-screen', 'bg-gradient-to-br from-white to-gray-50', 'p-4', 'relative', 'md:p-8'])

export const contentVariants = cva(['max-w-[480px]', 'mx-auto', 'pt-8'])

// Typography styles
export const titleVariants = cva([
  'text-3xl',
  'font-extralight',
  'font-[var(--font-family-main)]',
  'text-[#2B2B2B]',
  'mb-4',
  'leading-tight',
  'tracking-tight',
  'text-center',
  'md:text-3xl md:mb-4',
])

export const descriptionVariants = cva(['text-lg', 'text-[#4A4A4A]', 'mb-8', 'leading-relaxed', 'font-light', 'text-center', 'px-4', 'md:text-lg md:mb-8'])

// Upload section styles
export const uploadSectionVariants = cva([
  'bg-white',
  'p-[24px] pt-8 pb-6',
  'rounded-2xl',
  'shadow-[0_8px_32px_rgba(43,43,43,0.08)]',
  'relative',
  'overflow-hidden',
  'md:p-8 md:pt-8 md:pb-6',
])

export const instructionTextVariants = cva([
  'text-lg',
  'font-normal',
  'font-[var(--font-family-main)]',
  'text-[#2B2B2B]',
  'my-3',
  'leading-snug',
  'flex',
  'items-center',
  'gap-2',
  'before:content-["📝"]',
  'before:text-xl',
  'md:text-lg',
])

export const requirementTextVariants = cva(['text-[15px]', 'text-[#2B2B2B]', 'mb-6', 'leading-relaxed', 'font-light', 'list-none', 'p-0'])

export const requirementItemVariants = cva([
  'flex',
  'items-center',
  'gap-3',
  'mb-3',
  'p-2',
  'md:p-3',
  'bg-gray-50',
  'rounded-lg',
  'border-l-[3px]',
  'border-l-[#2B2B2B]',
  'before:content-[attr(data-number)]',
  'before:min-w-[24px]',
  'before:h-[24px]',
  'before:bg-[#2B2B2B]',
  'before:text-white',
  'before:rounded-full',
  'before:flex',
  'before:items-center',
  'before:justify-center',
  'before:text-xs',
  'before:font-semibold',
])

// Error/Success message styles
export const successMessageVariants = cva([
  'flex',
  'items-start',
  'gap-4',
  'p-4',
  'bg-gradient-to-br from-green-50 to-green-100',
  'text-green-800',
  'border',
  'border-green-200',
  'rounded-lg',
  'mb-4',
  'text-[15px]',
  'font-light',
  'leading-relaxed',
  'relative',
  'animate-[slideInDown_0.3s_ease]',
  'text-center',
  'md:p-4 md:text-[15px] md:rounded-lg',
  'before:content-[""]',
  'before:absolute',
  'before:inset-0',
  'before:rounded-[inherit]',
  'before:bg-gradient-to-br',
  'before:from-white/20',
  'before:to-transparent',
  'before:pointer-events-none',
])

export const errorMessageVariants = cva(
  [
    'flex',
    'flex-col',
    'gap-4',
    'p-4',
    'bg-gradient-to-br from-red-50 to-red-100',
    'text-red-700',
    'border',
    'border-red-200',
    'rounded-lg',
    'text-[15px]',
    'font-light',
    'leading-relaxed',
    'mb-4',
    'animate-[slideInDown_0.3s_ease]',
    'text-center',
    'min-h-[60px]',
    'focus-visible:outline-2',
    'focus-visible:outline-red-500',
    'focus-visible:outline-offset-2',
    'md:p-4 md:text-[15px] md:rounded-lg',
    'before:content-[""]',
    'before:absolute',
    'before:inset-0',
    'before:rounded-[inherit]',
    'before:bg-gradient-to-br',
    'before:from-white/20',
    'before:to-transparent',
    'before:pointer-events-none',
  ],
  {
    variants: {
      severity: {
        error: ['bg-red-50', 'text-red-600', 'border-red-500', 'animate-[slideInDown_0.3s_ease-out,shake_0.6s_ease-in-out_0.3s]'],
        warning: ['bg-orange-50', 'text-orange-700', 'border-orange-500', 'shadow-[0_4px_12px_rgba(179,78,0,0.15)]'],
      },
      size: {
        compact: ['p-3', 'text-sm', 'gap-2', 'rounded-lg', 'md:p-3 md:text-sm md:rounded-[10px]'],
        normal: [],
        large: ['p-5', 'text-lg', 'gap-4', 'md:p-6 md:text-lg'],
      },
    },
    defaultVariants: {
      severity: 'error',
      size: 'normal',
    },
  },
)

// Button styles
export const sendButtonVariants = cva(
  [
    'w-full',
    'px-6 py-[18px]',
    'text-white',
    'border-none',
    'rounded-xl',
    'text-lg',
    'font-normal',
    'cursor-pointer',
    'transition-all duration-300',
    'font-[var(--font-family-main)]',
    'mt-4',
    'tracking-wide',
    'shadow-[0_4px_16px_rgba(43,43,43,0.2)]',
    'hover:-translate-y-0.5',
    'hover:shadow-[0_6px_24px_rgba(43,43,43,0.3)]',
    'active:translate-y-0',
  ],
  {
    defaultVariants: {
      disabled: false,
    },
    variants: {
      disabled: {
        true: ['bg-gray-300', 'cursor-not-allowed', 'transform-none', 'shadow-none'],
        false: ['bg-gradient-to-br from-[#2B2B2B] to-[#4A4A4A]'],
      },
    },
  },
)

export const scanButtonVariants = cva(
  [
    'w-full',
    'px-6 py-[18px]',

    'text-white',
    'border-none',
    'rounded-xl',
    'text-lg',
    'cursor-pointer',
    'font-normal',
    'transition-all duration-300',
    'font-[var(--font-family-main)]',
    'flex-1',
    'tracking-wide',
    'shadow-[0_4px_16px_rgba(43,43,43,0.2)]',
    'hover:-translate-y-0.5',
    'hover:shadow-[0_6px_24px_rgba(43,43,43,0.3)]',
    'active:translate-y-0',
  ],
  {
    defaultVariants: {
      disabled: false,
    },
    variants: {
      disabled: {
        true: ['bg-gray-300', 'cursor-not-allowed', 'transform-none', 'shadow-none'],
        false: ['bg-gradient-to-br from-[#2B2B2B] to-[#4A4A4A]'],
      },
    },
  },
)

export const removeButtonVariants = cva([
  'w-full',
  'p-[14px]',
  'bg-white',
  'text-[#2B2B2B]',
  'border',
  'border-gray-200',
  'rounded-lg',
  'text-sm',
  'font-light',
  'cursor-pointer',
  'transition-all duration-300',
  'font-[var(--font-family-main)]',
  'hover:bg-gray-50',
  'hover:-translate-y-px',
])

export const buttonContentVariants = cva(['flex', 'items-center', 'justify-center', 'gap-2'])

export const buttonContainerVariants = cva(['flex', 'mb-4', 'flex-col', 'md:flex-row'])

// Image/File styles
export const hiddenInputVariants = cva(['hidden'])

export const imageContainerVariants = cva(['mb-6'])

export const imagePreviewVariants = cva(['relative', 'w-full', 'h-[280px]', 'bg-gray-50', 'rounded-xl', 'overflow-hidden', 'mb-4', 'border', 'border-gray-200', 'md:h-[360px]'])

export const fileInfoTextVariants = cva(['mt-3', 'text-[13px]', 'text-gray-500', 'text-center', 'font-light'])

// Loading styles
export const loadingOverlayVariants = cva(['fixed', 'inset-0', 'bg-white/85', 'backdrop-blur-sm', 'flex', 'flex-col', 'items-center', 'justify-center', 'z-[9999]', 'gap-5'])

export const loadingContentVariants = cva(['text-center', 'text-[#2B2B2B]', 'text-base', 'font-light'])

export const loadingSubtextVariants = cva(['text-sm', 'text-gray-500', 'mt-1', 'font-light'])

// Header styles
export const headerVariants = cva(['text-center flex flex-col items-center justify-center', 'my-8 mb-10'])

export const logoVariants = cva(['h-8', 'w-auto', 'mb-2', 'md:h-10'])

export const headerLineVariants = cva(['w-[60px]', 'h-px', 'bg-[#2B2B2B]', 'mx-auto'])

// Contact section styles
export const contactInfoVariants = cva(['text-center', 'mt-8', 'p-5', 'bg-white', 'rounded-xl', 'shadow-[0_4px_16px_rgba(43,43,43,0.05)]'])

export const contactTextVariants = cva(['text-[15px]', 'text-gray-500', 'mb-2', 'font-light'])

export const contactEmailVariants = cva([
  'text-[#2B2B2B]',
  'no-underline',
  'font-normal',
  'text-base',
  'inline-flex',
  'items-center',
  'gap-2',
  'px-4 py-2',
  'rounded-md',
  'transition-all duration-300',
  'hover:bg-gray-50',
  'hover:-translate-y-px',
])

// Incomplete signers list styles
export const incompleteSignersListVariants = cva(['flex', 'flex-col', 'gap-3', 'mt-3', 'pt-3', 'border-t', 'border-red-200/50'])

export const incompleteSignerItemVariants = cva(['flex', 'flex-col', 'gap-1', 'p-3', 'bg-red-50/50', 'rounded-lg', 'md:flex-row md:justify-between md:items-center md:p-2'])

export const signerNameVariants = cva(['font-semibold', 'text-base', 'text-red-600', 'md:text-[15px]'])

export const missingFieldsVariants = cva(['text-sm', 'text-red-700', 'opacity-80', 'md:text-[13px]'])
