import { act } from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AccordionItem, { AccordionItemProps } from './AccordionItem'

describe('AccordionItem', () => {
  const desktopWidth = 1500
  const propsWithData = {
    question: 'Hello',
    answer: <div>Hello to you!</div>,
    iconClosed: 'https://picsum.photos/id/237/200/300',
    alt: 'Icon',
  }
  const renderComponent = (simulatedWidth = desktopWidth, props: AccordionItemProps = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <AccordionItem {...props} />
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
  it('should render question and answer if provided', () => {
    expect.assertions(2)
    const { getByText } = renderComponent(desktopWidth, propsWithData)
    expect(getByText('Hello')).toBeInTheDocument()
    expect(getByText('Hello to you!')).toBeInTheDocument()
  })
  it('should render icons', () => {
    expect.assertions(2)
    const { getByTestId } = renderComponent(desktopWidth, propsWithData)
    expect(getByTestId('iconClosed')).toBeInTheDocument()
    expect(getByTestId('Arrow up')).toBeInTheDocument()
  })
  it('changes arrow icon when question is clicked', async () => {
    expect.assertions(1)
    const { getByTestId } = renderComponent(desktopWidth, propsWithData)
    await act(async () => {
      await userEvent.click(getByTestId('AccordionItem-wrapper'))
    })
    expect(getByTestId('Arrow down')).toBeInTheDocument()
  })
  it('should render wrapper with expanded styles when clicked', async () => {
    expect.assertions(1)
    const { getByTestId } = renderComponent(desktopWidth, propsWithData)
    await act(async () => {
      await userEvent.click(getByTestId('AccordionItem-wrapper'))
    })
    // When expanded, the wrapper should have a height style set
    const wrapper = getByTestId('AccordionItem-wrapper')
    expect(wrapper).toHaveStyle('transition: height 100ms ease-in-out')
  })
})
