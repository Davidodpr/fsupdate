import React, { ReactNode } from 'react'
import LargeCloseButton from '@/public/images/Close_large.svg'
import CloseButtonImage from '@/public/images/Close_medium.svg'
import { Close, Description, Content as DialogContent, Overlay, Portal, Root, Title, Trigger } from '@radix-ui/react-dialog'
import { clsx } from 'clsx'
import {
  modalOverlayVariants,
  modalContentVariants,
  modalCloseButtonVariants,
  modalTitleVariants,
  modalDescriptionVariants,
  modalWrapperVariants,
  type ModalOverlayVariants,
  type ModalContentVariants,
  type ModalCloseButtonVariants,
} from './Modal.variants'

// Modal Overlay Component
const StyledOverlay = React.forwardRef<React.ElementRef<typeof Overlay>, React.ComponentPropsWithoutRef<typeof Overlay> & ModalOverlayVariants>(
  ({ className, withOverlayClose, ...props }, ref) => <Overlay ref={ref} className={clsx(modalOverlayVariants({ withOverlayClose }), className)} {...props} />,
)
StyledOverlay.displayName = 'StyledOverlay'

// Modal Content Component
const StyledContent = React.forwardRef<React.ElementRef<typeof DialogContent>, React.ComponentPropsWithoutRef<typeof DialogContent> & ModalContentVariants>(
  ({ className, size, fullScreenMobile, bottomSheet, withAllOverflow, dynamicWidth, withLessPadding, ...props }, ref) => (
    <DialogContent
      ref={ref}
      className={clsx(
        modalContentVariants({
          size,
          fullScreenMobile,
          bottomSheet,
          withAllOverflow,
          dynamicWidth,
          withLessPadding,
        }),
        className,
      )}
      {...props}
    />
  ),
)
StyledContent.displayName = 'StyledContent'

// Modal Close Button Component
const CloseButton = React.forwardRef<React.ElementRef<typeof Close>, React.ComponentPropsWithoutRef<typeof Close> & ModalCloseButtonVariants>(
  ({ className, bigCloseButton, children, ...props }, ref) => (
    <Close ref={ref} className={clsx(modalCloseButtonVariants({ bigCloseButton }), className)} {...props}>
      {children}
    </Close>
  ),
)
CloseButton.displayName = 'CloseButton'

// Modal Title Component
const StyledTitle = React.forwardRef<React.ElementRef<typeof Title>, React.ComponentPropsWithoutRef<typeof Title>>(({ className, ...props }, ref) => (
  <Title ref={ref} className={clsx(modalTitleVariants(), className)} {...props} />
))
StyledTitle.displayName = 'StyledTitle'

// Modal Description Component
const StyledDescription = React.forwardRef<React.ElementRef<typeof Description>, React.ComponentPropsWithoutRef<typeof Description>>(({ className, ...props }, ref) => (
  <Description ref={ref} className={clsx(modalDescriptionVariants(), className)} {...props} />
))
StyledDescription.displayName = 'StyledDescription'

// Modal Wrapper Component
const StyledModalWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx(modalWrapperVariants(), className)} {...props} />
))
StyledModalWrapper.displayName = 'StyledModalWrapper'

// Main Content Component with all the logic
const Content = ({
  children,
  setShowModal,
  size = 'large',
  withCloseButton = false,
  bigCloseButton = false,
  withOverlay = true,
  withAllOverflow = false,
  withOverlayClose = true,
  dynamicWidth = false,
  fullScreenMobile = false,
  bottomSheet = false,
  withLessPadding = false,
  customOverlayClose,
  className,
  ref,
  ...props
}: {
  children: ReactNode
  size?: 'small' | 'medium' | 'large'
  withAllOverflow?: boolean
  setShowModal: (arg0: boolean) => void
  withCloseButton?: boolean
  bigCloseButton?: boolean
  withOverlayClose?: boolean
  dynamicWidth?: boolean
  withOverlay?: boolean
  fullScreenMobile?: boolean
  bottomSheet?: boolean
  withLessPadding?: boolean
  customOverlayClose?: () => void
  className?: string
  ref?: React.Ref<HTMLDivElement>
}) => (
  <Portal>
    {withOverlay && (
      <StyledOverlay
        data-testid="overlay"
        withOverlayClose={withOverlayClose}
        onClick={() => {
          withOverlayClose && setShowModal(false)
          customOverlayClose && customOverlayClose()
        }}
      />
    )}
    <StyledContent
      ref={ref}
      withLessPadding={withLessPadding}
      fullScreenMobile={fullScreenMobile}
      bottomSheet={bottomSheet}
      withAllOverflow={withAllOverflow}
      size={size}
      dynamicWidth={dynamicWidth}
      className={className}
      {...props}
    >
      {children}
      {withCloseButton && (
        <CloseButton bigCloseButton={bigCloseButton} aria-label="Close" onClick={() => setShowModal(false)}>
          {bigCloseButton ? <LargeCloseButton /> : <CloseButtonImage />}
        </CloseButton>
      )}
    </StyledContent>
  </Portal>
)

// Exports
export const Modal = Root
export const ModalTrigger = Trigger
export const ModalContent = Content
export const ModalTitle = StyledTitle
export const ModalDescription = StyledDescription
export const ModalClose = Close
export const ModalOverlay = StyledOverlay
export const ModalWrapper = StyledModalWrapper

// Export styled components for advanced usage
export { StyledOverlay, StyledContent, CloseButton, StyledTitle, StyledDescription, StyledModalWrapper }

// Export types
export type { ModalOverlayVariants, ModalContentVariants, ModalCloseButtonVariants }

// Default export
export default Modal
