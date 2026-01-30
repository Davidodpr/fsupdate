import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Box from './Box'

describe('Box', () => {
  const renderComponent = (props?: React.HtmlHTMLAttributes<HTMLDivElement>) => {
    const utils = render(<Box {...props} />)
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    expect.assertions(1)
    const { container } = renderComponent()
    const div = container.querySelector('div')
    expect(div?.tagName.toLowerCase()).toBe('div')
  })
})
