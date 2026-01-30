import React, { ReactElement, useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import { DayPicker, DayModifiers } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { useTranslation } from 'react-i18next'
import { useClickAway } from 'react-use'
import { clsx } from 'clsx'
import { sv, enGB } from 'date-fns/locale'
import Image from 'next/image'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ShortLocale } from '@/common/enums/LocaleEnum'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Popup from '@/components/molecules/PopupNew'
import CustomDropdown from './CustomDropdown'

export interface DatePickerProps {
  placeholder?: string
  setDatePicked?: (arg0: DatePickerDates) => void
  withoutDayInDate?: boolean
  disabled?: boolean
  disableNextWeek?: boolean
  customPrefix?: string
  defaultValue?: Date
  disabledToday?: Date[]
  disableFutureDates?: Date
  disablePastDates?: boolean
  positionBottom?: boolean
  withoutWeekends?: boolean
  highlighted?: Record<string, Date>
  infoContent?: ReactElement
  withoutCalendarIcon?: boolean
  onlyCalendar?: boolean
  noSpacing?: boolean
  customDateComponent?: ReactElement
  customOnClose?: () => void
  parentSelectedDay?: Date
  parentDefaultMonth?: Date
  withParentWidth?: boolean
  warningDates?: Date[]
  forceOpen?: boolean
  hideInput?: boolean
}

const DatePicker = ({
  placeholder = 'Datum',
  setDatePicked,
  withoutDayInDate,
  disabled = false,
  disableNextWeek = false,
  disablePastDates = true,
  disabledToday = [],
  customPrefix,
  defaultValue,
  disableFutureDates,
  positionBottom = false,
  withoutWeekends = false,
  highlighted,
  infoContent,
  withoutCalendarIcon = true,
  onlyCalendar = false,
  customDateComponent,
  noSpacing,
  customOnClose,
  parentSelectedDay,
  parentDefaultMonth,
  withParentWidth,
  warningDates = [],
  forceOpen = false,
  hideInput = false,
}: DatePickerProps) => {
  const { t, i18n } = useTranslation('common')
  const locale = i18n.language
  const [selectedDay, setSelectedDay] = useState<undefined | Date>(undefined)
  const [lockedInDay, setLockedInDay] = useState<undefined | Date>(undefined)
  const { theme, iconSet } = useThemeContext()
  const [hasSetDefaultValue, setHasSetDefaultValue] = useState(false)
  const [pickerVisible, setPickerVisible] = useState(forceOpen || false)
  const [isMounted, setIsMounted] = useState(false)
  const { isTabletPortraitOrGreater } = useResponsive()
  const withButtons = !isTabletPortraitOrGreater
  const ref = useRef<HTMLDivElement>(null)

  // Only use click away on desktop/tablet, and not when forceOpen is true
  useClickAway(ref, () => {
    if (isTabletPortraitOrGreater && !forceOpen) {
      customOnClose && customOnClose()
      setPickerVisible(false)
      setSelectedDay(lockedInDay)
    }
  })

  useEffect(() => {
    setIsMounted(true)
    // If forceOpen is true, show picker immediately on mount
    if (forceOpen) {
      setPickerVisible(true)
    }
  }, [])

  useEffect(() => {
    if (!isTabletPortraitOrGreater && typeof window !== 'undefined' && pickerVisible) {
      const intercomApp = document.querySelector('.intercom-lightweight-app')
      intercomApp?.setAttribute('style', 'display: none')
    } else if (!pickerVisible && !isTabletPortraitOrGreater && typeof window !== 'undefined') {
      const intercomApp = document.querySelector('.intercom-lightweight-app')
      intercomApp?.setAttribute('style', 'display: block')
    }
  }, [isTabletPortraitOrGreater, pickerVisible])

  useEffect(() => {
    if (
      hasSetDefaultValue &&
      parentSelectedDay &&
      isTabletPortraitOrGreater &&
      parentSelectedDay?.toLocaleDateString(locale, {
        month: 'long',
        day: 'numeric',
      }) !==
        selectedDay?.toLocaleDateString(locale, {
          month: 'long',
          day: 'numeric',
        })
    )
      setSelectedDay(parentSelectedDay)
  }, [parentSelectedDay, hasSetDefaultValue, selectedDay, locale, isTabletPortraitOrGreater])

  useEffect(() => {
    if (disableNextWeek) {
      const firstDay = new Date()
      const nextWeek = new Date(firstDay.getTime() + 7 * 24 * 60 * 60 * 1000)
      setSelectedDay(nextWeek)
      setLockedInDay(selectedDay)
    }
  }, [disableNextWeek, selectedDay])

  const handleDayClick = (day: Date, modifiers: DayModifiers) => {
    if (modifiers.disabled || modifiers.past || modifiers.selected) {
      return
    }
    setSelectedDay(modifiers.selected ? undefined : day)
    if (!withButtons) {
      handleSaveDate(day)
    }
  }
  const handleSaveDate = (day?: Date) => {
    const dayToSave = day ? day : selectedDay
    // Always close the picker
    setPickerVisible(false)
    setLockedInDay(dayToSave)
    if (setDatePicked && dayToSave)
      setDatePicked({
        day: `${Intl.DateTimeFormat(locale, { weekday: 'long' }).format(dayToSave)}`,
        date: `${dayToSave?.toLocaleDateString(locale, {
          month: 'long',
          day: 'numeric',
        })}`,
        fullDate: `${dayToSave?.toLocaleDateString(locale)}`,
        isoDate: dayToSave.toISOString().split('T')?.[0],
      })
  }
  const past = {
    before: new Date(),
    after: disableFutureDates,
  }

  useEffect(() => {
    if (defaultValue && !hasSetDefaultValue) {
      setSelectedDay(defaultValue)
      setDatePicked &&
        setDatePicked({
          day: `${Intl.DateTimeFormat(locale, { weekday: 'long' }).format(defaultValue)}`,
          date: `${defaultValue?.toLocaleDateString(locale, {
            month: 'long',
            day: 'numeric',
          })}`,
          fullDate: `${defaultValue?.toLocaleDateString(locale)}`,
          isoDate: defaultValue.toISOString().split('T')?.[0],
        })
      setHasSetDefaultValue(true)
    }
  }, [defaultValue, locale, setDatePicked, hasSetDefaultValue])

  const getDateToDisplay = () => {
    if (lockedInDay && !withoutDayInDate) {
      return `${lockedInDay?.toLocaleDateString(locale)} (${Intl.DateTimeFormat(locale, { weekday: 'long' }).format(lockedInDay).toLowerCase()}${
        locale === ShortLocale.SV ? 'ar' : 's'
      })`
    } else if (lockedInDay && customPrefix) {
      return `${customPrefix} ${lockedInDay?.toLocaleDateString(locale)}`
    } else if (lockedInDay && withoutDayInDate) {
      return `${lockedInDay?.toLocaleDateString(locale)}`
    } else if (defaultValue) return defaultValue?.toLocaleDateString(locale)
    return ''
  }

  const disableWeekends = { dayOfWeek: [6, 0] }
  let disabledDays
  let disabledNextWeek

  if (disablePastDates) {
    disabledDays = [{ before: new Date() }, ...disabledToday]
  } else if (disableNextWeek) {
    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 6)
    disabledNextWeek = { from: new Date(), to: nextWeek }
    if (withoutWeekends) disabledDays = [disableWeekends, disabledNextWeek]
    else disabledDays = [disabledNextWeek]
  } else if (disabledToday?.length > 0) {
    if (withoutWeekends) disabledDays = [disableWeekends, ...disabledToday]
    else disabledDays = [...disabledToday]
  } else {
    if (withoutWeekends) disabledDays = [disableWeekends]
  }

  const modifiers = {
    past: [past, ...disabledToday],
    ...(disabledNextWeek && disabledNextWeek),
    ...(highlighted && { firstHighlighted: highlighted.from, lastHighlighted: highlighted.to }),
    ...(highlighted && { highlighted: { from: highlighted.from, to: highlighted.to } }),
    ...(warningDates && warningDates.length > 0 && { warning: warningDates }),
  }

  useEffect(() => {
    if (pickerVisible && !isTabletPortraitOrGreater) document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [pickerVisible, isTabletPortraitOrGreater])

  if (onlyCalendar)
    return (
      <>
        <style jsx global>{`
          .calendar-only-wrapper {
            background: white !important;
            padding: 16px !important;
            border-radius: 10px !important;
            box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.15) !important;
            width: 100% !important;
            min-height: 290px !important;
            position: relative !important;
          }

          /* Fix for year dropdown positioning and styling */
          .rdp-dropdown_year {
            position: relative !important;
            display: inline-flex !important;
            align-items: center !important;
            min-width: fit-content !important;
            cursor: pointer !important;
          }

          .rdp-dropdown_year .rdp-caption_label {
            display: flex !important;
            align-items: center !important;
            line-height: 1 !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            color: #214766 !important;
            padding-right: 4px !important;
          }

          .rdp_caption_label .rdp-dropdown_icon {
            display: inline-block !important;
            vertical-align: middle !important;
            width: 10px !important;
            height: 10px !important;
            color: #214766 !important;
            margin: 0 !important;
            margin-left: 8px !important;
          }

          .rdp-dropdown_year:hover .rdp-caption_label {
            color: #51c8b4 !important;
          }

          .rdp-dropdown_year:hover .rdp-dropdown_icon {
            color: #51c8b4 !important;
          }

          .calendar-only-wrapper .rdp {
            --rdp-cell-size: 40px;
            --rdp-accent-color: #51c8b4;
            --rdp-background-color: #51c8b4;
            font-family: inherit;
            width: 100%;
          }

          .calendar-only-wrapper .rdp-months {
            display: flex;
            width: 100%;
          }

          .calendar-only-wrapper .rdp-month {
            margin: 0;
            width: 100%;
          }

          .calendar-only-wrapper .rdp-table {
            width: 100%;
            max-width: unset;
            border-spacing: 2px;
          }

          .calendar-only-wrapper .rdp-caption {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0 16px 0;
            margin-bottom: 8px;
            position: relative;
          }

          .calendar-only-wrapper .rdp-caption_label {
            font-size: 16px;
            font-weight: 600;
            color: #214766;
          }

          .calendar-only-wrapper .rdp-nav {
            display: flex;
            gap: 8px;
          }

          .calendar-only-wrapper .rdp-nav_button {
            width: 28px;
            height: 28px;
            background: transparent;
            border: 1px solid #eeeef0;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #214766;
          }

          .calendar-only-wrapper .rdp-nav_button:hover {
            background-color: #f2f2ef;
          }

          .calendar-only-wrapper .rdp-head_cell {
            color: #214766;
            font-weight: 500;
            font-size: 14px;
            padding: 8px;
            text-align: center;
          }

          .calendar-only-wrapper .rdp-cell {
            padding: 2px;
            text-align: center;
          }

          .calendar-only-wrapper .rdp-button,
          .calendar-only-wrapper .rdp-day {
            width: 36px;
            height: 36px;
            margin: auto;
            border-radius: 50%;
            border: none;
            background: transparent;
            font-size: 14px;
            font-weight: 400;
            color: #214766;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .calendar-only-wrapper .rdp-button:hover:not([disabled]):not(.rdp-day_selected):not(.highlighted):not(.fh):not(.lh),
          .calendar-only-wrapper .rdp-day:hover:not([disabled]):not(.rdp-day_selected):not(.highlighted):not(.fh):not(.lh) {
            background-color: #f2f2ef !important;
          }

          .calendar-only-wrapper .rdp-day_selected:not([disabled]) {
            background-color: #51c8b4 !important;
            color: white !important;
            font-weight: 600 !important;
          }

          .calendar-only-wrapper .rdp-day_today:not(.rdp-day_selected) {
            font-weight: 600;
            position: relative;
            background: transparent;
          }

          .calendar-only-wrapper .rdp-day_today:not(.rdp-day_selected)::after {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            right: 2px;
            bottom: 2px;
            border: 2px solid #214766;
            border-radius: 50%;
            pointer-events: none;
          }

          .calendar-only-wrapper .rdp-day_disabled {
            color: #bebec0 !important;
            opacity: 0.5 !important;
            cursor: not-allowed !important;
          }

          .calendar-only-wrapper .rdp-dropdown_year {
            position: relative;
            display: inline-flex;
            align-items: center;
            min-width: 60px;
          }

          .calendar-only-wrapper .rdp-caption_label {
            position: relative;
            z-index: 1;
          }

          .calendar-only-wrapper .rdp-day_disabled:hover {
            background: transparent !important;
          }

          .calendar-only-wrapper .rdp-day_outside {
            color: #bebec0 !important;
            opacity: 0.5 !important;
          }

          /* Highlighted dates (yellow ring for week) */
          .calendar-only-wrapper .highlighted:not(.rdp-day_selected) {
            position: relative;
          }

          .calendar-only-wrapper .highlighted:not(.rdp-day_selected)::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 2px solid #fff5d3;
            border-radius: 50%;
            pointer-events: none;
          }

          .calendar-only-wrapper .fh:not(.rdp-day_selected) {
            position: relative;
          }

          .calendar-only-wrapper .fh:not(.rdp-day_selected)::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 2px solid #fff5d3;
            border-radius: 50%;
            pointer-events: none;
          }

          .calendar-only-wrapper .lh:not(.rdp-day_selected) {
            position: relative;
          }

          .calendar-only-wrapper .lh:not(.rdp-day_selected)::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 2px solid #fff5d3;
            border-radius: 50%;
            pointer-events: none;
          }

          /* Selected date within highlighted range - light orange background */
          .calendar-only-wrapper .rdp-day_selected.highlighted,
          .calendar-only-wrapper .rdp-day_selected.fh,
          .calendar-only-wrapper .rdp-day_selected.lh {
            background-color: #ffd4b3 !important;
            color: #214766 !important;
          }

          .calendar-only-wrapper .rdp-day_selected.highlighted:hover,
          .calendar-only-wrapper .rdp-day_selected.fh:hover,
          .calendar-only-wrapper .rdp-day_selected.lh:hover {
            background-color: #ffd4b3 !important;
          }

          /* Hover styles for dates in highlighted range */
          .calendar-only-wrapper .rdp-day.highlighted:hover:not(.rdp-day_selected),
          .calendar-only-wrapper .rdp-day.fh:hover:not(.rdp-day_selected),
          .calendar-only-wrapper .rdp-day.lh:hover:not(.rdp-day_selected) {
            background-color: #ffd4b3 !important;
            color: #214766 !important;
          }

          .calendar-only-wrapper .rdp-button.highlighted:hover:not([disabled]),
          .calendar-only-wrapper .rdp-button.fh:hover:not([disabled]),
          .calendar-only-wrapper .rdp-button.lh:hover:not([disabled]) {
            background-color: #ffd4b3 !important;
            color: #214766 !important;
          }

          /* Hover styles for regular dates (not in highlighted range) - now shows teal/primary color */
          .calendar-only-wrapper .rdp-day:not(.rdp-day_disabled):not(.highlighted):not(.fh):not(.lh):not(.rdp-day_selected):hover {
            background-color: #51c8b4 !important;
            color: white !important;
          }
        `}</style>
        <div className="calendar-only-wrapper">
          <DayPicker
            mode="single"
            defaultMonth={
              parentDefaultMonth
                ? new Date(parentDefaultMonth?.getFullYear(), parentDefaultMonth?.getMonth())
                : selectedDay
                  ? new Date(selectedDay?.getFullYear(), selectedDay?.getMonth())
                  : new Date()
            }
            locale={locale === ShortLocale.EN ? enGB : sv}
            captionLayout="dropdown-buttons"
            weekStartsOn={1}
            fromYear={new Date().getFullYear()}
            toYear={new Date().getFullYear() + 1}
            required
            formatters={{ formatWeekdayName: (weekdayName) => weekdayName?.toLocaleDateString(locale, { weekday: 'long' })?.slice(0, 3) }}
            fixedWeeks
            fromMonth={disablePastDates ? new Date() : undefined}
            components={{
              Dropdown: CustomDropdown,
            }}
            modifiersClassNames={{
              lastHighlighted: 'lh',
              firstHighlighted: 'fh',
              highlighted: 'highlighted',
            }}
            selected={selectedDay}
            onDayClick={handleDayClick}
            disabled={disabledDays}
            modifiers={modifiers}
          />
        </div>
      </>
    )

  return (
    <>
      <style jsx global>{`
        /* Year dropdown styling */
        .rdp-dropdown_year {
          position: relative !important;
          display: inline-flex !important;
          align-items: center !important;
          color: #fff !important;
        }

        .rdp-dropdown {
          color: #fff !important;
        }

        .rdp-dropdown_icon {
          margin-left: 8px !important;
        }

        /* Highlighted dates (yellow ring for week) */
        .highlighted:not(.rdp-day_selected) {
          position: relative;
        }

        .highlighted:not(.rdp-day_selected)::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 2px solid #fff5d3;
          border-radius: 50%;
          pointer-events: none;
        }

        .fh:not(.rdp-day_selected) {
          position: relative;
        }

        .fh:not(.rdp-day_selected)::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 2px solid #fff5d3;
          border-radius: 50%;
          pointer-events: none;
        }

        .lh:not(.rdp-day_selected) {
          position: relative;
        }

        .lh:not(.rdp-day_selected)::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 2px solid #fff5d3;
          border-radius: 50%;
          pointer-events: none;
        }

        /* Selected date within highlighted range - light orange background */
        .rdp-day_selected.highlighted,
        .rdp-day_selected.fh,
        .rdp-day_selected.lh {
          background-color: #ffd4b3 !important;
          color: #214766 !important;
        }

        .rdp-day_selected.highlighted:hover,
        .rdp-day_selected.fh:hover,
        .rdp-day_selected.lh:hover {
          background-color: #ffd4b3 !important;
        }

        /* Hover styles for dates in highlighted range */
        .rdp-day.highlighted:hover:not(.rdp-day_selected),
        .rdp-day.fh:hover:not(.rdp-day_selected),
        .rdp-day.lh:hover:not(.rdp-day_selected) {
          background-color: #ffd4b3 !important;
          color: #214766 !important;
        }

        .rdp-button.highlighted:hover:not([disabled]),
        .rdp-button.fh:hover:not([disabled]),
        .rdp-button.lh:hover:not([disabled]) {
          background-color: #ffd4b3 !important;
          color: #214766 !important;
        }

        /* Default hover for all non-highlighted, non-selected dates */
        .rdp-button:hover:not([disabled]):not(.rdp-day_selected):not(.highlighted):not(.fh):not(.lh),
        .rdp-day:hover:not([disabled]):not(.rdp-day_selected):not(.highlighted):not(.fh):not(.lh) {
          background-color: #51c8b4 !important;
          color: white !important;
        }
      `}</style>
      <div
        className={clsx('relative w-full', !noSpacing && 'mb-4', selectedDay && 'has-selected-day', hideInput && 'hidden')}
        ref={isTabletPortraitOrGreater && !forceOpen ? (ref as never) : null}
      >
        {disabled && <div className="absolute inset-0 z-10 bg-transparent cursor-not-allowed" data-testid="disabled" />}
        {customDateComponent ? (
          <div style={{ textAlign: 'center' }} onClick={() => !disabled && setPickerVisible(!pickerVisible)}>
            {customDateComponent}
          </div>
        ) : (
          <>
            <input
              className={clsx(
                'w-full px-3 py-2 border rounded-md cursor-pointer transition-colors',
                '!text-[15px] font-normal',
                'focus:outline-none focus:ring-1 focus:ring-primary-main focus:border-primary-main',
                pickerVisible ? 'border-primary-main bg-white ring-1 ring-primary-main' : 'border-gray-300 bg-white',
                theme === ThemeEnum.FASTIGHETSBYRAN && pickerVisible && 'border-fb-primary ring-fb-primary',
                theme === ThemeEnum.FASTIGHETSBYRAN && 'focus:border-fb-primary focus:ring-fb-primary',
              )}
              value={getDateToDisplay()}
              onClick={() => !disabled && setPickerVisible(!pickerVisible)}
              readOnly
              data-testid="input-button"
            />
            <label
              className={clsx(
                'absolute left-3 transition-all duration-200 pointer-events-none',
                'text-sm text-gray-500',
                pickerVisible || !!selectedDay || !!defaultValue ? '-top-2.5 bg-white px-1 text-xs font-normal' : 'top-3',
                disabled && 'text-gray-400',
              )}
            >
              <span>{placeholder}</span>
            </label>
          </>
        )}

        {infoContent ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20">
            <Popup text={infoContent} noUnderline>
              <Image src={iconSet.INFO_ICON} alt="question icon" width={24} height={24} />
            </Popup>
          </div>
        ) : (
          <>
            {!withoutCalendarIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-20 calendarIcon" onClick={() => setPickerVisible(!pickerVisible)}>
                <Image src={iconSet.CALENDAR_ICON} alt="Kalender ikon" width={24} height={24} />
              </div>
            )}
          </>
        )}

        {isTabletPortraitOrGreater && (
          <div className="w-full h-auto flex justify-center">
            <div
              className={clsx(
                'absolute z-50 !border-0 bg-white shadow-[0px_8px_40px_0px_rgba(0,0,0,0.15)] rounded-[var(--radius-border-radius-main)]',
                'transition-opacity duration-200 p-4',
                pickerVisible ? 'opacity-100 visible' : 'opacity-0 invisible',
                positionBottom ? 'top-full mt-2' : 'bottom-full mb-2',
                withParentWidth ? 'w-full' : 'min-w-[320px]',
                'max-h-[400px] overflow-auto',
              )}
            >
              <DayPicker
                mode="single"
                defaultMonth={
                  parentDefaultMonth
                    ? new Date(parentDefaultMonth?.getFullYear(), parentDefaultMonth?.getMonth())
                    : selectedDay
                      ? new Date(selectedDay?.getFullYear(), selectedDay?.getMonth())
                      : new Date()
                }
                locale={locale === ShortLocale.EN ? enGB : sv}
                captionLayout="dropdown-buttons"
                weekStartsOn={1}
                fromYear={new Date().getFullYear()}
                toYear={new Date().getFullYear() + 1}
                required
                fromMonth={disablePastDates ? new Date() : undefined}
                formatters={{ formatWeekdayName: (weekdayName) => weekdayName?.toLocaleDateString(locale, { weekday: 'long' })?.slice(0, 3) }}
                fixedWeeks
                components={{
                  Dropdown: CustomDropdown,
                }}
                modifiersClassNames={{
                  lastHighlighted: 'lh',
                  firstHighlighted: 'fh',
                  highlighted: 'highlighted',
                  warning: 'warning',
                }}
                selected={selectedDay}
                onDayClick={handleDayClick}
                disabled={disabledDays}
                modifiers={modifiers}
              />
            </div>
          </div>
        )}
      </div>
      {!isTabletPortraitOrGreater &&
        isMounted &&
        ReactDOM.createPortal(
          <>
            <div
              className={clsx('fixed inset-0 z-40 transition-all duration-300', pickerVisible ? 'bg-black/30 pointer-events-auto' : 'bg-transparent pointer-events-none')}
              onClick={() => {
                setPickerVisible(false)
                if (customOnClose) {
                  setTimeout(() => {
                    customOnClose()
                  }, 300)
                }
              }}
            />
            <div
              className={clsx(
                'fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-[var(--radius-border-radius-main)] shadow-[0px_-8px_40px_0px_rgba(0,0,0,0.2)]',
                'transition-transform duration-300 ease-in-out transform',
                'max-h-[80vh] overflow-auto',
                'flex flex-col items-center',
                'px-4 pt-4',
              )}
              style={{
                transform: pickerVisible ? 'translateY(0)' : 'translateY(100%)',
              }}
            >
              <DayPicker
                mode="single"
                defaultMonth={
                  parentDefaultMonth
                    ? new Date(parentDefaultMonth?.getFullYear(), parentDefaultMonth?.getMonth())
                    : selectedDay
                      ? new Date(selectedDay?.getFullYear(), selectedDay?.getMonth())
                      : new Date()
                }
                locale={locale === ShortLocale.EN ? enGB : sv}
                captionLayout="dropdown-buttons"
                weekStartsOn={1}
                fromYear={new Date().getFullYear()}
                toYear={new Date().getFullYear() + 1}
                required
                fromMonth={disablePastDates ? new Date() : undefined}
                formatters={{ formatWeekdayName: (weekdayName) => weekdayName?.toLocaleDateString(locale, { weekday: 'long' })?.slice(0, 3) }}
                fixedWeeks
                components={{
                  Dropdown: CustomDropdown,
                }}
                modifiersClassNames={{
                  lastHighlighted: 'lh',
                  firstHighlighted: 'fh',
                  highlighted: 'highlighted',
                }}
                selected={selectedDay}
                onDayClick={handleDayClick}
                disabled={disabledDays}
                modifiers={modifiers}
              />
              {withButtons && (
                <div className="flex gap-4 p-4 w-full">
                  <div className="flex-1">
                    <Button
                      variant={theme === ThemeEnum.FASTIGHETSBYRAN ? 'fb' : 'outline'}
                      withFullWidth
                      onClick={(e) => {
                        e.preventDefault()
                        lockedInDay ? setSelectedDay(lockedInDay) : setSelectedDay(defaultValue)
                        setPickerVisible(false)
                        // Delay the customOnClose to allow animation
                        if (customOnClose) {
                          setTimeout(() => {
                            customOnClose()
                          }, 300)
                        }
                      }}
                      text={t('cancel')}
                    />
                  </div>
                  <div className="flex-1">
                    <Button
                      withFullWidth
                      onClick={(e) => {
                        e.preventDefault()
                        handleSaveDate()
                        // Delay the customOnClose to allow animation
                        if (customOnClose) {
                          setTimeout(() => {
                            customOnClose()
                          }, 300)
                        }
                      }}
                      text={t('choose')}
                    />
                  </div>
                </div>
              )}
            </div>
          </>,
          document.body,
        )}
    </>
  )
}
export default DatePicker
