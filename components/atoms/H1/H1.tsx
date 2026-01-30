import React from 'react'
import { clsx } from 'clsx'
import { h1Variants, type H1Variants } from './H1.variants'

export interface H1Props extends React.HTMLAttributes<HTMLHeadingElement>, H1Variants {
  children: React.ReactNode
}

const H1 = React.forwardRef<HTMLHeadingElement, H1Props>(({ children, className, textAlign, ...props }, ref) => {
  const h1Classes = h1Variants({
    textAlign,
  })

  return (
    <h1 ref={ref} className={clsx(h1Classes, className)} {...props}>
      {children}
    </h1>
  )
})

H1.displayName = 'H1'

export default H1
