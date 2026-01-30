import React from 'react'
import { act } from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Popup, { PopupProps } from './Popup'

describe('Popup', () => {
  const desktopWidth = 1500
  const propsWithData = { children: <p>Hello world</p>, text: <p>Test content</p> }
  const renderComponent = (simulatedWidth = desktopWidth, props: PopupProps = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <Popup {...props} />
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
  it('renders a popup button with text as children', () => {
    const { getByText } = renderComponent(desktopWidth, propsWithData)
    expect(getByText('Hello world')).toBeInTheDocument()
  })
  it('renders popup content when button is clicked', async () => {
    const { getByTestId } = renderComponent(desktopWidth, propsWithData)
    const button = getByTestId('popup-button')
    await act(async () => {
      await userEvent.click(button)
    })
    expect(getByTestId('popup-content')).toBeInTheDocument()
  })
})
