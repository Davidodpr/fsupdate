export const isDateWithinSevenDays = (pickedDate: Date): boolean => {
  const currentDate = new Date()
  const sevenDaysFromNow = new Date()
  sevenDaysFromNow.setDate(currentDate.getDate() + 7)

  // Normalize the time part to avoid issues with time comparison
  currentDate.setHours(0, 0, 0, 0)
  sevenDaysFromNow.setHours(0, 0, 0, 0)
  pickedDate.setHours(0, 0, 0, 0)

  return pickedDate >= currentDate && pickedDate < sevenDaysFromNow
}

export const getDatesWithinSevenDays = (): Date[] => {
  const dates: Date[] = []
  const currentDate = new Date()

  Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate)
    date.setDate(currentDate.getDate() + i)
    date.setHours(0, 0, 0, 0)
    return date
  }).forEach((date) => dates.push(date))

  return dates
}
