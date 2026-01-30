import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { DayPicker, DayModifiers } from 'react-day-picker'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import { sv, enGB } from 'date-fns/locale'
import { ShortLocale } from '@/common/enums/LocaleEnum'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import Button from '@/components/atoms/Button'
import CustomDropdown from '@/components/organisms/DatePicker/CustomDropdown'

interface MobileDatePickerProps {
  defaultValue?: Date
  onDateSelect: (date: Date) => void
  onClose: () => void
}

const MobileDatePicker = ({ defaultValue, onDateSelect, onClose }: MobileDatePickerProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(defaultValue)
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { t, i18n } = useTranslation('common')
  const locale = i18n.language
  const { theme } = useThemeContext()

  useEffect(() => {
    setIsMounted(true)
    // Trigger animation after mount
    setTimeout(() => {
      setIsVisible(true)
    }, 10)
  }, [])

  const handleDayClick = (day: Date, modifiers: DayModifiers) => {
    if (modifiers.disabled || modifiers.past) {
      return
    }
    setSelectedDay(day)
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleSave = () => {
    if (selectedDay) {
      onDateSelect(selectedDay)
      setIsVisible(false)
      setTimeout(() => {
        onClose()
      }, 300)
    }
  }

  if (!isMounted) return null

  return ReactDOM.createPortal(
    <>
      <div
        className={clsx(
          "fixed inset-0 z-40 transition-opacity duration-300",
          isVisible ? "bg-black/30" : "bg-black/0"
        )}
        onClick={handleClose}
      />
      <div
        className={clsx(
          'fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-[var(--radius-border-radius-main)] shadow-[0px_-8px_40px_0px_rgba(0,0,0,0.2)]',
          'transition-transform duration-300 ease-in-out',
          'max-h-[80vh] overflow-auto',
          'flex flex-col items-center',
          'px-4 pt-4'
        )}
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        <DayPicker
          mode="single"
          defaultMonth={selectedDay || new Date()}
          locale={locale === ShortLocale.EN ? enGB : sv}
          captionLayout="dropdown-buttons"
          weekStartsOn={1}
          fromYear={new Date().getFullYear()}
          toYear={new Date().getFullYear() + 1}
          required
          fromMonth={new Date()}
          formatters={{ formatWeekdayName: (weekdayName) => weekdayName?.toLocaleDateString(locale, { weekday: 'long' })?.slice(0, 3) }}
          fixedWeeks
          components={{
            Dropdown: CustomDropdown,
          }}
          selected={selectedDay}
          onDayClick={handleDayClick}
          disabled={[{ before: new Date() }]}
        />
        <div className="flex gap-4 p-4 w-full">
          <div className="flex-1">
            <Button
              variant={theme === ThemeEnum.FASTIGHETSBYRAN ? 'fb' : 'outline'}
              withFullWidth
              onClick={handleClose}
              text={t('cancel')}
            />
          </div>
          <div className="flex-1">
            <Button
              withFullWidth
              onClick={handleSave}
              text={t('choose')}
            />
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}

export default MobileDatePicker