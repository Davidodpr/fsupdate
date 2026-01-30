import React from 'react'
import { clsx } from 'clsx'
import { h3Variants, type H3Variants } from './H3.variants'

export interface H3Props extends React.HTMLAttributes<HTMLHeadingElement>, H3Variants {
  children: React.ReactNode
}

const H3 = React.forwardRef<HTMLHeadingElement, H3Props>(({ children, className, textAlign, ...props }, ref) => {
  const h3Classes = h3Variants({
    textAlign,
  })

  return (
    <h3 ref={ref} className={clsx(h3Classes, className)} {...props}>
      {children}
    </h3>
  )
})

H3.displayName = 'H3'

export default H3
