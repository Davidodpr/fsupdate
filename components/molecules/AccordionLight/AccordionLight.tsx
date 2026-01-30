import React, { ReactNode } from 'react'
import { isSafari, isIOS } from 'react-device-detect'
import Image from 'next/image'
import { clsx } from 'clsx'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { mergeRefs } from '@/common/helpers/mergeRefs'
import InfoIcon from '@/components/atoms/InfoIcon'
import ArrowDown from '@/public/images/Arrow-down-black.svg'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import {
  accordionRootVariants,
  accordionItemVariants,
  accordionHeaderVariants,
  accordionTriggerVariants,
  accordionContentVariants,
  imageWrapperVariants,
  headerContentWrapperVariants,
  chevronWrapperVariants,
  contentTextVariants,
  chevronVariants,
  type AccordionTriggerVariants,
  type AccordionContentVariants,
  type ContentTextVariants,
} from './AccordionLight.variants'

export const Accordion = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Root>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>>(
  ({ className, ...props }, ref) => <AccordionPrimitive.Root ref={ref} className={clsx(accordionRootVariants(), className)} {...props} />,
)
Accordion.displayName = 'Accordion'

export const AccordionItem = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Item>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(
  ({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={clsx(accordionItemVariants(), className)} {...props} />,
)
AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> &
    AccordionTriggerVariants & {
      children: ReactNode
      lessHeight?: boolean
    }
>(({ className, children, withBlueColorTrigger, ...props }, ref) => {
  const { iconSet, theme } = useThemeContext()

  return (
    <AccordionPrimitive.Header className={accordionHeaderVariants()}>
      <AccordionPrimitive.Trigger ref={ref} className={clsx(accordionTriggerVariants({ withBlueColorTrigger }), className)} {...props}>
        <div className={imageWrapperVariants()}>
          {theme === 'fb' ? <Image src={iconSet.INFO_ICON} alt="question icon" width={24} height={24} /> : <InfoIcon width={24} height={24} color="var(--color-text-main)" />}
        </div>
        <div className={headerContentWrapperVariants()}>{children}</div>
        <div className={chevronWrapperVariants()}>
          <ArrowDown
            className={chevronVariants()}
            aria-hidden
            style={{
              stroke: 'var(--color-text-main)',
            }}
          />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> &
    AccordionContentVariants &
    ContentTextVariants & {
      children: ReactNode
      noPadding?: boolean
    }
>(({ className, children, noPadding = false, ...props }, ref) => {
  const contentRef = React.useRef<HTMLDivElement>(null)
  const mergedRef = mergeRefs([contentRef, ...(ref ? [ref] : [])])
  const isIosOrDesktopSafari = isIOS || isSafari

  return (
    <AccordionPrimitive.Content ref={mergedRef} className={clsx(accordionContentVariants({ iOS: isIosOrDesktopSafari }), className)} data-abc="abvc" {...props}>
      <div ref={contentRef} className={contentTextVariants({ noPadding })}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
})
AccordionContent.displayName = 'AccordionContent'
