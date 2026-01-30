import { Context as ResponsiveContext } from 'react-responsive'
import { WEEKDAYS_SHORT } from '@/constants/dateNames'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import DatePicker, { DatePickerProps } from './DatePicker'

jest.mock('', () => {
  return { logout: jest.fn() }
})
jest.mock('react-day-picker/lib/style.css', () => {
  {
  }
})
const propsWithData = {
  buttonText: 'Test button text',
}

describe.skip('ProductCards', () => {
  const desktopWidth = 1500
  const renderComponent = (simulatedWidth = desktopWidth, props: DatePickerProps = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <DatePicker {...props} />
      </ResponsiveContext.Provider>,
    )
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    const { container } = renderComponent(desktopWidth)
    expect(container.firstChild).not.toBeNull()
  })
  it('should render input button.', async () => {
    expect.assertions(1)
    const { getByTestId } = renderComponent(desktopWidth)
    const inputButton = getByTestId('input-button')
    expect(inputButton).toBeInTheDocument()
  })
  it('should render a calendar image', () => {
    expect.assertions(1)
    const { getByAltText } = renderComponent()
    expect(getByAltText('Kalender')).toBeInTheDocument()
  })
  it('should render a placeholder when prop is provided', () => {
    expect.assertions(1)
    const { getByText } = renderComponent(desktopWidth, { ...propsWithData, placeholder: 'Placeholder' })
    expect(getByText('Placeholder')).toBeInTheDocument()
  })
  it('should render shortened days when clicking the input button, ie. the datepicker is visible', () => {
    expect.assertions(WEEKDAYS_SHORT['sv'].length + 1)
    const { getByTestId, getByText } = renderComponent(desktopWidth, propsWithData)
    const inputButton = getByTestId('input-button')
    expect(inputButton).toBeInTheDocument()
    fireEvent.click(inputButton)
    WEEKDAYS_SHORT['sv'].forEach((element) => {
      expect(getByText(element)).toBeInTheDocument()
    })
  })
  it('should not be able to select a day in the next week if disableNextWeek prop is true', () => {
    expect.assertions(1)
    const setDatePicked = jest.fn()
    const { getByTestId, getByText, queryByDisplayValue, getAllByText } = renderComponent(desktopWidth, {
      ...propsWithData,
      setDatePicked: setDatePicked,
      disableNextWeek: true,
    })
    const inputButton = getByTestId('input-button')
    fireEvent.click(inputButton)
    const firstDay = new Date()
    const nextDay = new Date(firstDay.getTime() + 1 * 24 * 60 * 60 * 1000)
    const dayButton = getAllByText(nextDay.getDate())[0]
    fireEvent.click(dayButton)
    fireEvent.click(getByText(propsWithData.buttonText, { selector: 'button' }))

    const formatedDate = `${nextDay.toLocaleDateString('sv' as string)} (${Intl.DateTimeFormat('sv' as string, { weekday: 'long' })
      .format(nextDay)
      .toLowerCase()}${'sv' === 'sv' ? 'ar' : 's'})`
    expect(queryByDisplayValue(formatedDate)).not.toBeInTheDocument()
  })
  it('should render a disabled container if disabled prop is provided', () => {
    expect.assertions(2)
    const { getByTestId } = renderComponent(desktopWidth, { ...propsWithData, disabled: true })
    const disabledContainer = getByTestId('disabled')
    expect(disabledContainer).toBeInTheDocument()
    expect(disabledContainer).toHaveStyle(`background: var(--fs-colors-inactiveMain);`)
  })
})
