import React from 'react'
import { clsx } from 'clsx'
import { textVariants, type TextVariants } from './Text.variants'

// Define the props interface with polymorphic support
export interface TextProps extends TextVariants {
  // Allow custom element type (p, span, div, etc.)
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label'
  // Children can be any React content
  children?: React.ReactNode
  // Common HTML attributes
  className?: string
  style?: React.CSSProperties
  id?: string
  'data-testid'?: string
  onClick?: React.MouseEventHandler<HTMLElement>
}

const Text = React.forwardRef<HTMLElement, TextProps>(({ as: Component = 'p', variant, textAlign, spacing, className, children, ...props }, ref) => {
  const textClasses = textVariants({
    variant,
    textAlign,
    spacing,
  })

  return (
    <Component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={clsx(
        textClasses,
        // Handle the special .orange class from the original component
        // This would need to be applied via className if needed
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
})

Text.displayName = 'Text'

export default Text
