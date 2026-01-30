import React from 'react'
import { clsx } from 'clsx'
import { wrapperVariants, labelVariants, descriptionVariants, type WrapperVariants, type LabelVariants, type DescriptionVariants } from './LabelAndDescription.variants'

export interface Props extends WrapperVariants, LabelVariants, DescriptionVariants {
  title: string
  description?: string | number
  setDescriptionStacked?: boolean
  className?: string
}

const LabelAndDescription = ({ title, description, setDescriptionStacked = false, className }: Props) => {
  if (!title && !setDescriptionStacked) return null

  return (
    <div className={clsx(wrapperVariants(), className)}>
      <div className={clsx(labelVariants())}>{title}</div>
      <div className={clsx(descriptionVariants())}>{description}</div>
    </div>
  )
}

export default LabelAndDescription
