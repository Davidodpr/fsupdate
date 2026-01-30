import React from 'react'
import Popup from '@/components/atoms/Popup'
import QuestionBlue from '@/public/images/Question_blue.svg'
import { AnswerTemplate } from './AnswerTemplate'

export type QNAData = {
  question: string
  answer: {
    type: string
    value: string | [string] | React.ReactNode
  }
}

export type FAQCardProps = {
  header?: string
  QNA?: Array<QNAData> | []
}

export const FAQCard = ({ header, QNA }: FAQCardProps) => {
  return (
    <div className="flex flex-col items-start p-0 gap-2 w-full h-[92px] flex-none order-0 self-stretch grow-0 md:w-1/2">
      <div className="flex flex-row items-center p-0 gap-1 h-[18px] flex-none order-0 self-stretch grow-0">
        <div className="h-[18px] font-bold leading-[18px] tracking-[0.02em] text-[var(--color-secondary-main)] flex-none order-0 flex-grow">{header}</div>
      </div>
      <div className="flex flex-col items-start p-0 gap-1.5 h-[66px] flex-none order-1 self-stretch grow-0">
        {QNA && Array.isArray(QNA)
          ? QNA?.map((data, index) => (
              <Popup withFluidWidth={true} text={AnswerTemplate(data.answer)} key={`qna-${index}`}>
                <div className="flex flex-row items-center p-0 gap-1 h-[18px] flex-none order-0 self-stretch grow-0 hover:cursor-pointer">
                  <QuestionBlue stroke="var(--fs-colors-questionIconColor)" />
                  <div className="w-[323px] h-[18px] font-normal leading-[18px] tracking-[0.02em] underline text-left text-[var(--color-secondary-main)] flex-none order-1 flex-grow">
                    {data.question}
                  </div>
                </div>
              </Popup>
            ))
          : null}
      </div>
    </div>
  )
}
