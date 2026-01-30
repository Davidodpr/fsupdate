import { Context as ResponsiveContext } from 'react-responsive'
import { userBuyerWithAllInfoMock } from '__mocks__/UserBuyerWithAllInfoMock'
import { CreateUserContext, UserProvider } from '@/common/context/user/UserProvider'
import '@testing-library/jest-dom'
import { act, render, waitFor, screen } from '@testing-library/react'
import ProfileModal, { NewUserModalProps } from './ProfileModal'

describe('ProfileModal', () => {
  const desktopWidth = 1500
  const context = CreateUserContext()
  const propsWithData = {
    isOpen: true,
    onClickClose: jest.fn(),
  }
  const renderComponent = (simulatedWidth = desktopWidth, props: NewUserModalProps = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <UserProvider defaultValueUser={userBuyerWithAllInfoMock as unknown as User} context={context}>
        <ResponsiveContext.Provider value={width}>
          <ProfileModal {...props} />
        </ResponsiveContext.Provider>
      </UserProvider>,
    )
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders title text', async () => {
    expect.assertions(1)
    await act(() => {
      renderComponent()
    })
    await waitFor(() => {
      expect(screen.getByText('PROFILE.myContactInformation')).toBeInTheDocument()
    })
  })
})
