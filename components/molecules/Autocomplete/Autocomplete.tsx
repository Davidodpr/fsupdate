'use client'

import React from 'react'
import { clsx } from 'clsx'
import { useCombobox } from 'downshift'
import Input from '@/components/atoms/Input'
import { autocompleteVariants } from './Autocomplete.variants'


type AutoSelectProps = {
  items: { value: string; label: string }[]
  label: string
  placeholder?: string
  onChange: (value: string | undefined) => void
  onSelect: (value: string) => void
  className?: string
  name?: string
  value?: string | null
  endIcon?: React.ReactNode
  noLastLink?: boolean
  error?: string
  dataTestId?: string
  ref?: React.Ref<HTMLInputElement>
  autoComplete?: string
}

export const Autocomplete: React.FC<AutoSelectProps> = (props) => {
  const { items, label, placeholder, onChange, onSelect, className, name, value, endIcon, error, noLastLink, dataTestId, ref, autoComplete } = props
  const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps, setHighlightedIndex, closeMenu } = useCombobox({
    items: items,
    itemToString(item) {
      return item ? item.label : ''
    },
    inputValue: value || '',
    onInputValueChange: (changes) => {
      onChange(changes.inputValue)
    },
    onSelectedItemChange: (changes) => {
      onSelect(changes.selectedItem?.value || '')
    },
  })

  const variants = autocompleteVariants()
  const inputPropsValues = {
    ref,
    name,
    label,
    placeholder,
    autoComplete,
    'data-lpignore': 'true',
    'data-form-type': 'other',
    'data-1p-ignore': 'true',
  }

  return (
    <div className={clsx(variants.wrapper(), className)}>
      <div {...getComboboxProps()}>
        <Input
          {...getInputProps(inputPropsValues)}
          onKeyDown={(event) => {
            // Allow native browser behavior for selection shortcuts and delete operations
            if (event.metaKey || event.ctrlKey) {
              return
            }

            // Handle delete/backspace when text is selected
            if ((event.key === 'Delete' || event.key === 'Backspace') && event.currentTarget.selectionStart !== event.currentTarget.selectionEnd) {
              // Let the browser handle deletion of selected text
              return
            }

            switch (event.key) {
              case 'Tab': {
                event.preventDefault()
                if (highlightedIndex < items.length - 1) {
                  setHighlightedIndex(highlightedIndex + 1)
                } else {
                  setHighlightedIndex(0)
                }
                break
              }
              case 'Enter': {
                event.preventDefault()
                if (items && highlightedIndex >= 0 && highlightedIndex < items.length && items.length) {
                  onSelect(items[highlightedIndex].value)
                  // Blur the input to close the keyboard on mobile
                  event.currentTarget.blur()
                }
                closeMenu()
                break
              }
              default:
                break
            }
          }}
          data-testid={dataTestId}
          withCursorPositionUpdate
          endIcon={endIcon}
          error={error}
        />
      </div>
      <ul className={variants.menu()} {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => {
            return (
              <li
                className={variants.item({
                  active: highlightedIndex === index,
                  noHits: item.value === 'noHits',
                  noLastLink,
                })}
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                {item.label}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
