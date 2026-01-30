import React from 'react'
import { act } from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// TODO: Update to Tailwind version when Modal is migrated
import { Modal, ModalContent, ModalTrigger, ModalTitle, ModalDescription } from './Modal'

describe('Modal (New Tailwind Version)', () => {
  const desktopWidth = 1500
  const modalText = 'Test content'
  const modalTitle = 'Test Modal Title'
  const modalDescription = 'Test modal description'

  const renderComponent = (simulatedWidth = desktopWidth, modalProps: Partial<Parameters<typeof ModalContent>[0]> = {}) => {
    const width = { width: simulatedWidth }
    const setShowModal = jest.fn()
    const utils = render(
      <ResponsiveContext.Provider value={width}>
        <Modal>
          <ModalTrigger />
          <ModalContent withOverlayClose={true} withCloseButton setShowModal={setShowModal} {...modalProps}>
            <ModalTitle>{modalTitle}</ModalTitle>
            <ModalDescription>{modalDescription}</ModalDescription>
            {modalText}
          </ModalContent>
        </Modal>
      </ResponsiveContext.Provider>,
    )
    return { ...utils, setShowModal }
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    expect.assertions(1)
    const { container } = renderComponent()
    expect(container.firstChild).not.toBeNull()
  })

  it('should open modal container when trigger is pressed with text and close button', async () => {
    expect.assertions(4)
    const { getByRole, getByText, getByLabelText, queryByText } = renderComponent()
    const container = getByRole('button')

    expect(queryByText(modalText)).toBeNull()

    await act(async () => {
      await userEvent.click(container)
    })

    expect(getByLabelText('Close')).toBeInTheDocument()
    expect(getByText(modalText)).toBeInTheDocument()
    expect(getByText(modalTitle)).toBeInTheDocument()
  })

  it('renders an overlay by default', async () => {
    expect.assertions(1)
    const { getByTestId, getByRole } = renderComponent()
    const container = getByRole('button')

    await act(async () => {
      await userEvent.click(container)
    })

    expect(getByTestId('overlay')).toBeInTheDocument()
  })

  it('renders modal text and description', async () => {
    expect.assertions(2)
    const { getByRole, getByText } = renderComponent()
    const container = getByRole('button')

    await act(async () => {
      await userEvent.click(container)
    })

    expect(getByText(modalText)).toBeInTheDocument()
    expect(getByText(modalDescription)).toBeInTheDocument()
  })

  it('handles different sizes correctly', async () => {
    expect.assertions(3)

    // Test small size
    const { getByRole: getByRoleSmall, unmount: unmountSmall } = render(
      <Modal>
        <ModalTrigger />
        <ModalContent size="small" setShowModal={jest.fn()}>
          Small modal
        </ModalContent>
      </Modal>,
    )

    await act(async () => {
      await userEvent.click(getByRoleSmall('button'))
    })

    const smallModal = screen.getByRole('dialog')
    expect(smallModal).toHaveClass('max-w-[360px]')
    unmountSmall()

    // Test medium size
    const { getByRole: getByRoleMedium, unmount: unmountMedium } = render(
      <Modal>
        <ModalTrigger />
        <ModalContent size="medium" setShowModal={jest.fn()}>
          Medium modal
        </ModalContent>
      </Modal>,
    )

    await act(async () => {
      await userEvent.click(getByRoleMedium('button'))
    })

    const mediumModal = screen.getByRole('dialog')
    expect(mediumModal).toHaveClass('max-w-[450px]')
    unmountMedium()

    // Test large size (default)
    const { getByRole: getByRoleLarge } = render(
      <Modal>
        <ModalTrigger />
        <ModalContent size="large" setShowModal={jest.fn()}>
          Large modal
        </ModalContent>
      </Modal>,
    )

    await act(async () => {
      await userEvent.click(getByRoleLarge('button'))
    })

    const largeModal = screen.getByRole('dialog')
    expect(largeModal).toHaveClass('max-w-[900px]')
  })

  it('handles fullScreenMobile variant correctly', async () => {
    expect.assertions(1)
    const { getByRole } = render(
      <Modal>
        <ModalTrigger />
        <ModalContent fullScreenMobile={true} setShowModal={jest.fn()}>
          Full screen mobile modal
        </ModalContent>
      </Modal>,
    )

    await act(async () => {
      await userEvent.click(getByRole('button'))
    })

    const modal = screen.getByRole('dialog')
    expect(modal).toHaveClass('w-screen', 'h-screen')
  })

  it('handles dynamicWidth variant correctly', async () => {
    expect.assertions(1)
    const { getByRole } = render(
      <Modal>
        <ModalTrigger />
        <ModalContent dynamicWidth={true} setShowModal={jest.fn()}>
          Dynamic width modal
        </ModalContent>
      </Modal>,
    )

    await act(async () => {
      await userEvent.click(getByRole('button'))
    })

    const modal = screen.getByRole('dialog')
    expect(modal).toHaveClass('w-auto')
  })

  it('handles withAllOverflow variant correctly', async () => {
    expect.assertions(1)
    const { getByRole } = render(
      <Modal>
        <ModalTrigger />
        <ModalContent withAllOverflow={true} setShowModal={jest.fn()}>
          Overflow visible modal
        </ModalContent>
      </Modal>,
    )

    await act(async () => {
      await userEvent.click(getByRole('button'))
    })

    const modal = screen.getByRole('dialog')
    expect(modal).toHaveClass('overflow-visible')
  })

  it('handles withLessPadding variant correctly', async () => {
    expect.assertions(1)
    const { getByRole } = render(
      <Modal>
        <ModalTrigger />
        <ModalContent withLessPadding={true} setShowModal={jest.fn()}>
          Less padding modal
        </ModalContent>
      </Modal>,
    )

    await act(async () => {
      await userEvent.click(getByRole('button'))
    })

    const modal = screen.getByRole('dialog')
    expect(modal).toHaveClass('p-4')
  })

  it('does not render overlay when withOverlay is false', async () => {
    expect.assertions(1)
    const { getByRole, queryByTestId } = render(
      <Modal>
        <ModalTrigger />
        <ModalContent withOverlay={false} setShowModal={jest.fn()}>
          No overlay modal
        </ModalContent>
      </Modal>,
    )

    await act(async () => {
      await userEvent.click(getByRole('button'))
    })

    expect(queryByTestId('overlay')).not.toBeInTheDocument()
  })

  it('calls setShowModal when close button is clicked', async () => {
    expect.assertions(1)
    const setShowModal = jest.fn()
    const { getByRole, getByLabelText } = render(
      <Modal>
        <ModalTrigger />
        <ModalContent withCloseButton setShowModal={setShowModal}>
          Modal with close button
        </ModalContent>
      </Modal>,
    )

    await act(async () => {
      await userEvent.click(getByRole('button'))
    })

    await act(async () => {
      await userEvent.click(getByLabelText('Close'))
    })

    expect(setShowModal).toHaveBeenCalledWith(false)
  })

  it('renders overlay with correct click behavior properties', async () => {
    expect.assertions(2)
    const setShowModal = jest.fn()
    const { getByRole, getByTestId } = render(
      <Modal>
        <ModalTrigger />
        <ModalContent setShowModal={setShowModal} withOverlayClose={true}>
          Modal with overlay close
        </ModalContent>
      </Modal>,
    )

    await act(async () => {
      await userEvent.click(getByRole('button'))
    })

    const overlay = getByTestId('overlay')
    // Verify the overlay is rendered
    expect(overlay).toBeInTheDocument()
    // Verify overlay has the cursor pointer class when withOverlayClose is true
    expect(overlay).toHaveClass('hover:cursor-pointer')
  })
})
