import React from 'react'
import { render, screen } from '@testing-library/react'
import ProgressBar from './ProgressBar'

describe('ProgressBar', () => {
  it('renders with correct title', () => {
    render(<ProgressBar title="Din framsteg" completed={2} total={5} countText="2 av 5 klara" />)
    expect(screen.getByText('Din framsteg')).toBeInTheDocument()
  })

  it('renders with correct completed count', () => {
    render(<ProgressBar title="Din framsteg" completed={2} total={5} countText="2 av 5 klara" />)
    expect(screen.getByText('2 av 5 klara')).toBeInTheDocument()
  })

  it('calculates correct percentage', () => {
    const { container } = render(<ProgressBar title="Din framsteg" completed={2} total={5} countText="2 av 5 klara" />)
    const progressFill = container.querySelector('[style*="width"]')
    expect(progressFill).toHaveStyle({ width: '40%' })
  })

  it('handles zero total gracefully', () => {
    const { container } = render(<ProgressBar title="Din framsteg" completed={0} total={0} countText="0 av 0 klara" />)
    const progressFill = container.querySelector('[style*="width"]')
    expect(progressFill).toHaveStyle({ width: '0%' })
  })

  it('applies custom className', () => {
    const { container } = render(<ProgressBar title="Din framsteg" completed={2} total={5} countText="2 av 5 klara" className="custom-class" />)
    const innerDiv = container.firstChild?.firstChild as HTMLElement
    expect(innerDiv).toHaveClass('custom-class')
  })
})
