import { act } from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ServiceAlreadyBooked, { ServiceAlreadyBookedProps } from './ServiceAlreadyBooked'

describe.skip('ServiceAlreadyBooked', () => {
  const desktopWidth = 1500
  const propsWithData = {
    //Add default props here
  }
  const renderComponent = (simulatedWidth = desktopWidth, props: ServiceAlreadyBookedProps = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <ServiceAlreadyBooked {...props} />
      </ResponsiveContext.Provider>,
    )
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    const { container, debug } = renderComponent()
    debug()
    expect(container.firstChild).not.toBeNull()
  })
  it('Acts with act.', async () => {
    expect.assertions(1)
    const { getByTestId } = renderComponent()
    const container = getByTestId('service-already-booked-container')
    await act(async () => {
      await userEvent.click(container)
    })
    expect(container).toBeInTheDocument()
  })
})
