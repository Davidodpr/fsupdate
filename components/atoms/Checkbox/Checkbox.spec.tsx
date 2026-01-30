import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Checkbox, { CheckboxProps } from './Checkbox'

describe('Checkbox', () => {
  const propsWithData = {
    color: undefined,
    label: <span>Label</span>,
    error: 'error',
    bigger: true,
  }

  const renderComponent = (props: CheckboxProps = propsWithData) => {
    const utils = render(<Checkbox {...props} />)
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    const { container } = renderComponent()
    expect(container.firstChild).not.toBeNull()
  })

  it('renders text from prop', () => {
    expect.assertions(1)
    const { getByText } = renderComponent(propsWithData)
    expect(getByText('Label')).toBeInTheDocument()
  })

  it('renders error text from prop', () => {
    expect.assertions(1)
    const { getByText } = renderComponent(propsWithData)
    expect(getByText('error')).toBeInTheDocument()
  })

  it('not renders error text if there are no errors', () => {
    expect.assertions(1)
    const { queryByText } = renderComponent({ ...propsWithData, error: '' })
    expect(queryByText('error')).toBeNull()
  })

  it('renders bigger checkbox if provided in props', () => {
    expect.assertions(1)
    const { getByRole } = renderComponent(propsWithData)
    expect(getByRole('checkbox')).toBeInTheDocument()
  })
})
