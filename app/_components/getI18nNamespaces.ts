function selectI18nNamespaces(page: string): string[] {
  switch (page) {
    case 'login':
      return ['login']
    case 'landing':
      return ['landing', 'header', 'footer']
    case 'movepage':
      return ['movePage', 'activityModal', 'checklistItems', 'header', 'footer', 'bookings']
    case 'addresschange':
      return ['addresschange', 'header', 'footer']
    case 'movehelp':
      return ['movehelp', 'header', 'footer']
    case 'moveclean':
      return ['moveclean', 'header', 'footer']
    case 'broadband':
      return ['broadband', 'header', 'footer']
    case 'electricity':
      return ['electricity', 'header', 'footer']
    case 'insurance':
      return ['insurance', 'header', 'footer']
    case 'bookings':
      return ['bookings', 'header', 'footer', 'electricity']
    case 'fixarenovera':
      return ['fixaRenoveraPage', 'header', 'footer']
    case 'signup':
      return ['signup', 'movePage']
    case 'cookie':
      return ['cookie', 'header', 'footer', 'external']
    case 'provider':
      return ['provider', 'header', 'footer', 'external']
    case 'sso':
      return ['sso']
    case 'adblockPage':
      return ['adblockPage', 'header', 'footer', 'external']
    case 'elavtal':
      return ['elavtal', 'header', 'footer']
    case 'maklarhuset':
      return ['maklarhuset', 'header', 'footer']
    default:
      return ['header', 'footer', 'external']
  }
}

export default function getI18nNamespaces(page: string): string[] {
  const nameSpaces = selectI18nNamespaces(page)
  return [...nameSpaces, 'common', 'error']
}
