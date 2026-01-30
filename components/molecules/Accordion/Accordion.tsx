import React from 'react'
import { isSafari, isIOS } from 'react-device-detect'
import { clsx } from 'clsx'
import { mergeRefs } from '@/common/helpers/mergeRefs'
import ArrowDown from '@/public/images/Arrow-Up.svg'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import useResizeObserver from '@react-hook/resize-observer'
import {
  accordionItemVariants,
  accordionHeaderVariants,
  accordionTriggerVariants,
  accordionContentVariants,
  accordionContentTextVariants,
  accordionChevronVariants,
} from './Accordion.variants'

// Root component
export const Accordion = AccordionPrimitive.Root

// Item component
export const AccordionItem = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Item>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      className={clsx(
        accordionItemVariants(),
        // Add custom link styles for accordion content
        '[&_a]:text-white [&_a]:font-bold [&_a]:underline',
        className,
      )}
      {...props}
    />
  ),
)
AccordionItem.displayName = 'AccordionItem'

// Trigger component
export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    lessHeight?: boolean
    noOpenedStateStyling?: boolean
  }
>(({ className, children, lessHeight = false, noOpenedStateStyling = false, ...props }, ref) => (
  <AccordionPrimitive.Header className={accordionHeaderVariants()}>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={clsx(
        accordionTriggerVariants({
          lessHeight,
          noOpenedStateStyling,
        }),
        'group', // Add group class for chevron rotation
        className,
      )}
      {...props}
    >
      {children}
      <ArrowDown className={accordionChevronVariants()} aria-hidden />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

// Content component
export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
    noPadding?: boolean
    isServerIosOrSafari?: boolean
  }
>(({ className, children, noPadding = false, isServerIosOrSafari, ...props }, ref) => {
  const localRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const mergedRef = mergeRefs([localRef, ...(ref ? [ref] : [])])
  const isIosOrDesktopSafari = isServerIosOrSafari || isIOS || isSafari

  useResizeObserver(contentRef.current, (entry) => {
    localRef.current?.style.setProperty('--fs-radix-accordion-content-height', `${entry.contentRect.height}px`)
  })

  return (
    <AccordionPrimitive.Content
      ref={mergedRef}
      className={clsx(
        accordionContentVariants({
          iOS: isIosOrDesktopSafari,
        }),
        className,
      )}
      {...props}
    >
      <div ref={contentRef} className={accordionContentTextVariants({ noPadding })}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
})
AccordionContent.displayName = 'AccordionContent'
