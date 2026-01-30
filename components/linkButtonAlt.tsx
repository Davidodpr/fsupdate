import React, { ReactNode } from 'react'
import { clsx } from 'clsx'
import { linkButtonAltVariants } from './linkButtonAlt.variants'

type LinkButtonAltProps = {
  noUnderline?: boolean
  children?: ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const LinkButtonAlt = React.forwardRef<HTMLButtonElement, LinkButtonAltProps>(({ noUnderline, children, className, ...props }, ref) => {
  const buttonClasses = linkButtonAltVariants({
    noUnderline,
    isDisabled: props.disabled,
  })

  return (
    <button className={clsx(buttonClasses, className)} ref={ref} {...props}>
      {children}
    </button>
  )
})

LinkButtonAlt.displayName = 'LinkButtonAlt'

export default LinkButtonAlt
