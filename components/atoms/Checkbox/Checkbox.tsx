import React from 'react'
import { checkboxLabelVariants, checkboxInputVariants, checkboxErrorVariants } from './Checkbox.variants'

export type CheckboxProps = {
  color?: 'orange'
  label?: React.ReactNode
  error?: string
  bigger?: boolean
  forceDisabled?: boolean
  ref?: React.Ref<HTMLInputElement>
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

const Checkbox: React.FC<CheckboxProps> = ({ bigger, color, label, error, forceDisabled, ref, ...props }) => {
  const { disabled } = props

  const labelClasses = checkboxLabelVariants({
    disabled: disabled || forceDisabled,
  })

  const inputClasses = checkboxInputVariants({
    bigger,
    color,
    disabled: disabled || forceDisabled,
    forceDisabled,
  })

  const errorClasses = checkboxErrorVariants()

  return (
    <div>
      <label className={labelClasses}>
        <input ref={ref} className={inputClasses} type="checkbox" {...props} />
        {label}
      </label>
      {error && <div className={errorClasses}>{error}</div>}
    </div>
  )
}

export default Checkbox
