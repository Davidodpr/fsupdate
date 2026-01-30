import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SupplierDetail } from 'types/price'
import formatDate from '@/appComponents/format'
import { useMovecleanContext } from '@/common/context/movecleanProvider/moveclean.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { useUtilityContext } from '@/common/context/utility/UtilityProvider'
import { ShortLocale } from '@/common/enums/LocaleEnum'
import { checkDateForHoliday } from '@/common/helpers/date'
import { useEmailPhoneForm } from '@/common/hooks/useEmailPhoneForm'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Popup from '@/components/atoms/Popup'
import Spinner from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import { BookingDetails } from '@/components/organisms/BookingDetails/BookingDetails'
import TailoredMoveInPreparation from '@/components/organisms/TailoredMoveInPreparation'
import { ORDER_ERROR } from '@/constants/errorCodes'
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

const Step2SummaryAndOrder = ({ setCurrentStep, currentDatePicked, emailPhoneForm, setCurrentDatePicked, submitOrder }: Step2SummaryAndOrderProps) => {
  const { error, isLoading, selectedProvider, fetchData } = useMovecleanContext()
  const { user } = useUserContext()
  const { theme } = useThemeContext()
  const { isTabletPortraitOrGreater } = useResponsive()

  const [showContactInput, setShowContactInput] = useState(false)
  const [showAddressInput, setShowAddressInput] = useState(false)
  const { holidayDates } = useUtilityContext()
  const { t, i18n } = useTranslation(['common', 'error', 'moveclean'])
  const locale = i18n.language
  const summaryHeaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (summaryHeaderRef.current) summaryHeaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])
  useEffect(() => {
    if (emailPhoneForm && user.hasFetchedData && !!user.contact?.email?.length && !!user.contact?.phone?.length) emailPhoneForm.trigger()
  }, [emailPhoneForm, user])

  const getPrice = (item: SupplierDetail, date: Date) => {
    const selectedDateIsHoliday =
      Number(formatDate(date, 'e')) === 6 || Number(formatDate(date, 'e')) === 7 || checkDateForHoliday(formatDate(date, 'yyyy-MM-dd'), holidayDates || [])

    if (selectedDateIsHoliday) {
      const holidayMultiplier = (100 + (Number(item?.addons?.holiday) || 0)) / 100
      return Math.round((item?.prices?.fixed?.[0]?.price || 0) * holidayMultiplier)
    } else {
      return item?.prices?.fixed?.[0]?.price || 0
    }
  }

  useEffect(() => {
    if (error && error !== ORDER_ERROR) {
      setCurrentStep(1)
    }
  }, [error])

  useEffect(() => {
    if (!selectedProvider) {
      fetchData()
      setCurrentStep(1)
    }
  }, [selectedProvider])

  const textParts = t('moveclean:moveSummaryHeadLine').split(':')

  return (
    <>
      <div ref={summaryHeaderRef} className={step1ProvidersWrapperVariants()} data-testid="step-1-providers-container">
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
              <Text className="!font-bold !text-[24px] md:!text-[32px]" spacing="none">
                {t('summary')}
              </Text>
            </div>
            <div className={cardWrapperVariants()}>
              <div className={summaryWrapperVariants()}>
                <BookingDetails
                  setShowAddressInput={setShowAddressInput}
                  setShowContactInput={setShowContactInput}
                  showAddressInput={showAddressInput}
                  showContactInput={showContactInput}
                  formFullWidth
                  formMethods={emailPhoneForm}
                  currentDatePicked={currentDatePicked ?? new Date()}
                  setCurrentDatePicked={setCurrentDatePicked}
                />
                <div className={priceWrapperVariants()}>
                  <div className={innerPriceWrapperVariants()}>
                    <Flex justifyContent="space-between" className="md:w-full gap-4 w-fit mx-auto md:mx-0">
                      <Text spacing="none" variant="larger" className="!text-xl">
                        {t('common:totalPrice')}
                      </Text>
                      <Text spacing="none" className="!font-bold !text-[32px]">
                        {selectedProvider && getPrice(selectedProvider, currentDatePicked ?? new Date()).toFixed(0)}
                        <span style={{ paddingLeft: 6 }}>{t('common:priceUnit')}</span>
                      </Text>
                    </Flex>

                    <Flex
                      style={{ textAlign: 'center', marginTop: 24 }}
                      alignItems="center"
                      justifyContent="center"
                      className=""
                      direction={locale !== ShortLocale.SV && !isTabletPortraitOrGreater ? 'column' : 'row'}
                    >
                      <div className={moveSummaryHeadlineVariants()}>{textParts[0]}</div>
                      <Popup
                        withFluidWidth
                        text={
                          <div>
                            <Text className="!font-bold !text-[14px] !mb-2">{t('tax_deduction_description1')}</Text>
                            <Text className="!text-[14px] !text-[#112E46] !mb-2">{t('tax_deduction_description2')}</Text>
                            <Text className="!text-[14px] !text-[#112E46] !mb-2">{t('tax_deduction_description3')}</Text>

                            <a className="text-[var(--color-primary-main)]" href={t('tax_deduction_description4_Url')} target="_blank" rel="noopener noreferrer">
                              <Text className="!text-[14px] !text-[var(--color-primary-main)] " variant="bodyBold">
                                {t('tax_deduction_description4_Text')}
                              </Text>
                            </a>
                          </div>
                        }
                      >
                        <div className={moveSummaryHeadlineVariants({ withUnderline: true })} style={{ marginLeft: 2.5 }}>
                          {textParts[1]}
                        </div>
                      </Popup>
                    </Flex>
                    <div className={submitButtonVariants()}>
                      <Button
                        dataTestId="confirmBookingButton"
                        type="submit"
                        fontSize={15}
                        padding={isTabletPortraitOrGreater ? '8px 48px' : '8px 64px'}
                        disabled={
                          emailPhoneForm.formState.isSubmitting ||
                          !emailPhoneForm.formState.isValid ||
                          (!emailPhoneForm.formState.isSubmitted && !user?.contact?.email && !user?.contact?.phone) ||
                          showAddressInput ||
                          showContactInput
                        }
                        text={t('common:completeOrder')}
                        variant="primary"
                        onClick={() => {
                          submitOrder()
                        }}
                      />
                    </div>
                  </div>
                </div>
                {(!emailPhoneForm.formState.isValid || (!emailPhoneForm.formState.isSubmitted && !user?.contact?.email && !user?.contact?.phone)) && (
                  <Text spacing="none" style={{ margin: '8px auto 0', textAlign: 'center' }}>
                    {t('moveclean:fillOutToOrder')}
                  </Text>
                )}
                {(showAddressInput || showContactInput) && (
                  <Text spacing="none" style={{ margin: '8px auto 0', textAlign: 'center' }}>
                    {t('moveclean:saveToOrder')}
                  </Text>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Step2SummaryAndOrder
