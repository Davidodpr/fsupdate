import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import DatePicker from '@/components/organisms/DatePicker'
import { datePickerWrapperVariants, wrapperVariants, wrapperDefaultVariants } from '../SharedStyles.variants'

interface MovingDateProps {
  defaultDate: Date
  setDatePicked?: (value: Date) => void
}

export const MovingDate = ({ defaultDate, setDatePicked }: MovingDateProps) => {
  const { t, i18n } = useTranslation(['error', 'common'])
  const locale = i18n.language

  return (
    <>
      <div className={clsx(wrapperVariants({ isEnglish: locale === 'en' }), !locale || locale === 'sv' ? wrapperDefaultVariants() : '')}>
        <div className={datePickerWrapperVariants()}>
          <DatePicker
            placeholder={t('common:chooseDate') ?? ''}
            defaultValue={defaultDate ? new Date(defaultDate) : new Date()}
            disablePastDates
            positionBottom
            disabledToday={[new Date()]}
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
