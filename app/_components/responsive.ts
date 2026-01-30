'use server'

import { headers } from 'next/headers'
import { UAParser } from 'ua-parser-js'

const SAFARI = 'Safari'
const IOS = 'iOS'

export const isMobileDevice = async () => {
  if (typeof process === 'undefined') {
    throw new Error('[Server method] you are importing a server-only module outside of server')
  }

  const { get } = await headers()
  const ua = get('user-agent')
  const device = new UAParser(ua || '').getDevice()

  return device.type === 'mobile'
}

export const isSafari = async () => {
  if (typeof process === 'undefined') {
    throw new Error('[Server method] you are importing a server-only module outside of server')
  }

  const { get } = await headers()
  const ua = get('user-agent')
  const browser = new UAParser(ua || '').getBrowser()

  return browser.name === SAFARI
}

export const isIos = async () => {
  if (typeof process === 'undefined') {
    throw new Error('[Server method] you are importing a server-only module outside of server')
  }

  const { get } = await headers()
  const ua = get('user-agent')
  const os = new UAParser(ua || '').getOS()

  return os.name === IOS
}
