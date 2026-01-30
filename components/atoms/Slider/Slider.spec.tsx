import React from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Slider, { Props } from './Slider'

describe('Slider', () => {
  const desktopWidth = 1500
  const propsWithData = { mainText: 'label text', additionalText: '' }
  const renderComponent = (simulatedWidth = desktopWidth, props: Props = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <Slider {...props} />
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
  it('should render label text', async () => {
    const { getByTestId } = renderComponent(desktopWidth, { ...propsWithData, value: [60] })
    expect(getByTestId('main-label')).toHaveTextContent(propsWithData.mainText)
  })
})
