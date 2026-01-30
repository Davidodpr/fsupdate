import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import formatDate from '@/appComponents/format'
import { useUserContext } from '@/common/context/user/UserProvider'
import useResponsive from '@/common/hooks/useResponsive'
import DatePicker from '@/components/organisms/DatePicker'
import MobileDatePicker from './MobileDatePicker'

export interface DatePickerProps {
  movingDate: string | Date
  setAccordionValue: (arg0: string) => void
  isMoveInDate?: boolean
}

const Calendar = ({ movingDate, setAccordionValue, isMoveInDate = false }: DatePickerProps) => {
  const [selectedDay, setSelectedDay] = useState<undefined | Date>(movingDate ? new Date(movingDate) : undefined)
  const [hasUserSelected, setHasUserSelected] = useState(false)
  const { updateMovingDate, user } = useUserContext()
  const { i18n } = useTranslation()
  const locale = i18n.language
  const { isTabletPortraitOrGreater } = useResponsive()

  // Reset the hasUserSelected flag when component mounts (accordion opens)
  useEffect(() => {
    setHasUserSelected(false)
  }, [])

  useEffect(() => {
    if (selectedDay && formatDate(selectedDay, 'yyyy-MM-dd') !== formatDate(new Date(movingDate), 'yyyy-MM-dd')) {
      if (isMoveInDate) {
        // Update move-in date, keeping move-out date the same
        const moveOutDate = user.currentMove.movingDate ? new Date(user.currentMove.movingDate) : selectedDay
        updateMovingDate(moveOutDate, selectedDay)
      } else {
        // Update move-out date only
        updateMovingDate(selectedDay)
      }
    }
  }, [selectedDay, movingDate, isMoveInDate])

  // On mobile, show custom mobile date picker
  if (!isTabletPortraitOrGreater) {
    return (
      <MobileDatePicker
        defaultValue={selectedDay}
        onDateSelect={(date) => {
          setSelectedDay(date)
        }}
        onClose={() => {
          setAccordionValue('')
        }}
      />
    )
  }

  // On desktop/tablet, show the calendar inline
  return (
    <DatePicker
      defaultValue={selectedDay}
      parentDefaultMonth={selectedDay || (movingDate ? new Date(movingDate) : undefined)}
      setDatePicked={(value) => {
        const newDate = new Date(value.fullDate)
        // Only close accordion if the date actually changed (user clicked a different date)
        if (hasUserSelected && formatDate(newDate, 'yyyy-MM-dd') !== formatDate(selectedDay || new Date(movingDate), 'yyyy-MM-dd')) {
          setSelectedDay(newDate)
          // Close the accordion after date selection on desktop
          setTimeout(() => {
            setAccordionValue('')
          }, 300) // Small delay to allow the date to be visually selected before closing
        } else {
          setSelectedDay(newDate)
        }
        setHasUserSelected(true)
      }}
      withoutDayInDate
      onlyCalendar
      withoutCalendarIcon
    />
  )
}
export default Calendar
