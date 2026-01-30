import React from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Text from './Text'

describe('Text', () => {
  const desktopWidth = 1500
  const renderComponent = (simulatedWidth = desktopWidth) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <Text role="paragraph" />
      </ResponsiveContext.Provider>,
    )
    return { ...utils }
  }
  it('renders.', () => {
    const { container } = renderComponent()
    expect(container.firstChild).not.toBeNull()
  })
  it('renders a p element', () => {
    const { getByRole } = renderComponent()
    expect(getByRole('paragraph')).not.toBeNull()
  })
})
