import { ActivityEnum } from '@/common/types/activity'

function getCurrentServiceType(pathname: string): ActivityEnum | 'default' {
  switch (pathname) {
    case '/app/movehelp':
    case '/en/app/movehelp':
    case '/app/flytthjalp':
    case '/en/app/flytthjalp':
    case '/app/movehelp-quotation':
    case '/en/app/movehelp-quotation':
      return ActivityEnum.MOVEHELP
    case '/app/cleaning':
    case '/en/app/cleaning':
    case '/app/moveclean':
    case '/en/app/moveclean':
      return ActivityEnum.MOVECLEAN
    case '/app/fixarenovera':
    case '/en/app/fixarenovera':
      return ActivityEnum.HOMEFIX
    case '/app/addresschange':
    case '/en/app/addresschange':
      return ActivityEnum.ADDRESSCHANGE
    case '/app/broadband':
    case '/en/app/broadband':
      return ActivityEnum.INTERNET
    case '/app/electricity':
    case '/en/app/electricity':
      return ActivityEnum.POWER
    case '/app/insurance':
    case '/en/app/insurance':
      return ActivityEnum.INSURANCE
    default:
      return 'default'
  }
}

export default getCurrentServiceType
