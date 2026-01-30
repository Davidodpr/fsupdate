import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import UniqueSellingPoint, { USPProps } from './UniqueSellingPoint'

describe('UniqueSellingPoint', () => {
  const desktopWidth = 1500
  const icon = 'https://picsum.photos/id/240/200/300'
  const text = 'test text'
  const header = 'header text'
  const propsWithData = { icon, text, header }
  const renderComponent = (simulatedWidth = desktopWidth, props: USPProps = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <UniqueSellingPoint {...props} />
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
    expect(getByText(text)).toBeInTheDocument()
  })
  it('renders header from prop', () => {
    expect.assertions(1)
    const { getByText } = renderComponent(desktopWidth, propsWithData)
    expect(getByText(header)).toBeInTheDocument()
  })
  it('renders icon when prop is provided', () => {
    expect.assertions(1)
    const { getByAltText } = renderComponent(desktopWidth, propsWithData)
    expect(getByAltText(header)).toBeInTheDocument()
  })
})
