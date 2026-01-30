import React from 'react'
import { clsx } from 'clsx'
import { useCombobox } from 'downshift'
import Input from '@/components/atoms/Input'
import { wrapperVariants, menuVariants, itemVariants } from './CustomAutoComplete.variants'

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
  inputRef?: React.Ref<HTMLInputElement>
}

export const Autocomplete: React.FC<AutoSelectProps> = (props) => {
  const { items, label, placeholder, onChange, onSelect, className, name, value, endIcon, error, noLastLink, dataTestId, inputRef } = props

  const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps, setHighlightedIndex, closeMenu, openMenu } = useCombobox({
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

  const inputPropsValues = {
    ref: inputRef,
    name,
    label,
    placeholder,
  }

  return (
    <div className={clsx(wrapperVariants(), className)}>
      <div {...getComboboxProps()}>
        <Input
          {...getInputProps(inputPropsValues)}
          onFocus={() => {
            if (!isOpen && items.length > 0) {
              openMenu()
            }
          }}
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
      <ul {...getMenuProps()} className={menuVariants()}>
        {isOpen &&
          items.map((item, index) => {
            return (
              <li className={itemVariants({ highlighted: highlightedIndex === index })} key={`${item}${index}`} {...getItemProps({ item, index })}>
                {item.label}
              </li>
            )
          })}
      </ul>
    </div>
  )
}
