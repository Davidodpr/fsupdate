import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Cookie from 'js-cookie'
import { useRouter, usePathname } from 'next/navigation'
import i18nConfig from '../../i18nConfig'

type UseChangeLanguageReturn = {
  submitLocale: (newLocale: ShortLocale) => void
}

const useChangeLanguage = (): UseChangeLanguageReturn => {
  const { i18n } = useTranslation()
  const currentLocale = i18n.language
  const router = useRouter()
  const currentPathname = usePathname()

  useEffect(() => {
    const nextLocale = Cookie.get('NEXT_LOCALE')
    if (!nextLocale) {
      const days = 30
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      const expires = date.toUTCString()
      document.cookie = `NEXT_LOCALE=${i18nConfig.defaultLocale};expires=${expires};path=/`
    }
  }, [])

  const submitLocale = async (newLocale: ShortLocale) => {
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = date.toUTCString()
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`
    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }
    router.refresh()
  }

  return {
    submitLocale,
  }
}

export default useChangeLanguage
