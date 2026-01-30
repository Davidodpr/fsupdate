import '@testing-library/jest-dom/extend-expect'
import { PointerEvent } from 'testhelpers/pointerEvent'

const mockTrackEvent = jest.fn()
jest.mock('react-use-intercom', () => ({
  useIntercom: () => ({
    trackEvent: mockTrackEvent,
  }),
}))

const localStorageMock = (function () {
  let store = {}

  return {
    getItem(key) {
      return store[key]
    },

    setItem(key, value) {
      store[key] = value
    },

    clear() {
      store = {}
    },

    removeItem(key) {
      delete store[key]
    },

    getAll() {
      return store
    },
  }
})()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
  Trans: jest.fn().mockImplementation((t, i18nKey, components) => {
    return <div>{components}</div>
  }),
}))

window.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

window.dataLayer = []

window.scrollTo = jest.fn()

window.google = {
  maps: {
    places: {
      AutocompleteService: jest.fn(() => ({
        getPlacePredictions: () => [
          {
            description: 'Vasagatan 20, Stockholm',
            matched_substrings: [
              { length: 9, offset: 0 },
              { length: 9, offset: 0 },
            ],
            place_id: 'ChIJ_8NX1V-dX0YRca9rF1tXuW0',
            reference: 'ChIJ_8NX1V-dX0YRca9rF1tXuW0',
            structured_formatting: { main_text: 'Vasagatan 20', main_text_matched_substrings: [], secondary_text: 'Stockholm' },
            terms: [
              { offset: 0, value: 'Vasagatan' },
              { offset: 10, value: '20' },

              { offset: 14, value: 'Stockholm' },
            ],
            types: ['street_address', 'geocode'],
          },
        ],
      })),
      PlacesService: jest.fn(),
      PlacesServiceStatus: {
        INVALID_REQUEST: 'INVALID_REQUEST',
        NOT_FOUND: 'NOT_FOUND',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
      getPlacePredictions: () => [
        {
          description: 'Vasagatan 20, Stockholm',
          matched_substrings: [
            { length: 9, offset: 0 },
            { length: 9, offset: 0 },
          ],
          place_id: 'ChIJ_8NX1V-dX0YRca9rF1tXuW0',
          reference: 'ChIJ_8NX1V-dX0YRca9rF1tXuW0',
          structured_formatting: { main_text: 'Vasagatan 20', main_text_matched_substrings: [], secondary_text: 'Stockholm' },
          terms: [
            { offset: 0, value: 'Vasagatan' },
            { offset: 10, value: '20' },

            { offset: 14, value: 'Stockholm' },
          ],
          types: ['street_address', 'geocode'],
        },
      ],
    },
    Geocoder: jest.fn(() => ({
      geocode: jest.fn(),
    })),
    GeocoderStatus: {
      ERROR: 'ERROR',
      INVALID_REQUEST: 'INVALID_REQUEST',
      OK: 'OK',
      OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
      REQUEST_DENIED: 'REQUEST_DENIED',
      UNKNOWN_ERROR: 'UNKNOWN_ERROR',
      ZERO_RESULTS: 'ZERO_RESULTS',
    },
  },
}

window.localStorage = localStorageMock

const mockRouterPush = jest.fn()
const mockReplace = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: jest.fn(),
    forward: jest.fn(),
    push: mockRouterPush,
    refresh: jest.fn(),
    prefetch: () => null,
    replace: mockReplace,
  }),
}))

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      ready: true,
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => null),
      },
    }
  },
  Trans: (props) => <div>{props.i18nKey}</div>,
}))

// Needed for slick-slider
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: () => null,
      removeListener: () => null,
    }
  }

window.PointerEvent = PointerEvent

window.open = jest.fn()

jest.mock('@aws-sdk/client-evidently', () => {
  return {
    Evidently: jest.fn().mockImplementation(() => {
      return {
        evaluateFeature: jest.fn().mockImplementation((variant) => {
          return variant
        }),
      }
    }),
  }
})
jest.mock('@uidotdev/usehooks', () => ({
  useClickAway: () => {
    return null
  },
}))
