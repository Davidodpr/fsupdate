import { cva } from 'class-variance-authority'

export const dayPickerWrapperVariants = cva([
  // Remove all styling since the DatePicker component handles it
])

export const wrapperVariants = cva(
  [
    // Remove all styling since the DatePicker component handles it internally
  ],
  {
    variants: {
      hasSelectedDay: {
        true: [],
      },
      isEnglish: {
        true: [],
      },
    },
  },
)
