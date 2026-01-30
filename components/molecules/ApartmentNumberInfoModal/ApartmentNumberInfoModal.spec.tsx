import React from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { render, waitFor } from '@testing-library/react'
import ApartmentNumberInfoModal from './ApartmentNumberInfoModal'

describe('ApartmentNumberInfoModal', () => {
  const desktopWidth = 1500

  const renderComponent = (simulatedWidth = desktopWidth) => {
    const width = { width: simulatedWidth }

    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <ApartmentNumberInfoModal showModal={true} setShowModal={jest.fn()} />
      </ResponsiveContext.Provider>,
    )
    return { ...utils }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders and shows title.', async () => {
    expect.assertions(1)
    renderComponent()

    await waitFor(() => {
      expect(screen.queryByText('APARTMENTINFOMODAL.title')).toBeInTheDocument()
    })
  })
})
