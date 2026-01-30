import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import H2 from './H2'

describe('H2', () => {
  const renderComponent = (props?: React.HtmlHTMLAttributes<HTMLDivElement>) => {
    const utils = render(<H2 {...props} />)
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    expect.assertions(1)
    const { container } = renderComponent()
    const div = container.querySelector('h2')
    expect(div?.tagName.toLowerCase()).toBe('h2')
  })
})
