// Clean exports for the new Tailwind-based Modal component
export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalTitle,
  ModalDescription,
  ModalClose,
  ModalOverlay,
  ModalWrapper,
  // Advanced exports for custom usage
  StyledOverlay,
  StyledContent,
  CloseButton,
  StyledTitle,
  StyledDescription,
  StyledModalWrapper,
  // Type exports
  type ModalOverlayVariants,
  type ModalContentVariants,
  type ModalCloseButtonVariants,
} from './Modal'

// Default export
export { Modal as default } from './Modal'

// Export variants for advanced usage
export { modalOverlayVariants, modalContentVariants, modalCloseButtonVariants, modalTitleVariants, modalDescriptionVariants, modalWrapperVariants } from './Modal.variants'
