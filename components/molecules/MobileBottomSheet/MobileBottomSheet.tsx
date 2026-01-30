'use client'

import React, { useRef } from 'react'
import { Close, Content, Overlay, Portal, Root } from '@radix-ui/react-dialog'
import { clsx } from 'clsx'
import { motion, AnimatePresence, useMotionValue, PanInfo, useDragControls } from 'framer-motion'
import CloseButtonImage from '@/public/images/Close_medium.svg'

interface MobileBottomSheetProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  withCloseButton?: boolean
  className?: string
  showDragHandle?: boolean
}

const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({ open, onClose, children, withCloseButton = true, className, showDragHandle = true }) => {
  const y = useMotionValue(0)
  const sheetRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const shouldClose = info.velocity.y > 500 || (info.velocity.y >= 0 && info.offset.y > 150)

    if (shouldClose) {
      onClose()
    }
  }

  const startDrag = (event: React.PointerEvent) => {
    dragControls.start(event)
  }

  return (
    <Root open={open}>
      <AnimatePresence>
        {open && (
          <Portal forceMount>
            {/* Animated Overlay */}
            <Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] bg-black/30"
                onClick={onClose}
              />
            </Overlay>

            {/* Animated Bottom Sheet Content */}
            <Content asChild forceMount>
              <motion.div
                ref={sheetRef}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{
                  duration: 0.3,
                  ease: [0.32, 0.72, 0, 1],
                }}
                style={{ y }}
                drag="y"
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={{ top: 0 }}
                dragElastic={{ top: 0, bottom: 0.5 }}
                onDragEnd={handleDragEnd}
                className={clsx(
                  // Fixed positioning at bottom
                  'fixed bottom-0 left-0 right-0 z-[101]',
                  // Dimensions
                  'w-full h-[90vh]',
                  // Appearance
                  'bg-white rounded-t-[20px]',
                  'shadow-[0_-4px_24px_rgba(0,0,0,0.15)]',
                  // Focus
                  'focus:outline-none',
                  className,
                )}
              >
                {/* Drag Handle */}
                {showDragHandle && (
                  <div onPointerDown={startDrag} className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none">
                    <div className="w-10 h-1 bg-[#767678]/30 rounded-full"></div>
                  </div>
                )}

                {children}

                {/* Close Button */}
                {withCloseButton && (
                  <Close className="absolute right-2 top-2 z-[102] bg-white border-none hover:cursor-pointer" aria-label="Close" onClick={onClose}>
                    <CloseButtonImage />
                  </Close>
                )}
              </motion.div>
            </Content>
          </Portal>
        )}
      </AnimatePresence>
    </Root>
  )
}

export default MobileBottomSheet
