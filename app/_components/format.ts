import { format } from 'date-fns'
import { enGB, sv } from 'date-fns/locale'
import Cookies from 'js-cookie'
import { ShortLocale } from '@/common/enums/LocaleEnum'

// by providing a default string of 'P' for `formatStr`
// it will format dates in whichever way is appropriate to the locale
const formatDate = (date: Date, formatStr = 'P') => {
  const NEXT_LOCALE = Cookies.get('NEXT_LOCALE')
  return format(date, formatStr, {
    locale: NEXT_LOCALE === ShortLocale.SV ? sv : enGB,
  })
}

export default formatDate
