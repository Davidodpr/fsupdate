import { ReactElement, useRef, useState } from 'react'
import useOnClickOutside from 'hooks/onClickOutside'
import * as Tooltip from '@radix-ui/react-tooltip'
import { popupVariants } from './Popup.variants'

export interface PopupProps {
  children: ReactElement
  text?: ReactElement | string | null
  textMargin?: boolean
  noUnderline?: boolean
  noBackground?: boolean
  withFluidWidth?: boolean
  popupHover?: boolean
}

const Popup = ({ children, text, textMargin = false, noUnderline = false, noBackground = false, withFluidWidth = false, popupHover = false }: PopupProps) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tooltipRef = useRef<HTMLElement>(null)

  // The ref for the arrow must be a callback ref
  useOnClickOutside(tooltipRef, buttonRef, () => {
    setShowTooltip(false)
  })

  if (!text) {
    return children
  }

  const backgroundClasses = popupVariants.background({
    visible: !popupHover && !noBackground && showTooltip,
  })

  const triggerClasses = popupVariants.trigger({
    noUnderline,
  })

  const contentClasses = popupVariants.content({
    textMargin,
    withFluidWidth,
    hoverFadeIn: popupHover,
  })

  const arrowClasses = popupVariants.arrow()

  return (
    <>
      <div
        className={backgroundClasses}
        // For hovering over we don't need the background
        onClick={(e) => {
          !popupHover && setShowTooltip(!showTooltip)
          e.stopPropagation()
        }}
        // In case you want to hover an element like in broadband flow
        // we use this instead to show popup
        onMouseEnter={(e) => {
          popupHover && setShowTooltip(true)
          e.stopPropagation()
        }}
        onMouseLeave={(e) => {
          popupHover && setShowTooltip(false)
          e.stopPropagation()
        }}
      />
      <Tooltip.Provider>
        <Tooltip.Root open={showTooltip}>
          <Tooltip.Trigger
            className={triggerClasses}
            ref={buttonRef}
            type="button"
            data-testid="popup-button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              !popupHover && setShowTooltip(!showTooltip)
              e.stopPropagation()
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
              popupHover && setShowTooltip(true)
              e.stopPropagation()
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              popupHover && setShowTooltip(false)
              e.stopPropagation()
            }}
            onBlur={() => setShowTooltip(false)}
          >
            {children}
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={contentClasses} onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => event.preventDefault()} data-testid="popup-content">
              {text}
              <Tooltip.Arrow className={arrowClasses} id="arrow" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  )
}

export default Popup
