import { ShortLocale as ShortLocalEnum } from '../enums/LocaleEnum'

const shortToFullLookup = (locale: ShortLocale): FullLocale => {
  if (locale === ShortLocalEnum.SV) return 'sv-se'
  if (locale === ShortLocalEnum.EN) return 'en-gb'
  return 'sv-se'
}

const fullToShortLookup = (locale: FullLocale): ShortLocale => {
  if (locale === 'sv-se') return ShortLocalEnum.SV
  if (locale === 'en-gb') return ShortLocalEnum.EN
  return ShortLocalEnum.SV
}

export const localeHelper = {
  shortToFullLookup,
  fullToShortLookup,
}
