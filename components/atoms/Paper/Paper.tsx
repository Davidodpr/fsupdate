import React from 'react'
import { clsx } from 'clsx'
import { paperVariants, type PaperVariants } from './Paper.variants'

export type PaperProps = {
  className?: string
  children?: React.ReactNode
  variant?: PaperVariants['variant']
} & React.HTMLAttributes<HTMLDivElement>

const Paper: React.FC<PaperProps> = ({ className, children, variant, ...props }) => {
  const paperClasses = paperVariants({
    variant,
  })

  return (
    <div className={clsx(paperClasses, className)} {...props}>
      {children}
    </div>
  )
}

export default Paper
