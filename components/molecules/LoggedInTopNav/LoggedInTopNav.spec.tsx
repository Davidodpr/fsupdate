import { act } from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import BrokerOfficeLogosMock from '__mocks__/BrokerOfficeLogosMock'
import UserMock from '__mocks__/UserDataMock'
import { useRouter } from 'next/navigation'
import { CreateUserContext, UserProvider } from '@/common/context/user/UserProvider'
import { longLocale } from '@/common/enums/LocaleEnum'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoggedInTopNav, { LoggedInTopNavProps } from './LoggedInTopNav'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))
jest.mock('../../../common/utils/userHelpers', () => {
  return { logout: jest.fn() }
})

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  Trans: jest.fn().mockImplementation((t, i18nKey, components) => {
    return <div>{components}</div>
  }),
}))

describe.skip('AlarmProduct', () => {
  const desktopWidth = 1500
  const context = CreateUserContext()
  const propsWithData = {
    t: {
      page: {
        alternate_languages: [],
        data: { brokerLogos: BrokerOfficeLogosMock, birdWhite: { url: 'Test image', alt: 'Test alt', copyright: null, dimensions: { width: 94, height: 16 } } },
        first_publication_date: '2022-04-07T11:38:16+0000',
        href: 'https://flyttsmart-2.cdn.prismic.io/api/v2/documents/search?ref=YtfSdRAAACAAorUV&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22Yk7NJRcAACgA0Exu%22%29+%5D%5D',
        id: 'Yk7NJRcAACgA0Exu',
        lang: longLocale.SV,
        last_publication_date: '2022-04-11T07:02:05+0000',
        linked_documents: [],
        slugs: ['topnav'],
        tags: [],
        type: 'topnav',
        uid: null,
        url: null,
      },
    },
  }

  const renderComponent = (simulatedWidth = desktopWidth, props: LoggedInTopNavProps = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <UserProvider defaultValueUser={UserMock} context={context}>
        <ResponsiveContext.Provider value={width}>
          <LoggedInTopNav {...props} />
        </ResponsiveContext.Provider>
      </UserProvider>,
    )
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    expect.assertions(1)
    const { container } = renderComponent(desktopWidth, propsWithData)
    expect(container.firstChild).not.toBeNull()
  })
  it('renders the correct image with alt from the mocked users info', () => {
    expect.assertions(1)
    const { getByAltText } = renderComponent(desktopWidth, propsWithData)
    expect(getByAltText(`logo_partner_${UserMock.profile.leadDetails.brokerOfficeId}`)).toBeInTheDocument()
  })
  it('renders prop image and routes to dashboard when clicked', async () => {
    expect.assertions(2)
    const push = jest
      .fn()(useRouter as jest.Mock)
      .mockImplementation(() => ({ push }))
    const { getByTestId } = renderComponent(desktopWidth, propsWithData)
    const image = getByTestId('image-wrapper')
    expect(image).toBeInTheDocument()
    await act(async () => {
      await userEvent.click(image)
    })
    expect(push).toHaveBeenCalledWith('/app/movepage')
  })
  it('renders users first letter of firstname', () => {
    expect.assertions(1)
    const { getByText } = renderComponent(desktopWidth, propsWithData)
    const firstLetter = getByText(UserMock.profile.firstName.charAt(0))
    expect(firstLetter).toBeInTheDocument()
  })
  it('renders users firstname', () => {
    expect.assertions(1)
    const { getByText } = renderComponent(desktopWidth, propsWithData)
    expect(getByText(UserMock.profile.firstName)).toBeInTheDocument()
  })
  it('renders menu items when circle/menu wrapper is pressed', async () => {
    expect.assertions(3)
    const { getByText, getByTestId } = renderComponent(desktopWidth, propsWithData)
    const menu = getByTestId('menu-trigger')
    await act(async () => {
      await userEvent.click(
        menu,
        new PointerEvent('pointerdown', {
          ctrlKey: false,
          button: 0,
        }),
      )
    })
    expect(await getByTestId('menu')).toBeInTheDocument()
    const Profile = 'profile'
    const Logout = 'logout'
    expect(getByText(Profile)).toBeInTheDocument()
    expect(getByText(Logout)).toBeInTheDocument()
  })
})
