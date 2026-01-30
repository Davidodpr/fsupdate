import React from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import MinusIcon, { Props } from './MinusIcon'

describe('MinusIcon', () => {
  const desktopWidth = 1500
  const propsWithData = { color: 'black' }
  const renderComponent = (simulatedWidth = desktopWidth, props: Props = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <MinusIcon {...props} />
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
  it('should render proper color', async () => {
    expect.assertions(1)
    const { getByTestId } = renderComponent(desktopWidth, { color: 'black' })
    const container = getByTestId('icon-path')
    expect(container).toHaveAttribute('stroke', 'black')
  })
})
