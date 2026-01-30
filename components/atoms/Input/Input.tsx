import React, { useEffect, useRef, useState, KeyboardEvent, ComponentPropsWithoutRef } from 'react'
import { clsx } from 'clsx'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { mergeRefs } from '@/common/helpers/mergeRefs'
import { inputWrapperVariants, inputVariants, labelVariants, startAdornmentVariants, endIconVariants, errorTextVariants } from './Input.variants'

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type'> {
  label?: string
  type: 'text' | 'number' | 'numberWithValidation'
  error?: string
  withCursorPositionUpdate?: boolean
  pattern?: string
  endIcon?: React.ReactNode
  placeholder?: string
  maxLength?: number
  startAdornment?: React.ReactNode
  alwaysActiveLabel?: boolean
  handleKeypress?: (e: KeyboardEvent<HTMLInputElement>) => void
  inputRef?: React.Ref<HTMLInputElement>
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type,
      error,
      endIcon,
      startAdornment,
      alwaysActiveLabel = false,
      maxLength,
      onChange,
      withCursorPositionUpdate = false,
      handleKeypress,
      pattern,
      inputRef,
      className,
      value,
      defaultValue,
      id,
      name,
      ...props
    },
    ref,
  ) => {
    const { theme } = useThemeContext()
    const [cursor, setCursor] = useState<number | null>(null)
    const internalRef = useRef<HTMLInputElement>(null)
    const mergedRef = mergeRefs([internalRef, ...(ref ? [ref] : []), ...(inputRef ? [inputRef] : [])])
    const [internalValue, setInternalValue] = useState<string | number | undefined>()

    // Handle adding/removing 'has-value' class based on input value
    useEffect(() => {
      const refCurrent = internalRef.current
      const fn = (e: Event) => {
        const target = e.target as HTMLInputElement
        if (target?.value) {
          target.classList.add('has-value')
        } else {
          target.classList.remove('has-value')
        }
      }
      refCurrent?.addEventListener('change', fn)
      return () => refCurrent?.removeEventListener('change', fn)
    }, [])

    // Handle cursor position updates for formatted inputs
    useEffect(() => {
      if (withCursorPositionUpdate) {
        const input = internalRef.current
        if (input) input.setSelectionRange(cursor, cursor)
      }
    }, [cursor, value, withCursorPositionUpdate])

    // Determine variant states
    const isFB = theme === ThemeEnum.FASTIGHETSBYRAN
    const hasError = !!error
    const hasStartAdornment = !!startAdornment

    // Generate class names using CVA
    const wrapperClasses = inputWrapperVariants()

    const inputClasses = inputVariants({
      hasError: hasError && !isFB,
      isFBError: hasError && isFB,
      isApartment: hasStartAdornment,
      isFB,
    })

    const labelClasses = labelVariants({
      hasError: hasError && !isFB,
      isFB,
      isApartment: hasStartAdornment,
      alwaysActive: alwaysActiveLabel,
    })
    const startAdornmentClasses = startAdornmentVariants({ isFB })
    const endIconClasses = endIconVariants()
    const errorTextClasses = errorTextVariants()

    // Determine input type and attributes
    const inputType = type === 'numberWithValidation' ? 'tel' : type
    const inputPattern = pattern ?? (type === 'numberWithValidation' ? 'd*' : undefined)
    const inputMaxLength = type === 'numberWithValidation' && maxLength ? maxLength : undefined

    // Determine if input has value for initial class application
    const hasValue = value || defaultValue || defaultValue === 0 || internalValue

    return (
      <div className={wrapperClasses}>
        {startAdornment && <div className={startAdornmentClasses}>{startAdornment}</div>}

        <input
          ref={mergedRef}
          id={id || name}
          data-testid={id || name}
          type={inputType}
          pattern={inputPattern}
          maxLength={inputMaxLength}
          placeholder=" " // Using a space as the placeholder is a CSS trick to enable the floating label effect.
          role="textbox"
          value={value}
          defaultValue={defaultValue}
          className={clsx(inputClasses, hasValue ? 'has-value' : null, 'peer', className)}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeypress && handleKeypress(e)}
          onChange={(e) => {
            setCursor(e.target.selectionStart)
            onChange && onChange(e)
            setInternalValue(e.target.value)
          }}
          {...props}
        />

        {label && (
          <label className={clsx(labelClasses, 'label')} htmlFor={id || name} title={label}>
            <span id={label} className="block w-full overflow-hidden text-ellipsis whitespace-nowrap">
              {label}
            </span>
          </label>
        )}

        {endIcon && <div className={endIconClasses}>{endIcon}</div>}

        {error && <div className={errorTextClasses}>{error}</div>}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
