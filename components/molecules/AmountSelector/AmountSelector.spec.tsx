import React from 'react'
import { act } from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AmountSelector, { AmountSelectorProps } from './AmountSelector'

describe('AmountSelector', () => {
  const desktopWidth = 1500
  const amountSelectorPropsData = {
    item: { name: 'Testname', price: '200' },
    addProduct: jest.fn(),
    removeProduct: jest.fn(),
  }
  const renderComponent = (simulatedWidth = desktopWidth, props: AmountSelectorProps = amountSelectorPropsData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <AmountSelector {...props} />
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
  it('renders plus and minus signs as button texts', () => {
    expect.assertions(2)
    const { getByText } = renderComponent(desktopWidth, amountSelectorPropsData)
    expect(getByText('+')).toBeInTheDocument()
    expect(getByText('-')).toBeInTheDocument()
  })
  it('renders with item quantity as 1 as default', () => {
    expect.assertions(1)
    const { getByText } = renderComponent(desktopWidth, amountSelectorPropsData)
    const initialAmount = '1'
    expect(getByText(initialAmount)).toBeInTheDocument()
  })
  it('updates quantity when pressing plus sign button', async () => {
    expect.assertions(1)
    const { getByText } = renderComponent(desktopWidth, amountSelectorPropsData)
    const increaseButton = getByText('+')
    const twiceIncreasedAmount = '3'
    await act(async () => {
      await userEvent.click(increaseButton)
    })
    await act(async () => {
      await userEvent.click(increaseButton)
    })
    expect(getByText(twiceIncreasedAmount)).toBeInTheDocument()
  })
  it('updates quantity when pressing plus and minus sign buttons', async () => {
    expect.assertions(1)
    const { getByText } = renderComponent(desktopWidth, amountSelectorPropsData)
    const increaseButton = getByText('+')
    const decreaseButton = getByText('-')
    await act(async () => {
      await userEvent.click(increaseButton)
    })
    await act(async () => {
      await userEvent.click(increaseButton)
    })
    await act(async () => {
      await userEvent.click(decreaseButton)
    })
    const twiceIncreasedAndOnceDecreasedAmount = '2'
    expect(getByText(twiceIncreasedAndOnceDecreasedAmount)).toBeInTheDocument()
  })
  it('calls addProduct prop function when clicking button', async () => {
    const { getByText } = renderComponent(desktopWidth, amountSelectorPropsData)
    const increaseButton = getByText('+')
    await act(async () => {
      await userEvent.click(increaseButton)
    })
    expect(amountSelectorPropsData.addProduct).toHaveBeenCalledWith({ item: { name: amountSelectorPropsData.item.name, price: amountSelectorPropsData.item.price }, quantity: 2 })
  })
  it('calls removeProduct prop function when clicking button', async () => {
    const { getByText } = renderComponent(desktopWidth, amountSelectorPropsData)
    const increaseButton = getByText('-')
    await act(async () => {
      await userEvent.click(increaseButton)
    })
    expect(amountSelectorPropsData.removeProduct).toHaveBeenCalledWith({
      item: { name: amountSelectorPropsData.item.name, price: amountSelectorPropsData.item.price },
      quantity: 0,
    })
  })
  it('should set quantity to provided quantity prop value', () => {
    const cartQuantity = '5'
    const { getByText } = renderComponent(desktopWidth, { ...amountSelectorPropsData, cartQuantity: 5 })
    expect(getByText(cartQuantity)).toBeInTheDocument()
  })
})
