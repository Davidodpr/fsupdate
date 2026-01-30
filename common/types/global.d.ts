declare global {
  interface Window {
    __NEXT_DATA__: { props: { apolloState: Record<string, unknown> } }
    dataLayer: Record<string, unknown>[]
    gapi: {
      load: (type: string, fn: () => void) => void
      auth2: {
        getAuthInstance: () => { signIn: () => Promise<void> }
      }
      client: {
        init: (config) => void
        load: (type: string, version: string, fn: () => void) => void
        calendar: {
          events: {
            insert: (config: {
              calendarId: string
              resource: {
                summary: string
                reminders: {
                  useDefault: boolean
                  overrides: (
                    | { method: string; minutes: number }
                    | { method: string; minutes: number }
                    | { method: string; minutes: number }
                    | { method: string; minutes: number }
                  )[]
                }
                start: { dateTime: string }
                description: string | undefined
                end: { dateTime: string }
              }
            }) => { execute: (value: (event) => void) => void }
          }
        }
      }
    }
    CookieFirst?: CookieFirst
  }
}
window.__NEXT_DATA__ = window.__NEXT_DATA__ || {}
window.CookieFirst = window.CookieFirst
window.dataLayer = window.dataLayer || []

export default global

/** Represents consent status of each cookie category */
export interface CookieCategories {
  necessary: boolean // always true
  performance?: boolean
  functional?: boolean
  advertising?: boolean
}

/** Represents consent status for individual services */
export interface CookieServices {
  [serviceId: string]: boolean
}

/** Main CookieFirst API available on `window.CookieFirst` */
export interface CookieFirst {
  /** Current category-level consent; `null` if not available */
  consent: CookieCategories | null

  /** Current service-level consent; `null` if not available */
  acceptedServices: CookieServices | null

  /** Clear all consent and reload the page */
  withdrawConsent(): void

  /** Update consent to the provided categories */
  updateConsent(newConsent: CookieCategories): void

  /** Accept a single category, e.g. "functional" */
  acceptCategory(category: keyof Omit<CookieCategories, 'necessary'>): void

  /** Accept all categories */
  acceptAllCategories(): void

  /** Accept only preselected categories (admin-configured) */
  acceptPreselectedCategories(): void

  /** Decline all except necessary (no banner shown) */
  declineAllCategories(): void

  /** Decline a single category */
  declineCategory(category: keyof Omit<CookieCategories, 'necessary'>): void

  /** Accept one or more services by IDs */
  acceptService(serviceId: string | string[]): void

  /** Decline one or more services by IDs */
  declineService(serviceId: string | string[]): void

  /** Change banner language using 2‑letter ISO code */
  changeLanguage?(lang: string): void

  /** Retrieve latest cookie scan results (if supported) */
  fetchLatestScan?(): Promise<{ cookies: any[]; scanDate: string }>
}
