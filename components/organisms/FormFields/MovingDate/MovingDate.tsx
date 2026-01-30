import { useTranslation } from 'react-i18next'
import DatePicker from '@/components/organisms/DatePicker'
import { datePickerWrapperVariants, wrapperVariants } from '../formFields.variants'

interface MovingDateProps {
  defaultDate: Date
  setDatePicked?: (value: Date) => void
  withCalendarIcon?: boolean
  positionBottom?: boolean
}

export const MovingDate = ({ defaultDate, setDatePicked, withCalendarIcon, positionBottom }: MovingDateProps) => {
  const { t, i18n } = useTranslation(['error', 'common'])
  const locale = i18n.language

  return (
    <>
      <div className={wrapperVariants({ isEnglish: locale === 'en' })}>
        <div className={datePickerWrapperVariants()}>
          <DatePicker
            placeholder={t('common:chooseDate') ?? ''}
            defaultValue={defaultDate ? new Date(defaultDate) : new Date()}
            disablePastDates
            positionBottom={positionBottom}
            disabledToday={[new Date()]}
            withoutCalendarIcon={!withCalendarIcon}
            parentSelectedDay={defaultDate}
            parentDefaultMonth={defaultDate ? new Date(defaultDate) : new Date()}
            setDatePicked={(value) => {
              setDatePicked && setDatePicked(new Date(value.fullDate))
            }}
            withoutDayInDate
          />
        </div>
      </div>
    </>
  )
}
