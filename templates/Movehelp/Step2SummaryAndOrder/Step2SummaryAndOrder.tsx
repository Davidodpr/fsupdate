import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { SupplierDetail } from 'types/price'
import formatDate from '@/appComponents/format'
import { useMovecleanContext } from '@/common/context/movecleanProvider/moveclean.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUtilityContext } from '@/common/context/utility/UtilityProvider'
import { checkDateForHoliday } from '@/common/helpers/date'
import { useEmailPhoneForm } from '@/common/hooks/useEmailPhoneForm'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Popup from '@/components/atoms/Popup'
import Spinner from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import TailoredMoveInPreparation from '@/components/organisms/TailoredMoveInPreparation'
import ArrowLeft from '@/public/images/ArrowLeft.svg'
import {
  serviceWrapperVariants,
  errorMessageFrameVariants,
  isLoadingContainerVariants,
  step1ProvidersWrapperVariants,
  bottomSectionTitleWrapperVariants,
  mainSectionWrapperVariants,
  innerPriceWrapperVariants,
  arrowWrapperVariants,
  summaryWrapperVariants,
  cardWrapperVariants,
  priceWrapperVariants,
  submitButtonVariants,
  moveSummaryHeadlineVariants,
} from './Step2SummaryAndOrder.variants'

export interface Step2SummaryAndOrderProps {
  setCurrentStep: (step: number) => void
  currentDatePicked?: Date
  shouldShowEmailPhoneForm?: boolean
  emailPhoneForm: ReturnType<typeof useEmailPhoneForm>
  setCurrentDatePicked: (date: Date) => void
  submitOrder: () => void
}

const Step2SummaryAndOrder = ({ setCurrentStep, currentDatePicked, submitOrder }: Step2SummaryAndOrderProps) => {
  const { error, isLoading } = useMovecleanContext()
  const { theme } = useThemeContext()
  const { isTabletPortraitOrGreater } = useResponsive()
  const { selectedProvider } = useMovecleanContext()
  const { holidayDates } = useUtilityContext()
  const { t } = useTranslation(['moveServicesDynamicPricePerHour', 'common', 'error', 'moveclean'])
  const summaryHeaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (summaryHeaderRef.current) summaryHeaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const getPrice = (item: SupplierDetail, date: Date) => {
    const selectedDateIsHoliday =
      Number(formatDate(date, 'e')) === 6 || Number(formatDate(date, 'e')) === 7 || checkDateForHoliday(formatDate(date, 'yyyy-MM-dd'), holidayDates || [])

    if (selectedDateIsHoliday) {
      return (item?.prices?.fixed?.[0]?.price || 0) * Number(`1.${item?.addons?.holiday ?? 0}`)
    } else {
      return item?.prices?.fixed?.[0]?.price || 0
    }
  }

  const textParts = t('moveclean:moveSummaryHeadLine').split(':')

  return (
    <>
      <div ref={summaryHeaderRef} data-testid="step-1-providers-container" className={step1ProvidersWrapperVariants()}>
        {error && (
          <div className={errorMessageFrameVariants({ variant: theme })}>
            <TailoredMoveInPreparation error={error} />
          </div>
        )}
        {isLoading && (
          <div className={isLoadingContainerVariants()}>
            <Spinner color="green" scale={2} />
          </div>
        )}
        <div className={mainSectionWrapperVariants()}>
          <div className={serviceWrapperVariants()}>
            <div className={bottomSectionTitleWrapperVariants()} onClick={() => setCurrentStep(1)}>
              <div className={arrowWrapperVariants()}>
                <ArrowLeft width={22} height={22} />
                {isTabletPortraitOrGreater && <Text style={{ textDecoration: 'underline', marginLeft: 8 }}>{t('common:goBack')}</Text>}
              </div>
              <Text style={{ fontSize: isTabletPortraitOrGreater ? 'var(--fs-fontSizes-9)' : '24px', fontWeight: 'var(--fs-fontWeights-bold)' }} spacing="none">
                {t('summary')}
              </Text>
            </div>
            <div className={cardWrapperVariants()}>
              <div className={summaryWrapperVariants()}>
                <div className={priceWrapperVariants()}>
                  <div className={innerPriceWrapperVariants()}>
                    <Flex justifyContent="space-between" style={{ width: '100%' }}>
                      <Text spacing="none" variant="larger">
                        {t('common:totalPrice')}
                      </Text>
                      <Text spacing="none" style={{ fontSize: 'var(--fs-fontSizes-9', fontWeight: 'var(--fs-fontWeights-bold' }}>
                        {selectedProvider && getPrice(selectedProvider, currentDatePicked ?? new Date())}
                        <span style={{ paddingLeft: 6 }}>{t('common:priceUnit')}</span>
                      </Text>
                    </Flex>

                    <Flex style={{ textAlign: 'center', marginTop: 24 }} alignItems="center" justifyContent="center">
                      <Text spacing="none" className={moveSummaryHeadlineVariants()}>
                        {textParts[0]}
                      </Text>
                      <Popup
                        withFluidWidth
                        text={
                          <div>
                            <Text style={{ marginBottom: 10, fontSize: 'var(--fs-fontSizes-4)', color: '#112E46' }}>{t('tax_deduction_description1')}</Text>
                            <Text style={{ marginBottom: 10, fontSize: 'var(--fs-fontSizes-4)', color: '#112E46' }}>{t('tax_deduction_description2')}</Text>
                            <Text style={{ marginBottom: 10, fontSize: 'var(--fs-fontSizes-4)', color: '#112E46' }}>{t('tax_deduction_description3')}</Text>

                            <a style={{ color: 'var(--fs-colors-tertiaryText)' }} href={t('tax_deduction_description4_Url')} target="_blank" rel="noopener noreferrer">
                              <Text style={{ fontSize: 'var(--fs-fontSizes-4)' }} variant="bodyBold">
                                {t('tax_deduction_description4_Text')}
                              </Text>
                            </a>
                          </div>
                        }
                      >
                        <Text spacing="none" className={moveSummaryHeadlineVariants({ withUnderline: true })} style={{ marginLeft: 2.5 }}>
                          {textParts[1]}
                        </Text>
                      </Popup>
                    </Flex>
                    <div className={submitButtonVariants()}>
                      <Button
                        dataTestId="confirmBookingButton"
                        type="submit"
                        fontSize={15}
                        padding="8px 32px !important"
                        text={t('common:completeOrder')}
                        variant="primary"
                        onClick={() => {
                          submitOrder()
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Step2SummaryAndOrder
