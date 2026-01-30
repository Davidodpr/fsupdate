import ServiceUrlEnum from '@/common/enums/ServiceUrlEnum'

export const getFBRefUrl = (refUrl: string) => {
  switch (refUrl) {
    case ServiceUrlEnum.MOVEHELP_NEW:
    case ServiceUrlEnum.ASSEMBLY:
    case ServiceUrlEnum.PACKAGING:
    case ServiceUrlEnum.MOVEHELPABROAD:
    case ServiceUrlEnum.STORAGE:
    case ServiceUrlEnum.REMOVAL:
    case ServiceUrlEnum.MOVEHELPEXPRESS:
      return '/app/movehelp?removeAddQ=true'
    case ServiceUrlEnum.MOVECLEAN_NEW:
    case ServiceUrlEnum.WINDOWCLEANING:
    case ServiceUrlEnum.SHOWCLEANING:
    case ServiceUrlEnum.HOMECLEAN:
      return '/app/moveclean?removeAddQ=true'
    case ServiceUrlEnum.BROADBAND:
      return '/app/broadband?removeAddQ=true'
    case ServiceUrlEnum.ELECTRICITY:
      return '/app/electricity?removeAddQ=true'
    case ServiceUrlEnum.ADDRESSCHANGE:
      return '/app/addresschange?removeAddQ=true'
    case ServiceUrlEnum.ACTIVITES:
    case ServiceUrlEnum.DECLARATION:
    case ServiceUrlEnum.DECEASEDESTATE:
      return '/app/movepage?removeAddQ=true'
    case ServiceUrlEnum.RENOVATE:
      return '/app/fixarenovera?removeAddQ=true'
    default:
      return 'app/movepage?removeAddQ=true'
  }
}

export const getUrl = () => {
  if (window?.location.host.includes('localhost')) {
    return `http://${window?.location.host}`
  }
  if (window?.location.host.includes('flyttsmart.se') || window?.location.host.includes('stage.flyttsmart.se')) {
    return `https://${window?.location.host}`
  }
}
