import React, { useState, useRef, ReactElement, useEffect, RefObject } from 'react'
import { clsx } from 'clsx'
import * as Tooltip from '@radix-ui/react-tooltip'

export interface PopupProps {
  children: ReactElement
  text: ReactElement | string | null
  textMargin?: boolean
  noUnderline?: boolean
  withFluidWidth?: boolean
  backgroundRef?: RefObject<HTMLDivElement | null>
  showBackground?: boolean
  showExternalTooltip?: boolean
  setShowExternalTooltip?: (i: boolean) => void
  setShowBackground?: (i: boolean) => void
  setCurrentIndexOfOpenedPopup?: (i: number | null) => void
  currentIndexOfOpenedPopup?: number | null
  currentPopupItemIndex?: number
}
const Popup = ({
  children,
  text,
  textMargin,
  noUnderline,
  withFluidWidth = false,
  showBackground,
  showExternalTooltip,
  setShowExternalTooltip,
  setShowBackground,
  setCurrentIndexOfOpenedPopup,
  currentPopupItemIndex,
  currentIndexOfOpenedPopup,
}: PopupProps) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Store callbacks in refs to avoid re-registering event listeners
  const callbacksRef = useRef({
    setShowBackground,
    setShowExternalTooltip,
    setCurrentIndexOfOpenedPopup,
  })

  // Update the ref when props change
  useEffect(() => {
    callbacksRef.current = {
      setShowBackground,
      setShowExternalTooltip,
      setCurrentIndexOfOpenedPopup,
    }
  })

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        callbacksRef.current.setShowBackground?.(false)
        setShowTooltip(false)
        callbacksRef.current.setCurrentIndexOfOpenedPopup?.(null)
        event.stopPropagation()
        if (callbacksRef.current.setShowExternalTooltip) {
          callbacksRef.current.setShowExternalTooltip(false)
        }
      }
    }
    document.addEventListener('click', handleOutSideClick)
    return () => {
      document.removeEventListener('click', handleOutSideClick)
    }
  }, []) // Now this is correctly empty with no missing dependencies

  useEffect(() => {
    if (currentIndexOfOpenedPopup && currentPopupItemIndex && currentIndexOfOpenedPopup !== currentPopupItemIndex && showTooltip) {
      setShowTooltip(false)
    }
  }, [currentIndexOfOpenedPopup, currentPopupItemIndex, showTooltip])

  if (!text) {
    return null
  }

  return (
    <div ref={wrapperRef}>
      <Tooltip.Provider>
        <Tooltip.Root open={showTooltip || showExternalTooltip ? true : false}>
          <Tooltip.Trigger
            className={clsx('cursor-pointer border-b border-dotted border-gray-500 bg-transparent p-0', noUnderline && 'border-none')}
            ref={buttonRef}
            data-testid="popup-button"
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              currentPopupItemIndex && setCurrentIndexOfOpenedPopup?.(currentPopupItemIndex)
              setShowBackground?.(!showBackground)
              setShowTooltip(!showTooltip)
              e.stopPropagation()
              if (setShowExternalTooltip) {
                setShowExternalTooltip(!showExternalTooltip)
              }
            }}
          >
            {children}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className={clsx(
                'z-50 rounded-md bg-white p-4 text-sm shadow-lg border border-gray-200',
                'data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade',
                'data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade',
                'data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade',
                'data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade',
                'select-none will-change-[transform,opacity]',
                withFluidWidth ? 'max-w-none' : 'max-w-xs',
                textMargin && 'm-2',
              )}
              ref={tooltipRef}
              sideOffset={5}
            >
              {text}
              <Tooltip.Arrow className="fill-white" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  )
}

export default Popup