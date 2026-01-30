import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Trans } from 'react-i18next'
import { useElectricityProvider } from '@/common/context/electricity/electricityContext.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ElectricityEnum, ElectricityIconsUrls } from '@/common/enums/ElectricityEnum'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { useEmailPhoneForm } from '@/common/hooks/useEmailPhoneForm'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Checkbox'
import Flex from '@/components/atoms/Flex'
import ImageKit from '@/components/atoms/ImageKit'
import Text from '@/components/atoms/Text'
import { Modal, ModalContent } from '@/components/molecules/Modal'
import { VATTENFALL, FORTUM, SKEKRAFT, TIBBER } from '@/constants/electricity'
import ArrowLeft from '@/public/images/ArrowLeft.svg'
import BankId from '@/public/images/BankId.svg'
import { BookingDetails } from './BookingDetails'
import {
  step3SummaryWrapperVariants,
  priceAndDiscountTextVariants,
  priceAndDiscountTextBoldVariants,
  modalHeaderWrapperVariants,
  modalContentWrapperVariants,
  modalContentTextWrapperVariants,
  bottomSectionTitleWrapperVariants,
  arrowWrapperVariants,
  agreementSectionWrapperVariants,
  agreementSectionVariants,
  movingPriceBoxVariants,
  hourlyPriceBoxVariants,
  questionIconWrapperVariants,
  largeButtonWrapperVariants,
  buttonsWrapperVariants,
  headerWrapperVariants,
  mainWrapperVariants,
  innerWrapperVariants,
} from './Step3Summary.variants'

export interface Step3SummaryProps {
  providerName: string
  setCurrentStep: (step: number) => void
}

const Step3Summary = ({ providerName, setCurrentStep }: Step3SummaryProps) => {
  const { isTabletPortraitOrGreater } = useResponsive()
  const { t } = useTranslation(['electricity', 'common'])
  const [showModal, setShowModal] = useState(false)
  const { startDate, setStartDate, apartmentNumber: selectedApartmentNumber, setApartmentNumber, initPoaBankIdSigning, setNewEmailAndPhone } = useElectricityProvider()
  const [poaChecked, setPoaChecked] = useState(false)

  const [showContactInput, setShowContactInput] = useState(false)
  const [showAddressInput, setShowAddressInput] = useState(false)

  const { theme } = useThemeContext()

  const {
    user: {
      currentMove: {
        movingDate,
        toAddress: { apartmentNumber },
      },
      contact,
    },
  } = useUserContext()

  const emailPhoneForm = useEmailPhoneForm()
  const shouldShowEmailPhoneForm = (!contact.email || !contact.phone) && !showContactInput

  const [autoSignPoa, setAutoSignPoa] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== undefined) {
      if (process.env.NEXT_PUBLIC_USE_QR_BANKID_LOGIN !== 'true') setAutoSignPoa(true)
    }
  }, [])

  useEffect(() => {
    if (!startDate && movingDate) {
      setStartDate(new Date(movingDate))
    }
  }, [movingDate, startDate, setStartDate])
  useEffect(() => {
    if (!selectedApartmentNumber && apartmentNumber) {
      setApartmentNumber(apartmentNumber)
    }
  }, [apartmentNumber, selectedApartmentNumber, setApartmentNumber])

  const checkDisabledButton = () => {
    if (!poaChecked) {
      return true
    } else return false
  }

  const getAgreementLink = (getVattenfallSecondLink?: boolean) => {
    if (providerName === SKEKRAFT) {
      return 'https://www.skekraft.se/kundservice/avtalsvillkor-och-blanketter/#box-no-1'
    }
    if (providerName === VATTENFALL && getVattenfallSecondLink) {
      return 'https://www.vattenfall.se/media/kundservice/privat/avtalsvillkor/allmanna-avtalsvillkor-elkunder.pdf'
    }
    if (providerName === VATTENFALL) {
      return 'https://www.vattenfall.se/media/kundservice/privat/avtalsvillkor/vattenfalls-avtalsvillkor-el.pdf'
    }
    if (providerName === FORTUM) {
      return 'https://www.fortum.se/privat/elavtal/avtalsvillkor?_gl=1*1k27c9i*_gcl_aw*R0NMLjE1ODMwNTYxMDIuRUFJYUlRb2JDaE1JcV9pd3dmXzQ1d0lWemFpYUNoMXktQWVZRUFBWUFTQUFFZ0t1RGZEX0J3RQ..&_ga=2.247525319.1525545276.1583056105-677423455.1583056105'
    }
    if (providerName === TIBBER) {
      return 'https://tibber.com/se/villkor/elavtalsvillkor?srsltid=AfmBOoq8PV2XiOL2viAQVVh21dIq7BCFSAEeuN9OxlC-n0t2R8ZX2G-O'
    }
  }

  return (
    <>
      <Modal open={showModal}>
        <ModalContent withCloseButton setShowModal={setShowModal} size={isTabletPortraitOrGreater ? 'large' : 'medium'}>
          <div className={modalHeaderWrapperVariants()}>
            <Text variant="largerBlack" spacing="none">
              {t('STEP4SUMMARY.poaPopupHeader')}
            </Text>
          </div>
          <div className={modalContentWrapperVariants()}>
            <Text spacing="top" variant="bodyBold">
              {t('STEP4SUMMARY.poaPopupBoldText', { provider: t(`STEP4SUMMARY.PROVIDERS.${providerName}`) })}
            </Text>
            <div className={modalContentTextWrapperVariants()}>
              <ul>
                <li>
                  <Text spacing="none" variant="details">
                    {t('STEP4SUMMARY.popListItem1')}
                  </Text>
                </li>
                <li>
                  <Text spacing="none" variant="details">
                    {t('STEP4SUMMARY.popListItem2')}
                  </Text>
                </li>
                <li>
                  <Text spacing="none" variant="details">
                    {t('STEP4SUMMARY.popListItem3')}
                  </Text>
                </li>
                <li>
                  <Text spacing="none" variant="details">
                    {t('STEP4SUMMARY.popListItem4')}
                  </Text>
                </li>
              </ul>
            </div>
          </div>
        </ModalContent>
      </Modal>
      <div className={step3SummaryWrapperVariants()} data-testid="step-3-details-container">
        <div className={bottomSectionTitleWrapperVariants()} onClick={() => setCurrentStep(2)}>
          <div className={arrowWrapperVariants()}>
            <ArrowLeft width={22} height={22} />
            {isTabletPortraitOrGreater && (
              <Text spacing="none" style={{ textDecoration: 'underline', marginLeft: 8 }}>
                {t('common:goBack')}
              </Text>
            )}
          </div>
          {!isTabletPortraitOrGreater && (
            <Text spacing="none" style={{ fontSize: '24px', fontWeight: 'bold', padding: '16px 0' }}>
              {t('STEP4SUMMARY.summary')}
            </Text>
          )}
        </div>
        <div className={innerWrapperVariants()}>
          <div className={headerWrapperVariants()}>
            {isTabletPortraitOrGreater && (
              <Text variant="largerBlack" spacing="none">
                {t('STEP4SUMMARY.summary')}
              </Text>
            )}
            <Flex justifyContent={isTabletPortraitOrGreater ? 'center' : 'space-between'} alignItems="center" style={{ width: isTabletPortraitOrGreater ? 'fit-content' : '100%' }}>
              <ImageKit
                objectFit={providerName === TIBBER ? 'cover' : 'contain'}
                src={`${ElectricityEnum?.[providerName as keyof ElectricityIconsUrls]}`}
                width={165}
                height={36}
              />
              <div className={movingPriceBoxVariants()}>
                <Text className={priceAndDiscountTextBoldVariants()} spacing="none">
                  {providerName === TIBBER ? t('quarterPrice') : providerName === FORTUM ? t('movingPriceMonthly') : t('movingPrice')}
                </Text>
              </div>
            </Flex>
          </div>
          <div className={mainWrapperVariants()}>
            <BookingDetails
              setShowAddressInput={setShowAddressInput}
              setShowContactInput={setShowContactInput}
              showAddressInput={showAddressInput && !shouldShowEmailPhoneForm}
              showContactInput={showContactInput}
              formFullWidth
              formMethods={emailPhoneForm}
            />
          </div>
          <Flex style={{ padding: isTabletPortraitOrGreater ? '30px 0 10px' : '30px 0 32px' }}>
            <Checkbox style={{ marginTop: 3 }} checked={poaChecked} onChange={(event) => setPoaChecked(event.target.checked)} />
            <Flex style={{ paddingLeft: 10 }} direction="column">
              <Text variant="body" spacing="none">
                <Trans
                  t={t}
                  i18nKey={providerName === TIBBER ? 'STEP4SUMMARY.tibberPoaText' : providerName === FORTUM ? 'STEP4SUMMARY.poaTextFortum' : 'STEP4SUMMARY.poaText'}
                  components={[
                    <a className="!text-[var(--color-primary-main)] !font-bold w-full" style={{ cursor: 'pointer' }} key="first" onClick={() => setShowModal(true)} />,
                    <a className="!text-[var(--color-primary-main)] !font-bold w-full" key="second" href={getAgreementLink()} target="_blank" rel="noreferrer">
                      {t('STEP4SUMMARY.acceptenceTextLink')}
                    </a>,
                  ]}
                  values={{ provider: t(`STEP4SUMMARY.PROVIDERS.${providerName}`) }}
                />
              </Text>
            </Flex>
          </Flex>
          <div className={`${buttonsWrapperVariants()} ${isTabletPortraitOrGreater ? 'flex-row ' : 'flex-col-reverse'} justify-between`}>
            <div className={agreementSectionWrapperVariants()}>
              <div className={agreementSectionVariants()}>
                <Text style={{ paddingLeft: 10 }} variant="details" className="!text-[15px]" spacing="none">
                  {t('STEP4SUMMARY.disclaimerText', { provider: t(`STEP4SUMMARY.PROVIDERS.${providerName}`) })}
                  <a
                    className="!text-[var(--color-primary-main)] !font-bold"
                    href="https://publikationer.konsumentverket.se/kontrakt-och-mallar/angerblankett"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('STEP4SUMMARY.disclaimerTextLink')}
                  </a>
                </Text>
              </div>
            </div>

            <div className={largeButtonWrapperVariants()}>
              <Button
                iconLeft={theme !== ThemeEnum.FASTIGHETSBYRAN ? <BankId color="currentColor" /> : undefined}
                text={t('STEP4SUMMARY.order')}
                disabled={checkDisabledButton()}
                padding={isTabletPortraitOrGreater ? '12px 46px' : '10px 64px'}
                onClick={async () => {
                  if (shouldShowEmailPhoneForm) {
                    const emailPhoneFormValid = await emailPhoneForm.trigger()
                    if (!emailPhoneFormValid) return
                    setNewEmailAndPhone(emailPhoneForm.getValues())
                  }
                  initPoaBankIdSigning(!isTabletPortraitOrGreater || autoSignPoa)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Step3Summary
