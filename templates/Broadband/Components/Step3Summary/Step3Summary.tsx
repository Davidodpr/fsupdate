import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useBroadbandProvider } from '@/common/context/broadband/broadbandProvider.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { useEmailPhoneForm } from '@/common/hooks/useEmailPhoneForm'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Checkbox'
import Flex from '@/components/atoms/Flex'
import ImageKit from '@/components/atoms/ImageKit'
import Text from '@/components/atoms/Text'
import { Modal, ModalContent, ModalTitle } from '@/components/molecules/Modal'
import ArrowLeft from '@/public/images/ArrowLeft.svg'
import { BookingDetails } from './BookingDetails'
import {
  step3SummaryWrapperVariants,
  infoAboutOrderBoxWrapperVariants,
  infoAboutOrderBoxVariants,
  priceAndDiscountTextBoldVariants,
  movingPriceBoxVariants,
  bottomSectionTitleWrapperVariants,
  arrowWrapperVariants,
  largeButtonWrapperVariants,
  buttonsWrapperVariants,
  headerWrapperVariants,
  mainWrapperVariants,
  innerWrapperVariants,
  QuestionIconWrapper,
} from './Step3Summary.variants'

const bredbansvalIntegrityPolicyLink = 'https://www.bredbandsval.se/villkor/integritetspolicy'
const bredbandsvalTermsAndConditionsLink = 'https://www.bredbandsval.se/villkor/allm%C3%A4nna-villkor'

export interface Step3SummaryProps {
  setCurrentStep: (step: number) => void
}

const Step3Summary = ({ setCurrentStep }: Step3SummaryProps) => {
  const { isTabletPortraitOrGreater } = useResponsive()
  const { t } = useTranslation(['broadband', 'common'])
  const { chosenOffer, bredbandsvalTerms, signBroadband, orderError, clearOrderError, orderComplete } = useBroadbandProvider()
  const providerTerms = bredbandsvalTerms && bredbandsvalTerms[chosenOffer?.company as keyof typeof bredbandsvalTerms]
  const [agreementChecked, setAgreementChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [showContactInput, setShowContactInput] = useState(false)
  const [showAddressInput, setShowAddressInput] = useState(false)

  const offerType = chosenOffer && chosenOffer.type !== 'mobile' ? 'fixed' : 'mobile'

  const {
    user: { contact },
  } = useUserContext()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  // Handle successful order completion
  useEffect(() => {
    if (orderComplete) {
      setCurrentStep(4)
      setIsSubmitting(false)
    }
  }, [orderComplete, setCurrentStep])

  // Handle order error
  useEffect(() => {
    if (orderError) {
      setIsSubmitting(false)
    }
  }, [orderError])

  const emailPhoneForm = useEmailPhoneForm()
  const shouldShowEmailPhoneForm = !contact.email || !contact.phone

  const checkDisabledButton = () => {
    if (!agreementChecked || showContactInput) {
      return true
    } else return false
  }

  return (
    <>
      {/* Error Modal */}
      <Modal open={!!orderError} onOpenChange={(open) => !open && clearOrderError()}>
        <ModalContent setShowModal={(open) => !open && clearOrderError()}>
          <ModalTitle className="!text-[26px] my-4">{t('broadband:orderError.title')}</ModalTitle>
          <Text className="!my-4">{t('broadband:orderError.message')}</Text>
          <Button
            className="mt-4"
            text={t('broadband:orderError.tryAgain')}
            onClick={() => {
              clearOrderError()
              setCurrentStep(1)
            }}
            withFullWidth
          />
        </ModalContent>
      </Modal>

      <div className={step3SummaryWrapperVariants()} data-testid="step-3-details-container">
        <div className={bottomSectionTitleWrapperVariants()} onClick={() => setCurrentStep(2)}>
          <div className={arrowWrapperVariants()}>
            <ArrowLeft width={22} height={22} style={{ marginRight: 8 }} />
            {isTabletPortraitOrGreater && (
              <Text spacing="none" style={{ textDecoration: 'underline', marginLeft: 8 }}>
                {t('common:goBack')}
              </Text>
            )}
          </div>
          {!isTabletPortraitOrGreater && (
            <Text spacing="none" style={{ fontSize: '24px', fontWeight: 'bold', padding: '16px 0' }}>
              {t('STEPFOUR.summary')}
            </Text>
          )}
        </div>
        <div className={innerWrapperVariants()}>
          <div className={headerWrapperVariants()}>
            {isTabletPortraitOrGreater && <Text spacing="none">{t('STEPFOUR.summary')}</Text>}
            <Flex justifyContent={isTabletPortraitOrGreater ? 'center' : 'space-between'} alignItems="center" style={{ width: isTabletPortraitOrGreater ? 'fit-content' : '100%' }}>
              <ImageKit src={`/Products/Broadband/${chosenOffer?.company}.svg`} width={165} height={36} />
              {!isTabletPortraitOrGreater && (
                <div className={movingPriceBoxVariants({ isFixed: offerType === 'fixed' })}>
                  <Text className={priceAndDiscountTextBoldVariants()} spacing="none">
                    {offerType === 'fixed' ? t('fixedBroadband') : t('mobileBroadband')}
                  </Text>{' '}
                </div>
              )}
            </Flex>
          </div>
          <div className={mainWrapperVariants()}>
            <BookingDetails
              setShowAddressInput={setShowAddressInput}
              setShowContactInput={setShowContactInput}
              showAddressInput={showAddressInput}
              showContactInput={showContactInput}
              formFullWidth
              formMethods={emailPhoneForm}
            />
          </div>
          <Flex style={{ padding: '32px 0 0' }}>
            <Checkbox style={{ marginTop: 2 }} checked={agreementChecked} onChange={(e) => setAgreementChecked(e.target.checked)} />
            <Flex style={{ paddingLeft: 10 }} direction="column">
              <Text variant="body" spacing="none">
                {t(`STEPFOUR.acceptTerms`)}
                <a href={bredbandsvalTermsAndConditionsLink} className="!font-bold !text-[var(--color-primary-main)]" target="_blank" rel="noreferrer">
                  {t('STEPFOUR.bredbandsval')}
                </a>
                {providerTerms && providerTerms.terms.length > 0 && (
                  <>
                    {t('common:and')}
                    <a href={providerTerms.terms[0].url} className="!font-bold !text-[var(--color-primary-main)]" target="_blank" rel="noreferrer">
                      {t('STEPFOUR.companyName', { company: chosenOffer?.company.replace(chosenOffer?.company?.charAt(0), chosenOffer?.company?.charAt(0).toUpperCase()) ?? '' })}
                    </a>
                  </>
                )}
                {providerTerms && providerTerms.terms.length > 1 && (
                  <>
                    .
                    <a href={providerTerms.terms[1].url} className="!font-bold !text-[var(--color-primary-main)]" target="_blank" rel="noreferrer">
                      {t('STEPFOUR.specialTerms')}
                    </a>
                    {t('common:for')}
                    {t('STEPFOUR.companyName', { company: chosenOffer?.company.replace(chosenOffer?.company?.charAt(0), chosenOffer?.company?.charAt(0).toUpperCase()) ?? '' })}
                  </>
                )}
                &nbsp;
                {t('STEPFOUR.aswell')}
                {t('STEPFOUR.acceptPolicy')}
                <a href={bredbansvalIntegrityPolicyLink} className="!font-bold !text-[var(--color-primary-main)]" target="_blank" rel="noreferrer">
                  {t('STEPFOUR.bredbandsvalLink')}
                </a>
                {providerTerms && providerTerms.integrityPolicy && (
                  <>
                    {t('common:and')}
                    <a href={providerTerms.integrityPolicy.url} className="!font-bold !text-[var(--color-primary-main)]" target="_blank" rel="noreferrer">
                      {t('STEPFOUR.companyName', { company: chosenOffer?.company.replace(chosenOffer?.company?.charAt(0), chosenOffer?.company?.charAt(0).toUpperCase()) ?? '' })}
                    </a>
                  </>
                )}
              </Text>
            </Flex>
          </Flex>
          <Flex className={buttonsWrapperVariants()} direction={isTabletPortraitOrGreater ? 'row' : 'column-reverse'} justifyContent="space-between" alignItems="center">
            <div className={infoAboutOrderBoxWrapperVariants()}>
              <div className={infoAboutOrderBoxVariants()}>
                <Text style={{ paddingLeft: 10 }} variant="body" spacing="none">
                  {t('STEPFOUR.infoAboutOrder', { provider: chosenOffer?.company.replace(chosenOffer?.company?.charAt(0), chosenOffer?.company?.charAt(0).toUpperCase()) ?? '' })}
                  <a
                    href="https://publikationer.konsumentverket.se/kontrakt-och-mallar/angerblankett"
                    className="!font-bold !text-[var(--color-primary-main)]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('STEPFOUR.disclaimerTextLink')}
                  </a>
                </Text>
              </div>
            </div>
            <div className={largeButtonWrapperVariants()}>
              <Button
                text={t('STEPFOUR.order')}
                disabled={checkDisabledButton() || isSubmitting}
                padding="12px 94px"
                isLoading={isSubmitting}
                onClick={async () => {
                  if (shouldShowEmailPhoneForm) {
                    const emailPhoneFormValid = await emailPhoneForm.trigger()
                    if (!emailPhoneFormValid) return
                  }
                  setIsSubmitting(true)
                  const result = await signBroadband(shouldShowEmailPhoneForm ? emailPhoneForm.getValues() : undefined)

                  if (result.success) {
                    setCurrentStep(4)
                  }
                  setIsSubmitting(false)
                }}
              />
            </div>
          </Flex>
        </div>
      </div>
    </>
  )
}

export default Step3Summary

// Re-export for backwards compatibility
export { QuestionIconWrapper }
