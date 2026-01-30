import React from 'react'
import { clsx } from 'clsx'
import { textAreaWrapperVariants, textAreaVariants, textAreaLabelVariants, textAreaIconVariants, textAreaErrorVariants } from './TextArea.variants'

export type TextAreaProps = {
  label?: string
  error?: string
  endIcon?: React.ReactNode
  withLessHeight?: boolean
  ref?: React.Ref<HTMLTextAreaElement>
  className?: string
} & Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'type'>

const TextArea: React.FC<TextAreaProps> = ({ label, error, endIcon, withLessHeight, ref, className, value, ...props }) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const [localValue, setLocalValue] = React.useState(value || '')
  const [isFocused, setIsFocused] = React.useState(false)

  React.useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value)
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalValue(e.target.value)
    props.onChange?.(e)
  }

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false)
    props.onBlur?.(e)
  }

  const hasValue = !!localValue
  const isActive = hasValue || isFocused

  const wrapperClasses = textAreaWrapperVariants()
  const textAreaClasses = textAreaVariants({
    withLessHeight,
    hasValue: isActive,
    error: !!error,
  })
  const labelClasses = textAreaLabelVariants({
    withLessHeight,
    isActive,
    isFocused,
    error: !!error,
  })
  const iconClasses = textAreaIconVariants()
  const errorClasses = textAreaErrorVariants()

  return (
    <div className={clsx(wrapperClasses, className)}>
      <textarea
        className={textAreaClasses}
        ref={ref || textareaRef}
        value={localValue}
        placeholder=" " // Using a space as the placeholder is a CSS trick to enable the floating label effect.
        {...props}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {label && (
        <label className={clsx(labelClasses)}>
          <span>{label}</span>
        </label>
      )}
      {endIcon && <div className={iconClasses}>{endIcon}</div>}
      {error && <div className={errorClasses}>{error}</div>}
    </div>
  )
}

export default TextArea
