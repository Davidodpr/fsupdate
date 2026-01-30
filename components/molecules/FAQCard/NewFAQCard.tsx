import React, { RefObject, useState } from 'react'
import { clsx } from 'clsx'
import useResponsive from '@/common/hooks/useResponsive'
import { Modal, ModalContent, ModalTitle } from '@/components/molecules/Modal'
import Popup from '@/components/molecules/PopupNew'
import CloseIcon from '@/public/images/Close_medium.svg'
import QuestionBlue from '@/public/images/Question_blue.svg'
import { TextItem, TextTemplate } from './../TextTemplate/TextTemplate'
import { faqWrapperVariants, faqTitleWrapperVariants, faqTitleVariants, qnaFrameVariants, qFrameVariants, questionItemVariants } from './FAQCard.variants'

export type FAQData = {
  question: string
  answer: TextItem[]
}
export type FAQCardProps = {
  header?: string
  faq?: Array<FAQData> | []
  backgroundRef?: RefObject<HTMLDivElement | null>
  showBackground?: boolean
  setShowBackground?: (i: boolean) => void
  withWhiteColor?: boolean
}
export const FAQCard = ({ header, faq, showBackground, backgroundRef, setShowBackground, withWhiteColor }: FAQCardProps) => {
  const [currentIndexOfOpenedPopup, setCurrentIndexOfOpenedPopup] = useState<number | null>(null)
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null)
  const { isTabletPortraitOrGreater } = useResponsive()
  return (
    <div className={faqWrapperVariants()}>
      <div className={faqTitleWrapperVariants()}>
        <div className={faqTitleVariants()}>{header}</div>
      </div>
      <div className={qnaFrameVariants()}>
        {faq && Array.isArray(faq)
          ? faq?.map((data, index) =>
              isTabletPortraitOrGreater ? (
                // Desktop: Use Popup
                <Popup
                  withFluidWidth={true}
                  text={<TextTemplate text={data.answer} />}
                  key={`faq-${index}`}
                  backgroundRef={backgroundRef}
                  noUnderline
                  showBackground={showBackground}
                  setShowBackground={setShowBackground}
                  setCurrentIndexOfOpenedPopup={setCurrentIndexOfOpenedPopup}
                  currentIndexOfOpenedPopup={currentIndexOfOpenedPopup}
                  currentPopupItemIndex={index + 1}
                >
                  <div className={qFrameVariants({ longQuestion: data.question?.length > 40 })}>
                    <QuestionBlue stroke={withWhiteColor ? 'var(--fs-colors-secondaryContrastText)' : 'var(--fs-colors-textTertiary)'} />
                    <div className={questionItemVariants({ withWhiteColor })}>{data.question}</div>
                  </div>
                </Popup>
              ) : (
                // Mobile: Use Modal
                <div key={`faq-${index}`}>
                  <Modal open={openModalIndex === index} onOpenChange={(open) => setOpenModalIndex(open ? index : null)}>
                    <div className={qFrameVariants({ longQuestion: data.question?.length > 40 })} onClick={() => setOpenModalIndex(index)}>
                      <QuestionBlue stroke={withWhiteColor ? 'var(--fs-colors-secondaryContrastText)' : 'var(--fs-colors-textTertiary)'} />
                      <div className={questionItemVariants({ withWhiteColor })}>{data.question}</div>
                    </div>
                    <ModalContent size="medium" setShowModal={() => setOpenModalIndex(null)} withOverlay={true} withCloseButton={false} fullScreenMobile={false}>
                      <ModalTitle className="sr-only">FAQ Answer</ModalTitle>
                      <div className="relative">
                        <button
                          className={clsx(
                            'absolute right-[-10px] top-[-10px] z-10',
                            'w-10 h-10 rounded-full',
                            'flex items-center justify-center',
                            'hover:bg-gray-100 transition-colors',
                            'focus:outline-none focus:ring-2 focus:ring-primary-main',
                          )}
                          onClick={() => setOpenModalIndex(null)}
                          aria-label="Close"
                        >
                          <CloseIcon />
                        </button>
                        <div className="pr-10">
                          <h3 className="font-bold text-lg mb-4 leading-4">{data.question}</h3>
                          <TextTemplate text={data.answer} />
                        </div>
                      </div>
                    </ModalContent>
                  </Modal>
                </div>
              ),
            )
          : null}
      </div>
    </div>
  )
}
