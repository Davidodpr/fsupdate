import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion'

jest.mock('@react-hook/resize-observer', () => jest.fn())

describe('Accordion', () => {
  const renderComponent = () => {
    const utils = render(
      <Accordion type="single">
        <AccordionItem value="a-1">
          <AccordionTrigger>trigger</AccordionTrigger>
          <AccordionContent>content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="a-2">
          <AccordionTrigger>trigger</AccordionTrigger>
          <AccordionContent>content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders.', () => {
    expect.assertions(1)
    const { container } = renderComponent()
    expect(container.firstChild).toBeInTheDocument()
  })
  it('renders two trigger buttons', () => {
    const { getAllByRole } = renderComponent()
    const buttons = getAllByRole('button', {
      name: /trigger/i,
    })
    expect(buttons).toHaveLength(2)
  })
})
