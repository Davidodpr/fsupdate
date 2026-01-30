import React from 'react'
import { act } from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import BankId from '@/public/images/BankId.svg'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button, { ButtonProps } from './Button'

describe('Button', () => {
  const desktopWidth = 1500
  const onClick = jest.fn()
  const propsWithData = { onClick: onClick, text: 'Button text' }
  const renderComponent = (simulatedWidth = desktopWidth, props: ButtonProps = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <Button {...props} />
      </ResponsiveContext.Provider>,
    )
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    expect.assertions(1)
    const { container } = renderComponent()
    expect(container.firstChild).not.toBeNull()
  })
  it('renders text from prop', () => {
    expect.assertions(1)
    const { getByText } = renderComponent(desktopWidth, propsWithData)
    expect(getByText('Button text')).toBeInTheDocument()
  })
  it('triggers onClick when button is pressed', async () => {
    expect.assertions(1)
    const { getByRole } = renderComponent(desktopWidth, propsWithData)
    const button = getByRole('button')
    await act(async () => {
      await userEvent.click(button)
    })
    expect(onClick).toHaveBeenCalled()
  })
  it('should render as a blue button if variant is not provided', () => {
    expect.assertions(1)
    const { getByRole } = renderComponent(desktopWidth, propsWithData)
    const button = getByRole('button')
    expect(button).toHaveStyle(`background: var(--fs-colors-secondaryMain)`)
  })
  it('should render as a transparent button if variant is ghost', () => {
    expect.assertions(1)
    const { getByRole } = renderComponent(desktopWidth, { onClick: onClick, text: 'Button text', variant: 'ghost' })
    const button = getByRole('button')
    expect(button).toHaveStyle(`background: 'transparent'`)
  })
  it('should render as a gray button if variant is gray', () => {
    expect.assertions(1)
    const { getByRole } = renderComponent(desktopWidth, { onClick: onClick, text: 'Button text', variant: 'gray' })
    const button = getByRole('button')
    expect(button).toHaveStyle(`background: var(--fs-colors-inactiveGreyLight)`)
  })
  it('should render as a transparent white button if variant is ghostInverted', () => {
    expect.assertions(1)
    const { getByRole } = renderComponent(desktopWidth, { onClick: onClick, text: 'Button text', variant: 'ghostInverted' })
    const button = getByRole('button')
    expect(button).toHaveStyle(`background: 'transparent'`)
  })
  it('should render as a orange button if variant is green', () => {
    expect.assertions(1)
    const { getByRole } = renderComponent(desktopWidth, { onClick: onClick, text: 'Button text', variant: 'green' })
    const button = getByRole('button')
    expect(button).toHaveStyle('background: var(--fs-colors-primaryMain)')
  })
  it('has a disabled state when disable prop is true', () => {
    expect.assertions(1)
    const { getByRole } = renderComponent(desktopWidth, { onClick: onClick, disabled: true, text: 'Button text' })
    const button = getByRole('button')
    expect(button).toHaveStyle('background: var(--fs-colors-inactiveMain)')
  })
  it('should render an icon to the left of text when iconLeft prop is provided', () => {
    expect.assertions(1)
    const { getByAltText } = renderComponent(desktopWidth, { onClick: onClick, iconLeft: <BankId alt="bankid-icon" />, text: 'Button text' })
    expect(getByAltText('bankid-icon')).toBeInTheDocument()
  })
  it('should render an icon to the right of text when iconright prop is true', () => {
    expect.assertions(1)
    const { getByAltText } = renderComponent(desktopWidth, { onClick: onClick, iconRight: <BankId alt="bankid-icon-right" />, text: 'Button text' })
    expect(getByAltText('bankid-icon-right')).toBeInTheDocument()
  })
})
