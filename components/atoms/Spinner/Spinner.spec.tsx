import React from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Spinner, { SpinnerProps } from './Spinner'

describe('Spinner', () => {
  const desktopWidth = 1500
  const renderComponent = (simulatedWidth = desktopWidth, props: SpinnerProps = {}) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <Spinner {...props} />
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
  it('renders with default color attribute', async () => {
    expect.assertions(1)
    const { container } = renderComponent()
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('stroke-[var(--color-black-main)]')
  })
  it('renders with provided color attribute', async () => {
    expect.assertions(1)
    const { container } = renderComponent(desktopWidth, { color: 'green' })
    const svg = container.querySelector('svg')
    expect(svg).toHaveClass('stroke-[var(--color-tertiary-main)]')
  })
  it('renders with default scale attribute', async () => {
    expect.assertions(1)
    const { getByTestId } = renderComponent()
    const spinnerWrapper = getByTestId('spinner-wrapper')
    expect(spinnerWrapper).toHaveClass('scale-100')
  })
  it('should set transform scale based on prop', () => {
    expect.assertions(1)
    const { getByTestId } = renderComponent(desktopWidth, { scale: 2 })
    const spinnerWrapper = getByTestId('spinner-wrapper')
    expect(spinnerWrapper).toHaveClass('scale-200')
  })
})
