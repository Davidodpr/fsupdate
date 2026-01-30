import React from 'react'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import MovehelpQuotationIntroSection from '@/components/organisms/MovehelpQuotationIntroSection'
import { quotationStartWrapperVariants, wrapperVariants, mainSectionWrapperVariants } from './GetQuotationStart.variants'

const GetQuotationStart = () => {
  const { theme } = useThemeContext()

  return (
    <div className={wrapperVariants()} data-testid="step-1-providers-container">
      <div className={mainSectionWrapperVariants()}>
        <div className={quotationStartWrapperVariants({ variant: theme })}>
          <MovehelpQuotationIntroSection />
        </div>
      </div>
    </div>
  )
}

export default GetQuotationStart
