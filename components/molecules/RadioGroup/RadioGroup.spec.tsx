import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup, RadioItem, RadioIndicator, Label } from './RadioGroup'

describe('RadioGroup', () => {
  const radio1Value = 'Default'
  const radio2Value = 'Test'
  const renderComponent = () => {
    const utils = render(
      <RadioGroup defaultValue={radio1Value}>
        <RadioItem value={radio1Value}>
          <RadioIndicator />
          <Label htmlFor={radio1Value}>{radio1Value}</Label>
        </RadioItem>
        <RadioItem value={radio2Value}>
          <RadioIndicator />
          <Label htmlFor={radio2Value}>{radio2Value}</Label>
        </RadioItem>
      </RadioGroup>,
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
  it('renders a radiogroup', () => {
    expect.assertions(1)
    const { getByRole } = renderComponent()
    expect(getByRole('radiogroup')).toBeInTheDocument()
  })
  it('should render two labels with text', () => {
    expect.assertions(2)
    const { getByText } = renderComponent()
    expect(getByText(radio1Value)).not.toBeNull()
    expect(getByText(radio1Value)).not.toBeNull()
  })
  it('should render to radio buttons with provided names as value', () => {
    expect.assertions(2)
    const { getByRole } = renderComponent()
    expect(getByRole('radio', { name: radio1Value })).toBeInTheDocument()
    expect(getByRole('radio', { name: radio2Value })).toBeInTheDocument()
  })
  it('should render with first radio button as checked', () => {
    expect.assertions(2)
    const { getByRole } = renderComponent()
    expect(getByRole('radio', { name: radio1Value, checked: true })).toBeInTheDocument()
    expect(getByRole('radio', { name: radio2Value, checked: false })).toBeInTheDocument()
  })
  it('sets the second radio button as checked when clicked', async () => {
    expect.assertions(4)
    const { getByRole } = renderComponent()
    const secondButton = getByRole('radio', { name: radio2Value, checked: false })
    expect(getByRole('radio', { name: radio1Value, checked: true })).toBeInTheDocument()
    expect(getByRole('radio', { name: radio2Value, checked: false })).toBeInTheDocument()
    await userEvent.click(secondButton)
    expect(getByRole('radio', { name: radio1Value, checked: false })).toBeInTheDocument()
    expect(getByRole('radio', { name: radio2Value, checked: true })).toBeInTheDocument()
  })
})
