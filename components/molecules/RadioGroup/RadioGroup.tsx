import React from 'react'
import { clsx } from 'clsx'
import * as RadioGroupElement from '@radix-ui/react-radio-group'
import { radioGroupVariants, radioItemVariants, radioIndicatorVariants, radioLabelVariants } from './RadioGroup.variants'

// Root RadioGroup component
export const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupElement.Root>, React.ComponentPropsWithoutRef<typeof RadioGroupElement.Root>>(
  ({ className, ...props }, ref) => <RadioGroupElement.Root ref={ref} className={clsx(radioGroupVariants(), className)} {...props} />,
)
RadioGroup.displayName = 'RadioGroup'

// RadioItem component
export const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupElement.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupElement.Item> & {
    whiteMain?: boolean
    MoveDownItem?: boolean
  }
>(({ className, whiteMain = false, MoveDownItem = false, ...props }, ref) => (
  <RadioGroupElement.Item
    ref={ref}
    className={clsx(
      radioItemVariants({
        whiteMain,
        MoveDownItem,
      }),
      className,
    )}
    {...props}
  />
))
RadioItem.displayName = 'RadioItem'

// RadioIndicator component
export const RadioIndicator = React.forwardRef<
  React.ElementRef<typeof RadioGroupElement.Indicator>,
  React.ComponentPropsWithoutRef<typeof RadioGroupElement.Indicator> & {
    whiteMain?: boolean
  }
>(({ className, whiteMain = false, ...props }, ref) => (
  <RadioGroupElement.Indicator
    ref={ref}
    className={clsx(
      radioIndicatorVariants({
        whiteMain,
      }),
      className,
    )}
    {...props}
  />
))
RadioIndicator.displayName = 'RadioIndicator'

// Label component
export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(({ className, ...props }, ref) => (
  <label ref={ref} className={clsx(radioLabelVariants(), className)} {...props} />
))
Label.displayName = 'Label'
