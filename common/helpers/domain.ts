export const getCookieDomain = (hostname: string) => {
  if (hostname === 'www.flyttsmart.se' || hostname === 'stage.flyttsmart.se') {
    return 'flyttsmart.se'
  } else return hostname
}
