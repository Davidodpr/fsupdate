import { format } from 'date-fns'
import en from 'date-fns/locale/en-GB'
import sv from 'date-fns/locale/sv'
import { localeToDateFormatMapping } from '@/constants/localeToDateFormatMapping'
import { DateFormatsEnum } from '@/enums/DateFormatsEnum'
import { ShortLocale as ShortLocalEnum } from '@/enums/LocaleEnum'

export const capitalizeFirstLetter = (string: string) => string.charAt(0).toUpperCase() + string.slice(1)

export const hasNumber = (string: string) => /\d/.test(string)

export const isNumeric = (num: any) => (typeof num === 'number' || (typeof num === 'string' && num.trim() !== '')) && !isNaN(num as number)

export const formatPriceNumber = (price: number, currency: string) => `${new Intl.NumberFormat(ShortLocalEnum.SV)?.format(price)} ${currency || ''}`

export const formatDate = (date: undefined | string | Date, locale: ShortLocale, dateFormat = DateFormatsEnum.LONG) => {
  if (date) {
    if (typeof date === 'string') {
      date = new Date(date)
    }
    return `${format(date, localeToDateFormatMapping[locale][dateFormat], { locale: locale === ShortLocalEnum.SV ? sv : en })}`
  } else {
    return ''
  }
}
