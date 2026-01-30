import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import H1 from './H1'

describe('H1', () => {
  const renderComponent = (props?: React.HtmlHTMLAttributes<HTMLDivElement>) => {
    const utils = render(<H1 {...props} />)
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    expect.assertions(1)
    const { container } = renderComponent()
    const div = container.querySelector('h1')
    expect(div?.tagName.toLowerCase()).toBe('h1')
  })
})
