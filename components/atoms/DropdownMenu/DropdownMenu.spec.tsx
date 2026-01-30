import React from 'react'
import { act } from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DropdownMenu, { Props } from './DropdownMenu'

describe('DropdownMenu', () => {
  const desktopWidth = 1500
  const propsWithData = { children: <p>Dropdown</p>, items: [{ label: 'Profile', onClick: () => jest.fn() }] }
  const renderComponent = (simulatedWidth = desktopWidth, props: Props = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <DropdownMenu {...props}>
          <p>Dropdown</p>
        </DropdownMenu>
      </ResponsiveContext.Provider>,
    )
    return { ...utils }
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    const { container } = renderComponent()
    expect(container.firstChild).not.toBeNull()
  })
  it('renders a dropdown button with component as children', () => {
    const { getByText } = renderComponent(desktopWidth, propsWithData)
    expect(getByText('Dropdown')).toBeInTheDocument()
  })
  it('renders dropdown content when button is clicked', async () => {
    expect.assertions(2)
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
    const Profile = 'Profile'
    expect(getByText(Profile)).toBeInTheDocument()
  })
})
