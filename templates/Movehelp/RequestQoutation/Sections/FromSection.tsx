import { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useMovehelpContext } from '@/common/context/movehelpProvider/movehelp.provider'
import { YES, NO, LARGEELEVATOR, SMALLELEVATOR, NOELEVATOR, UNKNOWN } from '@/common/context/movehelpProvider/movehelp.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ShortLocale } from '@/common/enums/LocaleEnum'
import useResponsive from '@/common/hooks/useResponsive'
import ArrowForward from '@/components/atoms/ArrowForward'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Popup from '@/components/atoms/Popup'
import Text from '@/components/atoms/Text'
import TextArea from '@/components/atoms/TextArea'
import InfoIcon from '@/public/images/Question_green.svg'
import { FromAddress } from '../Components/FromAddress'
import { FromResidenceSizeInput } from '../Components/FromResidenceSizeInput'
import { RESIDENCE_TYPES } from '@/constants/residenceTypes'
import {
  dataSectionWrapperVariants,
  buttonsWrapperVariants,
  livingSelectionVariants,
  textButtonWrapperVariants,
  continueButtonWrapperVariants,
  errorWrapperVariants,
  questionIconWrapperVariants,
  popupWrapperVariants,
  inputWrapperVariants,
  textAreaAndInputWrapperVariants,
} from '../RequestQuotation.variants'
import { FROM_ADDRESS_ERROR, SQM_ERROR, RESIDENCETYPE_ERROR, STAIRS_ERROR, HEAVY_ITEM_ERROR, ADDITIONAL_SPACE_ERROR, PARKING_ANSWER_ERROR } from './helper'

interface FromSectionProps {
  setCurrentStep: (step: number) => void
  currentStep: number
}

export const FromSection = ({ setCurrentStep, currentStep }: FromSectionProps) => {
  const { APARTMENT, TOWNHOUSE, HOUSE } = RESIDENCE_TYPES
  const { t, i18n } = useTranslation(['movehelp', 'common', 'error'])
  const { isTabletPortraitOrGreater } = useResponsive()
  const locale = i18n.language
  const {
    user: { hasFetchedData },
    updateCurrentFromAddress,
  } = useUserContext()

  const {
    fromData,
    setFromData,
    selectedFromResidenceType,
    setSelectedFromResidenceType,
    parkingAnswerFromAddress,
    setParkingAnswerFromAddress,
    additionalSpace,
    setAdditionalSpace,
    setFromElevatorValue,
    fromElevatorValue,
    setAdditionalSpaceText,
    additionalSpaceText,
    setFromResidenceTypeStairsValue,
    fromResidenceTypeStairsValue,
    setParkingTextAnswerFromAddress,
    parkingTextAnswerFromAddress,
    hasSetInitialValues,
    heavyItemAnswer,
    setHeavyItemAnswer,
    heavyItemTextAreaValue,
    setHeavyItemTextAreaValue,
  } = useMovehelpContext()
  const [error, setError] = useState<string | null>(null)
  const sqmRef = useRef<HTMLDivElement>(null)
  const fromAddressRef = useRef<HTMLDivElement>(null)
  const firstStairsRef = useRef<HTMLDivElement>(null)
  const secondStairsRef = useRef<HTMLDivElement>(null)
  const [missingStreetNumberError, setMissingStreetNumberError] = useState(false)

  const validateSection = () => {
    if (!fromData.fromAddress?.city || !fromData.fromAddress?.street || !fromData.fromAddress?.zip || missingStreetNumberError) {
      setError(FROM_ADDRESS_ERROR)
      fromAddressRef && fromAddressRef.current && fromAddressRef.current.focus()
      fromAddressRef && fromAddressRef.current && fromAddressRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    } else if (!fromData.sqm || fromData.sqm <= 0) {
      setError(SQM_ERROR)
      sqmRef && sqmRef.current && sqmRef.current.focus()
      sqmRef && sqmRef.current && sqmRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    } else if (!selectedFromResidenceType) {
      setError(RESIDENCETYPE_ERROR)
    } else if (!fromResidenceTypeStairsValue) {
      setError(STAIRS_ERROR)
      if (selectedFromResidenceType === HOUSE || selectedFromResidenceType === TOWNHOUSE) {
        firstStairsRef && firstStairsRef.current && firstStairsRef.current.focus()
        firstStairsRef && firstStairsRef.current && firstStairsRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      } else {
        secondStairsRef && secondStairsRef.current && secondStairsRef.current.focus()
        secondStairsRef && secondStairsRef.current && secondStairsRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    } else if (heavyItemAnswer === YES && !heavyItemTextAreaValue) {
      setError(HEAVY_ITEM_ERROR)
    } else if (additionalSpace === YES && !additionalSpaceText?.length) {
      setError(ADDITIONAL_SPACE_ERROR)
    } else if ((parkingAnswerFromAddress === NO || parkingAnswerFromAddress === UNKNOWN) && !parkingTextAnswerFromAddress?.length) {
      setError(PARKING_ANSWER_ERROR)
    } else {
      updateCurrentFromAddress(
        { street: fromData.fromAddress.street, city: fromData.fromAddress.city, zip: fromData.fromAddress.zip, residenceType: selectedFromResidenceType },
        fromData.sqm,
      )
      setCurrentStep(currentStep + 1)
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  if (!hasFetchedData || !hasSetInitialValues) return null

  return (
    <>
      <div
        ref={fromAddressRef}
        className={dataSectionWrapperVariants()}
        style={{ marginTop: 8, paddingBottom: error === FROM_ADDRESS_ERROR ? 16 : isTabletPortraitOrGreater ? 5 : 0 }}
      >
        <Text style={{ margin: '0 0 14px' }} variant="larger">
          {t('QUOTATIONS.whereAreYouMovingFrom')}
        </Text>
        <FromAddress moveData={fromData} setMissingStreetNumberError={setMissingStreetNumberError} setData={setFromData} withoutPadding />
        {error === FROM_ADDRESS_ERROR && (
          <div className={errorWrapperVariants()}>
            <Text spacing="none">{t('error:INFOMISSING.invalidStreet')}</Text>
          </div>
        )}
      </div>
      <div ref={sqmRef} className={dataSectionWrapperVariants({ hasError: error === 'sqm' })}>
        <Text style={{ margin: '0 0 24px' }} variant="larger">
          {t('QUOTATIONS.howBigIsResidence')}
        </Text>
        <FromResidenceSizeInput key="residenceSizeFromAddress" withAdditionalSpace={false} noMarginBottom moveData={fromData} setData={setFromData} />
        {error === SQM_ERROR && (
          <div className={errorWrapperVariants()}>
            <Text spacing="none">{t('error:INFOMISSING.residenceSize')}</Text>
          </div>
        )}
      </div>
      <div
        className={dataSectionWrapperVariants({
          hasError: error === RESIDENCETYPE_ERROR && selectedFromResidenceType !== HOUSE,
          hasInputAndError: (selectedFromResidenceType === HOUSE || selectedFromResidenceType === TOWNHOUSE) && (error === RESIDENCETYPE_ERROR || error === STAIRS_ERROR),
        })}
      >
        <Text style={{ margin: '0 0 24px' }} variant="larger">
          {t('QUOTATIONS.typeOfResidence')}
        </Text>
        <div className={livingSelectionVariants()}>
          <div className={buttonsWrapperVariants()}>
            <div
              className={textButtonWrapperVariants({
                selected: selectedFromResidenceType === APARTMENT,
                smallerFontSize: !isTabletPortraitOrGreater && locale !== ShortLocale.SV,
              })}
              onClick={() => {
                setSelectedFromResidenceType(APARTMENT)
              }}
            >
              {t('common:INFOMISSING.apartment')}
            </div>
            <div
              className={clsx(
                textButtonWrapperVariants({
                  selected: selectedFromResidenceType === TOWNHOUSE,
                  smallerFontSize: !isTabletPortraitOrGreater && locale !== ShortLocale.SV,
                }),
                'mx-[10px]',
              )}
              onClick={() => setSelectedFromResidenceType(TOWNHOUSE)}
            >
              {t('common:INFOMISSING.townhouse')}
            </div>
            <div
              className={textButtonWrapperVariants({
                selected: selectedFromResidenceType === HOUSE,
                smallerFontSize: !isTabletPortraitOrGreater && locale !== ShortLocale.SV,
              })}
              onClick={() => setSelectedFromResidenceType(HOUSE)}
            >
              {t('common:INFOMISSING.house')}
            </div>
          </div>
        </div>
        {error === RESIDENCETYPE_ERROR && (
          <div className={errorWrapperVariants()}>
            <Text spacing="none">{t('error:INFOMISSING.answerQuestion')}</Text>
          </div>
        )}
        {(selectedFromResidenceType === HOUSE || selectedFromResidenceType === TOWNHOUSE) && (
          <div className={inputWrapperVariants({ fullWidth: true })}>
            <Input
              type="text"
              onChange={(e) => setFromResidenceTypeStairsValue(e.currentTarget.value)}
              defaultValue={fromResidenceTypeStairsValue}
              label={t('QUOTATIONS.amountOfFloors') ?? ''}
            />
          </div>
        )}
        {(selectedFromResidenceType === HOUSE || selectedFromResidenceType === TOWNHOUSE) && error === STAIRS_ERROR && (
          <div className={errorWrapperVariants()} ref={firstStairsRef}>
            <Text spacing="none">{t('error:INFOMISSING.answerQuestion')}</Text>
          </div>
        )}
      </div>
      {selectedFromResidenceType === APARTMENT && (
        <div className={dataSectionWrapperVariants({ hasInputAndError: error === STAIRS_ERROR })}>
          <Text style={{ margin: '0 0 24px' }} variant="larger">
            {t('QUOTATIONS.elevator')}
          </Text>
          <div className={livingSelectionVariants()}>
            <div className={buttonsWrapperVariants()}>
              <div
                className={`${textButtonWrapperVariants({ selected: fromElevatorValue === LARGEELEVATOR })} !whitespace-nowrap`}
                onClick={() => {
                  setFromElevatorValue(LARGEELEVATOR)
                }}
              >
                {t('QUOTATIONS.bigElevator')}
              </div>
              <div
                className={clsx(textButtonWrapperVariants({ selected: fromElevatorValue === SMALLELEVATOR }), 'mx-[10px] !whitespace-nowrap')}
                onClick={() => setFromElevatorValue(SMALLELEVATOR)}
              >
                {t('QUOTATIONS.smallElevator')}
              </div>
              <div className={`${textButtonWrapperVariants({ selected: fromElevatorValue === NOELEVATOR })} !whitespace-nowrap`} onClick={() => setFromElevatorValue(NOELEVATOR)}>
                {t('QUOTATIONS.noElevator')}
              </div>
            </div>
          </div>
          <div className={questionIconWrapperVariants()}>
            <Popup withFluidWidth text={<div className={popupWrapperVariants()}>{t('QUOTATIONS.elevatorPopup')}</div>}>
              <InfoIcon className="[&_path]:stroke-[var(--color-primary-main)]" />
            </Popup>
          </div>
          <div className={`${inputWrapperVariants({ fullWidth: true })} mt-2`}>
            <Input
              type="text"
              onChange={(e) => setFromResidenceTypeStairsValue(e.currentTarget.value)}
              defaultValue={fromResidenceTypeStairsValue}
              label={t('QUOTATIONS.whichFloor') ?? ''}
            />
            <Text variant="smallItalic" className="!mt-2">
              {t('QUOTATIONS.whichFloorHelper')}
            </Text>
          </div>
          {error === STAIRS_ERROR && selectedFromResidenceType === APARTMENT && (
            <div className={errorWrapperVariants()} ref={secondStairsRef}>
              <Text spacing="none">{t('error:INFOMISSING.answerQuestion')}</Text>
            </div>
          )}
        </div>
      )}
      <div className={dataSectionWrapperVariants()}>
        <Text style={{ margin: '0 0 24px', paddingRight: 24 }} variant="larger">
          {t('QUOTATIONS.additionalSpace')}
        </Text>
        <div className={livingSelectionVariants()}>
          <div className={buttonsWrapperVariants()}>
            <div
              className={textButtonWrapperVariants({ selected: additionalSpace === YES })}
              onClick={() => {
                setAdditionalSpace(YES)
              }}
            >
              {t('QUOTATIONS.yes')}
            </div>
            <div className={clsx(textButtonWrapperVariants({ selected: additionalSpace === NO }), 'mx-[10px]')} onClick={() => setAdditionalSpace(NO)}>
              {t('QUOTATIONS.no')}
            </div>
          </div>
        </div>
        <div className={questionIconWrapperVariants()}>
          <Popup withFluidWidth text={<div className={popupWrapperVariants()}>{t('QUOTATIONS.additionalSpacePopup')}</div>}>
            <InfoIcon className="[&_path]:stroke-[var(--color-primary-main)]" />
          </Popup>
        </div>
        {additionalSpace === YES && (
          <div className={textAreaAndInputWrapperVariants()}>
            <TextArea
              style={{ minHeight: 90 }}
              onChange={(e) => setAdditionalSpaceText && setAdditionalSpaceText(e.currentTarget.value)}
              placeholder={t('QUOTATIONS.additionalSpaceTextAreaPlaceholder')}
              value={additionalSpaceText}
            />
          </div>
        )}
        {error === ADDITIONAL_SPACE_ERROR && (
          <div className={errorWrapperVariants()}>
            <Text spacing="none">{t('error:INFOMISSING.answerQuestion')}</Text>
          </div>
        )}
      </div>
      <div className={dataSectionWrapperVariants({ hasInputAndError: heavyItemAnswer === YES && error === HEAVY_ITEM_ERROR })}>
        <Text style={{ margin: '0 0 12px', maxWidth: isTabletPortraitOrGreater ? 360 : 340, lineHeight: '24px', paddingRight: 24 }} variant="larger">
          {t('QUOTATIONS.heavyItem')}
        </Text>
        <Text style={{ margin: '0 0 24px', maxWidth: isTabletPortraitOrGreater ? 360 : 340, lineHeight: '24px', fontSize: '15px' }}>{t('QUOTATIONS.heavyItemSubtitle')}</Text>

        <div className={livingSelectionVariants()}>
          <div className={buttonsWrapperVariants()}>
            <div
              className={textButtonWrapperVariants({ selected: heavyItemAnswer === YES })}
              onClick={() => {
                setHeavyItemAnswer(YES)
              }}
            >
              {t('QUOTATIONS.yes')}
            </div>
            <div className={clsx(textButtonWrapperVariants({ selected: heavyItemAnswer === NO }), 'mx-[10px]')} onClick={() => setHeavyItemAnswer(NO)}>
              {t('QUOTATIONS.no')}
            </div>
          </div>
        </div>
        <div className={questionIconWrapperVariants()}>
          <Popup withFluidWidth text={<div className={popupWrapperVariants()}>{t('QUOTATIONS.heavyItemPopup')}</div>}>
            <InfoIcon className="[&_path]:stroke-[var(--color-primary-main)]" />
          </Popup>
        </div>
        {heavyItemAnswer === YES && (
          <div className={textAreaAndInputWrapperVariants()}>
            <TextArea
              style={{ minHeight: 90 }}
              onChange={(e) => setHeavyItemTextAreaValue && setHeavyItemTextAreaValue(e.currentTarget.value)}
              placeholder={t('QUOTATIONS.describeShort')}
              value={heavyItemTextAreaValue}
            />
          </div>
        )}
        {heavyItemAnswer === YES && error === HEAVY_ITEM_ERROR && (
          <div className={errorWrapperVariants()}>
            <Text spacing="none">{t('error:INFOMISSING.answerQuestion')}</Text>
          </div>
        )}
      </div>
      <div className={dataSectionWrapperVariants()}>
        <Text style={{ margin: '0 0 24px', paddingRight: 16 }} variant="larger">
          {t('QUOTATIONS.parking')}
        </Text>
        <div className={livingSelectionVariants()}>
          <div className={buttonsWrapperVariants()}>
            <div
              className={textButtonWrapperVariants({ selected: parkingAnswerFromAddress === YES })}
              onClick={() => {
                setParkingAnswerFromAddress(YES)
              }}
            >
              {t('QUOTATIONS.yes')}
            </div>
            <div className={clsx(textButtonWrapperVariants({ selected: parkingAnswerFromAddress === NO }), 'mx-[10px]')} onClick={() => setParkingAnswerFromAddress(NO)}>
              {t('QUOTATIONS.no')}
            </div>
            <div className={textButtonWrapperVariants({ selected: parkingAnswerFromAddress === UNKNOWN })} onClick={() => setParkingAnswerFromAddress(UNKNOWN)}>
              {t('QUOTATIONS.dontKnow')}
            </div>
          </div>
        </div>
        <div className={questionIconWrapperVariants()}>
          <Popup withFluidWidth text={<div className={popupWrapperVariants()}>{t('QUOTATIONS.parkingPopup')}</div>}>
            <InfoIcon className="[&_path]:stroke-[var(--color-primary-main)]" />
          </Popup>
        </div>
        {(parkingAnswerFromAddress === NO || parkingAnswerFromAddress === UNKNOWN) && (
          <div className={textAreaAndInputWrapperVariants()}>
            <TextArea
              style={{ minHeight: 90 }}
              onChange={(e) => setParkingTextAnswerFromAddress && setParkingTextAnswerFromAddress(e.currentTarget.value)}
              placeholder={t('QUOTATIONS.describeShort')}
              value={parkingTextAnswerFromAddress}
            />
          </div>
        )}
        {error === PARKING_ANSWER_ERROR && (parkingAnswerFromAddress === NO || parkingAnswerFromAddress === UNKNOWN) && (
          <div className={errorWrapperVariants()}>
            <Text spacing="none">{t('error:INFOMISSING.answerQuestion')}</Text>
          </div>
        )}
      </div>
      <div className={continueButtonWrapperVariants()}>
        <Button onClick={() => validateSection()} largerArrowRight iconRight={<ArrowForward color={'white'} />} text={t('common:continue')} padding="10px 64px" />
      </div>
    </>
  )
}

export default FromSection
