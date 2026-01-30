/**
 * Flyttsmart Auth API Client Class
 *
 * @class AuthClient
 * @extends EventTarget
 * @property {string} apiUrl - Flyttsmart backend API URL
 * @property {string} clientId - Client ID
 * @property {string} pno - Personal Number
 * @property {string} embedUrl - Embed URL
 */
class AuthClient extends EventTarget {
  /**
   * Create an instance of AuthClient.
   *
   * @param {string} apiUrl - Flyttsmart backend API URL
   * @param {string} clientId - Client ID
   * @param {string} pno - Personal Number
   */
  constructor(apiUrl, clientId, pno) {
    super()
    this.authenticated = false
    this.apiUrl = apiUrl
    this.clientId = clientId
    this.debug = true
    this.pno = pno
    this.authCode = null
    this.accessToken = null
  }

  /**
   * Get the auth code from the API.
   *
   * @returns {Promise<void>} - A Promise that resolves when the auth code is received.
   */
  getAuthCode() {
    return fetch(`${this.apiUrl}/external/code`, {
      method: 'POST',
      headers: { clientId: this.clientId },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.text()
      })
      .then((authCode) => {
        this.authCode = authCode
        this.dispatchEvent(
          new CustomEvent('statusEvent', {
            detail: {
              statusText: 'Auth code received...',
              statusType: 'success',
            },
          }),
        )
      })
      .catch((error) => {
        this.dispatchEvent(
          new CustomEvent('statusEvent', {
            detail: {
              statusText: error.message,
              statusType: 'error',
            },
          }),
        )
      })
  }

  /**
   * Get the access token from the API.
   *
   * @returns {Promise<void>} - A Promise that resolves when the access token is received.
   */
  getAccessToken() {
    return this.getAuthCode()
      .then(() => {
        return fetch(`${this.apiUrl}/external/token`, {
          method: 'POST',
          headers: {
            clientId: this.clientId,
            'Content-Type': 'application/json',
            Authorization: 'Basic ' + btoa(this.clientId + ':' + this.authCode),
          },
          body: JSON.stringify({ authCode: this.authCode }),
        })
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((responseBody) => {
        this.accessToken = responseBody.accessToken
        this.dispatchEvent(
          new CustomEvent('statusEvent', {
            detail: {
              statusText: 'Access token received...',
              statusType: 'success',
            },
          }),
        )
      })
      .catch((error) => {
        this.dispatchEvent(
          new CustomEvent('statusEvent', {
            detail: {
              statusText: error.message,
              statusType: 'error',
            },
          }),
        )
      })
  }

  /**
   * Login the user.
   *
   * @returns {Promise<void>} - A Promise that resolves when the user is logged in.
   */
  loginUser() {
    return this.getAccessToken()
      .then(() => {
        return fetch(`${this.apiUrl}/external/users/login`, {
          method: 'POST',
          headers: {
            clientId: this.clientId,
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.accessToken,
          },
          body: JSON.stringify({ pno: this.pno }),
        })
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.text()
      })
      .then((rawBody) => {
        const data = JSON.parse(rawBody)
        const url = new URL('https://' + data.url)
        this.accessToken = url.searchParams.get('token')
        this.dispatchEvent(
          new CustomEvent('statusEvent', {
            detail: {
              statusText: 'User logged in...',
              statusType: 'success',
              token: this.accessToken,
            },
          }),
        )
        this.authenticated = true
      })
      .catch((error) => {
        this.dispatchEvent(
          new CustomEvent('statusEvent', {
            detail: {
              statusText: error.message,
              statusType: 'error',
            },
          }),
        )
      })
  }

  addEventListener(type, callback, options) {
    super.addEventListener(type, callback, options)
  }

  dispatchEvent(event) {
    return super.dispatchEvent(event)
  }

  removeEventListener(type, callback, options) {
    super.removeEventListener(type, callback, options)
  }
}

const FLYTTSMART_MODULES = ['activities', 'moveclean', 'movehelp', 'addresschange', 'electricity', 'broadband']

class FlyttsmartWidget extends EventTarget {
  /**
   * @param {AuthClient} authClient - Instance of the AuthClient class.
   * @param {string} module - The Flyttsmart module to be used.
   * @param {Object} options
   * @param {string} [options.theme] - The Flyttsmart API URL.
   * @param {string} options.baseUrl - The base URL of the widget.
   * @param {boolean} options.cookiesAccepted - If user has accepted cookies.
   * @param {Element} options.el - The element to render the widget in.
   */
  constructor(authClient, module, options = {}) {
    super()

    if (authClient.authenticated === false) {
      // TODO: we should attach a handler to the authClient
      // to wait for the user to be authenticated and keep track of that state
      // using events.
      throw new Error('Trying to instantiate widget before user is authenticated')
    }

    if (!FLYTTSMART_MODULES.includes(module)) {
      throw new Error('Unknown module: ' + module)
    }

    if (!options) {
      throw new Error('Missing required options parameter')
    }

    FlyttsmartWidget.ValidateOptions(options)

    /**
     * @type {AuthClient}
     */
    this.authClient = authClient

    /**
     * @type {string}
     */
    this.module = module
    /**
     * @type {string}
     */
    this.baseUrl = options.baseUrl
    /**
     * @type {Element}
     */
    this.el = options.el
    /**
     * @type {string}
     */
    this.embedUrl = options.embedUrl
    /**
     * @type {string}
     */
    this.theme = options.theme
    /**
     * @type {string}
     */
    this.cookiesAccepted = options.cookiesAccepted

    // Initialize an empty iframe instantly
    const frame = (this.iframe = document.createElement('iframe'))
    frame.style.border = 'none'
    frame.style.width = '100%'
    frame.style.height = '34px'
    frame.style.overflow = 'hidden'

    if (module === 'activities') {
      window.addEventListener('message', (event) => {
        const data = event.data
        const height = data.height
        frame.style.height = height.toString() + 'px'
      })
    } else {
      frame.style.height = '100%'
    }

    this.el.appendChild(frame)

    const frameUrl = FlyttsmartWidget.ConstructUrl(this.baseUrl, this.module, this.authClient.accessToken, this.theme, this.cookiesAccepted)

    frame.src = frameUrl
  }

  navigateTo(url) {
    this.iframe.src = url
  }

  static ConstructUrl(baseUrl, module, accessToken, theme, cookiesAccepted = false) {
    let url = baseUrl + '/' + module + '?token=' + accessToken + '&cookiesAccepted=' + cookiesAccepted.toString()
    if (theme) {
      url += '&theme=' + theme
    }
    return url
  }

  // Static method as to not pollute the global scope
  static ValidateOptions(options) {
    const required = ['el', 'baseUrl']
    const optional = ['theme']
    for (const attr of required) {
      if (!options[attr] && !optional.includes(attr)) {
        throw new Error(`Missing required option ${attr}`)
      }
    }
  }
}

const FLYTTSMART_DEV_CONFIG = {
  apiUrl: 'https://dev-api.flyttsmart.se',
  baseUrl: 'https://stage.flyttsmart.se/external/modules',
}

const FLYTTSMART_PROD_CONFIG = {
  apiUrl: 'https://api.flyttsmart.se',
  baseUrl: 'https://flyttsmart.se/external/modules',
}

/**
 * @example
 * const widgetFactory = await FlyttsmartInit({
 *  pno: '199001011234',
 *  clientId: 'my-client-id',
 *  cookiesAccepted: true,
 * });
 * const container = document.getElementById('widget-container');
 * // Create a widget instance from available modules:
 * // 'activities'
 * // 'moveclean'
 * // 'movehelp'
 * // 'addresschange'
 * // 'electricity'
 * // 'broadband'
 * const widget = widgetFactory('activities', {
 *  el: container,
 *  theme: 'my-theme',
 * });
 */
window.FlyttsmartInit = function (options) {
  const envConfig = options.development ? FLYTTSMART_DEV_CONFIG : FLYTTSMART_PROD_CONFIG
  // Instantiate the AuthClient and re-use it for all modules
  const authClient = new AuthClient(envConfig.apiUrl, options.clientId, options.pno)

  return new Promise((resolve, reject) => {
    return authClient
      .loginUser()
      .then(() => {
        // We return a factory function to be able to create multiple instances of the widget
        const factoryFn = (module, options = {}) => {
          return new FlyttsmartWidget(authClient, module, { ...envConfig, ...options })
        }
        resolve(factoryFn)
      })
      .catch(reject)
  })
}

window.FlyttsmartWidget = FlyttsmartWidget
