import React from 'react'
import { clsx } from 'clsx'
import { h2Variants, type H2Variants } from './H2.variants'

export interface H2Props extends React.HTMLAttributes<HTMLHeadingElement>, H2Variants {
  children: React.ReactNode
}

const H2 = React.forwardRef<HTMLHeadingElement, H2Props>(({ children, className, textAlign, ...props }, ref) => {
  const h2Classes = h2Variants({
    textAlign,
  })

  return (
    <h2 ref={ref} className={clsx(h2Classes, className)} {...props}>
      {children}
    </h2>
  )
})

H2.displayName = 'H2'

export default H2
