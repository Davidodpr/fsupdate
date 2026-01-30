import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import H3 from './H3'

describe('H3', () => {
  const renderComponent = (props?: React.HtmlHTMLAttributes<HTMLDivElement>) => {
    const utils = render(<H3 {...props} />)
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    expect.assertions(1)
    const { container } = renderComponent()
    const div = container.querySelector('h3')
    expect(div?.tagName.toLowerCase()).toBe('h3')
  })
})
