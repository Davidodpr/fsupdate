import React, { ReactElement, useState, useRef } from 'react'
import Image from 'next/legacy/image'
import ArrowDown from '@/public/images/Arrow-Down.svg'
import ArrowUp from '@/public/images/Arrow-Up.svg'
import {
  accordionItemWrapperVariants,
  accordionItemImageWrapperVariants,
  accordionItemArrowWrapperVariants,
  accordionItemQuestionWrapperVariants,
  accordionItemAnswerWrapperVariants,
  accordionItemIconHelperVariants,
  accordionItemArrowHelperVariants,
} from './AccordionItem.variants'

export interface AccordionItemProps {
  question: string
  answer: ReactElement
  iconClosed: string
  iconOpened?: string
  alt: string
  withArrow?: boolean
}

const AccordionItem = ({ question, answer, iconClosed, iconOpened, alt, withArrow = true }: AccordionItemProps) => {
  const [expanded, setExpanded] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const answerHeight = elementRef?.current?.clientHeight.toString()

  const wrapperClasses = accordionItemWrapperVariants()
  const imageWrapperClasses = accordionItemImageWrapperVariants()
  const arrowWrapperClasses = accordionItemArrowWrapperVariants()
  const questionWrapperClasses = accordionItemQuestionWrapperVariants()
  const answerWrapperClasses = accordionItemAnswerWrapperVariants({ expanded })
  const iconHelperClasses = accordionItemIconHelperVariants()
  const arrowHelperClasses = accordionItemArrowHelperVariants()

  return (
    <div
      className={wrapperClasses}
      onClick={() => setExpanded(!expanded)}
      style={
        !!answerHeight && expanded
          ? {
              height: `calc(${answerHeight}px + 20px)`,
              transition: 'height 100ms ease-in-out',
            }
          : {}
      }
      data-testid="AccordionItem-wrapper"
    >
      {iconClosed && (
        <div className={imageWrapperClasses}>
          <div className={iconHelperClasses}>
            <Image
              src={iconOpened && expanded ? iconOpened : iconClosed}
              objectFit="contain"
              data-testid={iconOpened && expanded ? 'iconOpened' : 'iconClosed'}
              alt={alt}
              width="25"
              height="25"
            />
          </div>
        </div>
      )}

      {question && <div className={questionWrapperClasses}>{question}</div>}

      {answer && (
        <div ref={elementRef} className={answerWrapperClasses} data-testid="answer-wrapper">
          {answer}
        </div>
      )}

      {withArrow && (
        <div className={arrowWrapperClasses}>
          <div className={arrowHelperClasses}>{expanded ? <ArrowDown data-testid="Arrow down" /> : <ArrowUp data-testid="Arrow up" />}</div>
        </div>
      )}
    </div>
  )
}

export default AccordionItem
