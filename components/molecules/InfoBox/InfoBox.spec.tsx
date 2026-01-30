import { act } from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import Image from 'next/legacy/image'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InfoBox, { InfoBoxProps } from './InfoBox'

describe('AlarmProduct', () => {
  const desktopWidth = 1500
  const propsWithData = {
    title: 'Test title',
    callText: 'Call text',
    chatText: 'Chat text',
    text: <div>Test</div>,
    openChat: jest.fn(),
    phoneIcon: <Image src="https://picsum.photos/id/237/200/300" width={24} height={24} alt="Phone icon" />,
  }
  const renderComponent = (simulatedWidth = desktopWidth, props: InfoBoxProps = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <InfoBox {...props} />
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
  it('renders title from props', () => {
    expect.assertions(1)
    const { getByText } = renderComponent(desktopWidth, propsWithData)
    expect(getByText(propsWithData.title)).toBeInTheDocument()
  })
  it('renders button and calltext from props', () => {
    expect.assertions(1)
    const { getByText } = renderComponent(desktopWidth, propsWithData)
    expect(getByText(propsWithData.callText, { selector: 'button' })).toBeInTheDocument()
  })
  it('renders button and chattext from props', () => {
    expect.assertions(1)
    const { getByText } = renderComponent(desktopWidth, propsWithData)
    expect(getByText(propsWithData.chatText, { selector: 'button' })).toBeInTheDocument()
  })
  it('calls open chat function when chat button is pressed', async () => {
    expect.assertions(1)
    const { getByText } = renderComponent(desktopWidth, propsWithData)
    const chatButton = getByText(propsWithData.chatText, { selector: 'button' })
    await act(async () => {
      await userEvent.click(chatButton)
    })
    expect(propsWithData.openChat).toHaveBeenCalled()
  })
  it('renders phone icon image with alt text', () => {
    expect.assertions(1)
    const { getByAltText } = renderComponent(desktopWidth, propsWithData)
    expect(getByAltText('Phone icon')).toBeInTheDocument()
  })
  it('renders checkmark icon image with alt text as default image', () => {
    expect.assertions(1)
    const { getByAltText } = renderComponent(desktopWidth, propsWithData)
    expect(getByAltText('Checkmark')).toBeInTheDocument()
  })
  it('renders provided image icon with alt text when props are provided', () => {
    expect.assertions(1)
    const { getByAltText } = renderComponent(desktopWidth, { ...propsWithData, icon: 'https://picsum.photos/id/237/200/300', alt: 'Test icon' })
    expect(getByAltText('Test icon')).toBeInTheDocument()
  })
  it('renders provided image icon with alt text when props are provided', () => {
    expect.assertions(2)
    const borderColor = 'var(--fs-colors-primaryMain)'
    const { getByTestId } = renderComponent(desktopWidth, { ...propsWithData, borderColor })
    const wrapper = getByTestId('Infobox-container')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveStyle(`border-color: ${borderColor};`)
  })
})
