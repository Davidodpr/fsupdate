import React from 'react'
import ReactGA4 from 'react-ga4'
import { useRouter } from 'next/navigation'
import { MOVEPAGEURL } from '@/constants/urls'
import { render } from '@testing-library/react'
import WelcomePage from './WelcomePage'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))
jest.mock('react-ga4', () => ({
  event: jest.fn(),
}))

const useRouterMock = useRouter as jest.MockedFunction<typeof useRouter>
describe.skip('Welcome component', () => {
  beforeEach(() => {
    useRouterMock.mockReturnValue({
      push: jest.fn(),
      prefetch: jest.fn(() => Promise.resolve()),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      events: jest.fn(),
      replace: jest.fn(),
      beforePopState: jest.fn(),
    })
    jest.resetModules()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call ReactGA4.event with "signup_success" if userCreated is true', () => {
    expect.assertions(3)
    useRouterMock.mockReturnValue({
      push: jest.fn(),
      prefetch: jest.fn(() => Promise.resolve()),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      events: jest.fn(),
      replace: jest.fn(),
      beforePopState: jest.fn(),
    })
    render(<WelcomePage />)
    expect(ReactGA4.event).toHaveBeenCalledWith('signup_success_user')
    expect(ReactGA4.event).not.toHaveBeenCalledWith('login_success_user')
    expect(ReactGA4.event).toHaveBeenCalledTimes(1)
  })

  it('should call ReactGA4.event with "login_success" if userCreated is falsy', () => {
    expect.assertions(3)
    useRouterMock.mockReturnValue({
      push: jest.fn(),
      prefetch: jest.fn(() => Promise.resolve()),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      events: jest.fn(),
      replace: jest.fn(),
      beforePopState: jest.fn(),
    })
    render(<WelcomePage />)
    expect(ReactGA4.event).toHaveBeenCalledWith('login_success_user')
    expect(ReactGA4.event).not.toHaveBeenCalledWith('signup_success_user')
    expect(ReactGA4.event).toHaveBeenCalledTimes(1)
  })

  it('should call router.push with MOVEPAGEURL if refUrl is falsy or "/"', () => {
    expect.assertions(1)
    useRouterMock.mockReturnValue({
      push: jest.fn(),
      prefetch: jest.fn(() => Promise.resolve()),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      events: jest.fn(),
      replace: jest.fn(),
      beforePopState: jest.fn(),
    })
    render(<WelcomePage />)
    expect(useRouterMock().push).toHaveBeenCalledWith(MOVEPAGEURL)
  })

  it('should call router.push with refUrl if it is a valid URL', () => {
    expect.assertions(1)
    const refUrl = '/path'
    useRouterMock.mockReturnValue({
      push: jest.fn(),
      prefetch: jest.fn(() => Promise.resolve()),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore-next-line
      events: jest.fn(),
      replace: jest.fn(),
      beforePopState: jest.fn(),
    })
    render(<WelcomePage />)
    expect(useRouterMock().push).toHaveBeenCalledWith(refUrl)
  })
})
