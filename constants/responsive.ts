export const BREAKPOINTS = {
  xxxs: 320,
  xxs: 375,
  xs: 620,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1550,
  xxl: 1800,
}

export const responsive = {
  smallMobile: `@media screen and (min-width: ${BREAKPOINTS.xxxs}px))`,
  mobile: `@media screen and (min-width: ${BREAKPOINTS.xxs}px)`,
  tabletPortrait: `@media screen and (min-width: ${BREAKPOINTS.sm}px)`,
  tabletLandscape: `@media screen and (min-width: ${BREAKPOINTS.md}px)`,
  desktop: `@media screen and (min-width: ${BREAKPOINTS.lg}px)`,
  desktopXL: `@media screen and (min-width: ${BREAKPOINTS.xl}px)`,
  desktopXXL: `@media screen and (min-width: ${BREAKPOINTS.xxl}px)`,
}

export default responsive
