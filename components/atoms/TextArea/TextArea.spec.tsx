import React from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import QuestionMark from '@/public/images/Question_green.svg'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import TextArea, { TextAreaProps } from './TextArea'

describe('TextArea', () => {
  const desktopWidth = 1500
  const propsWithData = {
    label: 'Textarea label',
  }
  const renderComponent = (simulatedWidth = desktopWidth, props: TextAreaProps = propsWithData) => {
    const width = { width: simulatedWidth }
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <TextArea {...props} />
      </ResponsiveContext.Provider>,
    )
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    const { container } = renderComponent()
    expect(container.firstChild).not.toBeNull()
  })

  it('renders the label', () => {
    expect.assertions(1)
    const { getByText } = renderComponent()
    expect(getByText('Textarea label')).toBeInTheDocument()
  })
  it('Show an error message in case the error prop is send down', () => {
    expect.assertions(1)
    const { getByText } = renderComponent(desktopWidth, { ...propsWithData, error: 'This is an error message' })
    expect(getByText('This is an error message')).toBeInTheDocument()
  })
  it('display an icon in case the endicon is send down', () => {
    expect.assertions(1)
    const { getByAltText } = renderComponent(desktopWidth, { ...propsWithData, endIcon: <QuestionMark alt="end icon" /> })
    expect(getByAltText('end icon')).toBeInTheDocument()
  })
})
