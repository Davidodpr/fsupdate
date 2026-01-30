import { cva, type VariantProps } from 'class-variance-authority'

export const missingInfoModalWrapperVariants = cva(['text-[var(--font-size-2)]'])

export const missingInfoTextVariants = cva(['text-[var(--color-text-main)]'])

export const datePickerWrapperVariants = cva(['w-full'])

export const dayPickerWrapperVariants = cva([
  'w-full',
  'min-h-[290px]',
  'h-auto',
  'bg-white',
  'flex',
  'flex-col',
  'items-center',
  'z-[2]',
  'rounded-t-[var(--border-radius-main)]',
  'mb-2',
])

export const wrapperVariants = cva(['w-full', 'max-w-full', 'relative'], {
  variants: {
    isEnglish: {
      true: '[&_.DayPicker-Weekday:first-of-type::before]:content-["w"]',
    },
  },
  defaultVariants: {
    isEnglish: false,
  },
})

// Add default content for Swedish (first weekday)
export const wrapperDefaultVariants = cva(['[&_.DayPicker-Weekday:first-of-type::before]:content-["v"]'])

export const missingInfoAddressFormVariants = cva(['mb-2', '[&_.inputDiv]:mb-[45px]', '[&_.streetNumber]:w-[40%]', '[&_.street]:mb-8'])

export const dividerVariants = cva(['mt-[5px]', 'h-0', 'border', 'border-[var(--color-settings-border)]', 'mb-5'])

export const infoMissingTitleVariants = cva(['font-bold', 'text-[var(--color-text-main)]', 'text-[var(--font-size-5)]', 'm-0', 'ml-[5px]'])

export const stepperVariants = cva(['h-[2px]', 'bg-[var(--color-tertiary-main)]', 'transition-[width]', 'duration-500', 'mt-[15px]'])

export const buttonWrapperVariants = cva(['w-[48%]', 'h-12', 'mt-[10px]'])

export const buttonsWrapperVariants = cva(['flex', 'w-full', 'justify-between'])

export const livingSelectionVariants = cva(['w-full', 'flex', 'justify-center', 'items-center', 'flex-col', 'px-0', 'py-0', 'pb-10', '[&_p]:mt-0'])

export const livingSelectionButtonWrapperVariants = cva(
  [
    'w-full',
    'h-[34px]',
    'rounded-[var(--border-radius-radio)]',
    'text-xs',
    'font-medium',
    'relative',
    'bg-[var(--color-gray)]',
    'text-[var(--color-black-main)]',
    'flex',
    'items-center',
    'justify-center',
    'hover:cursor-pointer',
  ],
  {
    variants: {
      selected: {
        true: 'bg-[var(--color-primary-main)] text-white',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
)

export const residenceSizeVariants = cva(['mb-[60px]', 'w-[100px]'])

export const inputWrapperVariants = cva(['w-[49%]'])

export const questionIconWrapperVariants = cva([
  'w-6',
  'h-6',
  'text-[var(--color-question-icon-color)]',
  'text-[15px]',
  'hover:cursor-pointer',
  '[&_svg]:text-[var(--color-question-icon-color)]',
  '[&_svg_path]:text-[var(--color-question-icon-color)]',
])

export const popupWrapperVariants = cva(['text-[15px]'])

export type MissingInfoModalWrapperVariants = VariantProps<typeof missingInfoModalWrapperVariants>
export type MissingInfoTextVariants = VariantProps<typeof missingInfoTextVariants>
export type DatePickerWrapperVariants = VariantProps<typeof datePickerWrapperVariants>
export type DayPickerWrapperVariants = VariantProps<typeof dayPickerWrapperVariants>
export type WrapperVariants = VariantProps<typeof wrapperVariants>
export type MissingInfoAddressFormVariants = VariantProps<typeof missingInfoAddressFormVariants>
export type DividerVariants = VariantProps<typeof dividerVariants>
export type InfoMissingTitleVariants = VariantProps<typeof infoMissingTitleVariants>
export type StepperVariants = VariantProps<typeof stepperVariants>
export type ButtonWrapperVariants = VariantProps<typeof buttonWrapperVariants>
export type ButtonsWrapperVariants = VariantProps<typeof buttonsWrapperVariants>
export type LivingSelectionVariants = VariantProps<typeof livingSelectionVariants>
export type LivingSelectionButtonWrapperVariants = VariantProps<typeof livingSelectionButtonWrapperVariants>
export type ResidenceSizeVariants = VariantProps<typeof residenceSizeVariants>
export type InputWrapperVariants = VariantProps<typeof inputWrapperVariants>
export type QuestionIconWrapperVariants = VariantProps<typeof questionIconWrapperVariants>
export type PopupWrapperVariants = VariantProps<typeof popupWrapperVariants>
