import addDays from 'date-fns/addDays'

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
const twoDaysAfter = new Date(today)
twoDaysAfter.setDate(twoDaysAfter.getDate() + 2)
const isFriday = today.getDay() === 5
const isSaturday = today.getDay() === 6
const isSunday = today.getDay() === 0

export const getDisabledDays = (disableWeekend?: boolean) => {
  let disabled: Date[] = []
  if (disableWeekend) {
    if (isSunday) {
      disabled = [today]
    }
    if (isSaturday) {
      disabled = [today, tomorrow]
    }
    if (isFriday) {
      disabled = [today, tomorrow, twoDaysAfter]
    }
    if (!isSunday && !isSaturday && !isFriday) {
      disabled = [today]
    }
  }
  return disabled
}
export const getDefaultDate = (movingDate: Date) => {
  const movingDateObj = new Date(movingDate)
  const today = new Date()

  // Check if movingDate is in the same month and year as today
  const isSameMonth = movingDateObj.getMonth() === today.getMonth() && movingDateObj.getFullYear() === today.getFullYear()

  // Only check disabled days if the moving date is in the current month
  if (isSameMonth) {
    const disabledDaysDate = getDisabledDays(true)
    const disabledDaysDay = disabledDaysDate.map((day) => {
      return day.getDate()
    })

    if (disabledDaysDay.includes(movingDateObj.getDate()) || isSaturday || isSunday || isFriday) {
      const newDate = addDays(new Date(disabledDaysDate[disabledDaysDate.length - 1]), 1)
      return new Date(newDate)
    }
  }

  // If movingDate is in the past, return tomorrow
  if (movingDateObj <= today) {
    const newDate = addDays(today, 1)
    return newDate
  }

  // Otherwise return the movingDate as is
  return movingDateObj
}

export const checkDateForHoliday = (date: string, holidays: string[]) => {
  return holidays?.includes(date) ?? false
}
