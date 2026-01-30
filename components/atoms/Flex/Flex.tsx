import React from 'react'
import { clsx } from 'clsx'
import { flexVariants, type FlexVariants } from './Flex.variants'

export interface FlexProps extends FlexVariants {
  children?: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
  style?: React.CSSProperties
  'data-testid'?: string
  id?: string
  as?: React.ElementType
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      children,
      className,
      display,
      direction,
      justifyContent,
      justifyItems,
      justifySelf,
      alignContent,
      alignItems,
      alignSelf,
      wrap,
      gap,
      flex,
      fullWidth,
      fullHeight,
      responsiveDirection,
      responsiveAlignItems,
      responsiveJustifyContent,
      as: Component = 'div',
      ...props
    },
    ref,
  ) => {
    const flexClasses = flexVariants({
      display,
      direction,
      justifyContent,
      justifyItems,
      justifySelf,
      alignContent,
      alignItems,
      alignSelf,
      wrap,
      gap,
      flex,
      fullWidth,
      fullHeight,
      responsiveDirection,
      responsiveAlignItems,
      responsiveJustifyContent,
    })

    return (
      <Component ref={ref} className={clsx(flexClasses, className)} {...props}>
        {children}
      </Component>
    )
  },
)

Flex.displayName = 'Flex'

export default Flex
