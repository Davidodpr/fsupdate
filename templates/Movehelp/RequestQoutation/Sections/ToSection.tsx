import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useMovehelpContext } from '@/common/context/movehelpProvider/movehelp.provider'
import { YES, NO, LARGEELEVATOR, SMALLELEVATOR, NOELEVATOR, UNKNOWN } from '@/common/context/movehelpProvider/movehelp.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { RESIDENCE_TYPES } from '@/constants/residenceTypes'

import useResponsive from '@/common/hooks/useResponsive'
import ArrowForward from '@/components/atoms/ArrowForward'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Popup from '@/components/atoms/Popup'
import Text from '@/components/atoms/Text'
import TextArea from '@/components/atoms/TextArea'
import InfoIcon from '@/public/images/Question_green.svg'
import { FromResidenceSizeInput } from '@/components/organisms/FormFields/FromResidenceSize/FromResidenceSize'
import { ToAddress } from '@/components/organisms/AddressForm/ToAddress/ToAddress'
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
import { TO_ADDRESS_ERROR, SQM_ERROR, RESIDENCETYPE_ERROR, STAIRS_ERROR, PARKING_ANSWER_ERROR } from './helper'

interface ToSectionProps {
  setCurrentStep: (step: number) => void
  currentStep: number
}

export const ToSection = ({ setCurrentStep, currentStep }: ToSectionProps) => {
  const { t } = useTranslation(['movehelp', 'common', 'error'])
  const { APARTMENT, TOWNHOUSE, HOUSE } = RESIDENCE_TYPES
  const [error, setError] = useState<string | null>(null)
  const { isTabletPortraitOrGreater } = useResponsive()
  const {
    user: {
      hasFetchedData,
      currentMove: { residenceType, apartmentType, toAddress },
    },
    updateCurrentToAddress,
  } = useUserContext()

  const sqmRef = useRef<HTMLDivElement>(null)
  const toAddressRef = useRef<HTMLDivElement>(null)
  const firstStairsRef = useRef<HTMLDivElement>(null)
  const secondStairsRef = useRef<HTMLDivElement>(null)

  const {
    toData,
    setToData,
    setToElevatorValue,
    setSelectedToResidenceType,
    toElevatorValue,
    selectedToResidenceType,
    setParkingAnswerToAddress,
    parkingAnswerToAddress,
    setParkingTextAnswerToAddress,
    parkingTextAnswerToAddress,
    hasSetInitialValues,
    setToResidenceTypeStairsValue,
    toResidenceTypeStairsValue,
  } = useMovehelpContext()
  const [missingStreetNumberError, setMissingStreetNumberError] = useState(false)

  useEffect(() => {
    if (residenceType) {
      setSelectedToResidenceType(residenceType)
    }
  }, [residenceType])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  if (!hasSetInitialValues || !hasFetchedData) return null

  const validateSection = () => {
    if (!toData.toAddress?.city || !toData.toAddress?.street || !toData.toAddress?.zip || missingStreetNumberError) {
      setError(TO_ADDRESS_ERROR)
      toAddressRef && toAddressRef.current && toAddressRef.current.focus()
      toAddressRef && toAddressRef.current && toAddressRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    } else if (!toData.sqm || toData.sqm <= 0) {
      setError(SQM_ERROR)
      sqmRef && sqmRef.current && sqmRef.current.focus()
      sqmRef && sqmRef.current && sqmRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    } else if (!selectedToResidenceType) {
      setError(RESIDENCETYPE_ERROR)
    } else if (!toResidenceTypeStairsValue) {
      setError(STAIRS_ERROR)
      if (selectedToResidenceType === HOUSE || selectedToResidenceType === TOWNHOUSE) {
        firstStairsRef && firstStairsRef.current && firstStairsRef.current.focus()
        firstStairsRef && firstStairsRef.current && firstStairsRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      } else {
        secondStairsRef && secondStairsRef.current && secondStairsRef.current.focus()
        secondStairsRef && secondStairsRef.current && secondStairsRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    } else if ((parkingAnswerToAddress === NO || parkingAnswerToAddress === UNKNOWN) && !parkingTextAnswerToAddress?.length) {
      setError(PARKING_ANSWER_ERROR)
    } else {
      updateCurrentToAddress({
        city: toData.toAddress.city,
        street: toData.toAddress.street,
        zip: toData.toAddress.zip,
        residenceSize: toData.sqm,
        residenceType: selectedToResidenceType,
        apartmentType: apartmentType,
        apartmentNumber: toAddress?.apartmentNumber ?? null,
      })
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <>
      <div ref={toAddressRef} className={dataSectionWrapperVariants()} style={{ marginTop: 8, paddingBottom: error === TO_ADDRESS_ERROR ? 16 : isTabletPortraitOrGreater ? 5 : 0 }}>
        <Text style={{ margin: '0 0 14px' }} variant="larger">
          {t('QUOTATIONS.whereAreYouMovingTo')}
        </Text>
        <ToAddress
          moveData={toData}
          setData={(data) => {
            setToData(data)
            // Clear error when user updates address
            if (error === TO_ADDRESS_ERROR && data.toAddress?.city && data.toAddress?.street && data.toAddress?.zip) {
              setError(null)
            }
          }}
          withoutPadding
          setMissingStreetNumberError={setMissingStreetNumberError}
        />
        {error === TO_ADDRESS_ERROR && (
          <div className={errorWrapperVariants()}>
            <Text spacing="none">{t('error:INFOMISSING.invalidStreet')}</Text>
          </div>
        )}
      </div>
      <div ref={sqmRef} className={dataSectionWrapperVariants({ hasError: error === SQM_ERROR })}>
        <Text style={{ margin: '0 0 24px' }} variant="larger">
          {t('QUOTATIONS.howBigIsResidence')}
        </Text>
        <FromResidenceSizeInput
          key="residenceSizeToAddress"
          isToAddress
          withAdditionalSpace={false}
          noMarginBottom
          moveData={toData}
          setData={(data) => {
            setToData(data)
            // Clear error when user starts typing
            if (error === SQM_ERROR && data.sqm) {
              setError(null)
            }
          }}
        />
        {error === SQM_ERROR && (
          <div className={errorWrapperVariants()}>
            <Text spacing="none">{t('error:INFOMISSING.residenceSize')}</Text>
          </div>
        )}
      </div>
      <div
        className={dataSectionWrapperVariants({
          hasError: error === RESIDENCETYPE_ERROR && selectedToResidenceType !== HOUSE,
          hasInputAndError: (selectedToResidenceType === HOUSE || selectedToResidenceType === TOWNHOUSE) && (error === RESIDENCETYPE_ERROR || error === STAIRS_ERROR),
        })}
      >
        <Text style={{ margin: '0 0 24px' }} variant="larger">
          {t('QUOTATIONS.typeOfResidence')}
        </Text>
        <div className={livingSelectionVariants()}>
          <div className={buttonsWrapperVariants()}>
            <div
              className={textButtonWrapperVariants({ selected: selectedToResidenceType === APARTMENT })}
              onClick={() => {
                setSelectedToResidenceType(APARTMENT)
                if (error === RESIDENCETYPE_ERROR) {
                  setError(null)
                }
              }}
            >
              {t('common:INFOMISSING.apartment')}
            </div>
            <div
              className={clsx(textButtonWrapperVariants({ selected: selectedToResidenceType === TOWNHOUSE }), 'mx-[10px]')}
              onClick={() => {
                setSelectedToResidenceType(TOWNHOUSE)
                if (error === RESIDENCETYPE_ERROR) {
                  setError(null)
                }
              }}
            >
              {t('common:INFOMISSING.townhouse')}
            </div>
            <div
              className={textButtonWrapperVariants({ selected: selectedToResidenceType === HOUSE })}
              onClick={() => {
                setSelectedToResidenceType(HOUSE)
                if (error === RESIDENCETYPE_ERROR) {
                  setError(null)
                }
              }}
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
        {(selectedToResidenceType === HOUSE || selectedToResidenceType === TOWNHOUSE) && (
          <div className={inputWrapperVariants({ fullWidth: true })}>
            <Input
              type="text"
              onChange={(e) => {
                setToResidenceTypeStairsValue(e.currentTarget.value)
                if (error === STAIRS_ERROR && e.currentTarget.value) {
                  setError(null)
                }
              }}
              defaultValue={toResidenceTypeStairsValue}
              label={t('QUOTATIONS.amountOfFloors') ?? ''}
            />
          </div>
        )}
        {(selectedToResidenceType === HOUSE || selectedToResidenceType === TOWNHOUSE) && error === STAIRS_ERROR && (
          <div className={errorWrapperVariants()} ref={firstStairsRef}>
            <Text spacing="none">{t('error:INFOMISSING.answerQuestion')}</Text>
          </div>
        )}
      </div>
      {selectedToResidenceType === APARTMENT && (
        <div className={dataSectionWrapperVariants({ hasInputAndError: error === STAIRS_ERROR })}>
          <Text style={{ margin: '0 0 24px' }} variant="larger">
            {t('QUOTATIONS.elevator')}
          </Text>
          <div className={livingSelectionVariants()}>
            <div className={buttonsWrapperVariants()}>
              <div
                className={textButtonWrapperVariants({ selected: toElevatorValue === LARGEELEVATOR })}
                onClick={() => {
                  setToElevatorValue(LARGEELEVATOR)
                }}
              >
                {t('QUOTATIONS.bigElevator')}
              </div>
              <div className={clsx(textButtonWrapperVariants({ selected: toElevatorValue === SMALLELEVATOR }), 'mx-[10px]')} onClick={() => setToElevatorValue(SMALLELEVATOR)}>
                {t('QUOTATIONS.smallElevator')}
              </div>
              <div className={clsx(textButtonWrapperVariants({ selected: toElevatorValue === NOELEVATOR }), 'whitespace-nowrap')} onClick={() => setToElevatorValue(NOELEVATOR)}>
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
              className="text-[15px]"
              onChange={(e) => {
                setToResidenceTypeStairsValue(e.currentTarget.value)
                if (error === STAIRS_ERROR && e.currentTarget.value) {
                  setError(null)
                }
              }}
              defaultValue={toResidenceTypeStairsValue}
              label={t('QUOTATIONS.whichFloor') ?? ''}
            />
            <Text variant="smallItalic" className="!mt-2">
              {t('QUOTATIONS.whichFloorHelper')}
            </Text>
          </div>
          {error === STAIRS_ERROR && selectedToResidenceType === APARTMENT && (
            <div className={errorWrapperVariants()} ref={secondStairsRef}>
              <Text spacing="none">{t('error:INFOMISSING.answerQuestion')}</Text>
            </div>
          )}
        </div>
      )}
      <div className={dataSectionWrapperVariants()}>
        <Text style={{ margin: '0 0 24px' }} variant="larger">
          {t('QUOTATIONS.parking')}
        </Text>
        <div className={livingSelectionVariants()}>
          <div className={buttonsWrapperVariants()}>
            <div
              className={textButtonWrapperVariants({ selected: parkingAnswerToAddress === YES })}
              onClick={() => {
                setParkingAnswerToAddress(YES)
              }}
            >
              {t('QUOTATIONS.yes')}
            </div>
            <div className={clsx(textButtonWrapperVariants({ selected: parkingAnswerToAddress === NO }), 'ml-[10px]')} onClick={() => setParkingAnswerToAddress(NO)}>
              {t('QUOTATIONS.no')}
            </div>
            <div className={clsx(textButtonWrapperVariants({ selected: parkingAnswerToAddress === UNKNOWN }), 'ml-[10px]')} onClick={() => setParkingAnswerToAddress(UNKNOWN)}>
              {t('QUOTATIONS.dontKnow')}
            </div>
          </div>
        </div>
        <div className={questionIconWrapperVariants()}>
          <Popup withFluidWidth text={<div className={popupWrapperVariants()}>{t('QUOTATIONS.parkingPopup')}</div>}>
            <InfoIcon className="[&_path]:stroke-[var(--color-primary-main)]" />
          </Popup>
        </div>
        {(parkingAnswerToAddress === NO || parkingAnswerToAddress === UNKNOWN) && (
          <div className={textAreaAndInputWrapperVariants()}>
            <TextArea
              style={{ minHeight: 90 }}
              onChange={(e) => {
                setParkingTextAnswerToAddress && setParkingTextAnswerToAddress(e.currentTarget.value)
                if (error === PARKING_ANSWER_ERROR && e.currentTarget.value) {
                  setError(null)
                }
              }}
              placeholder={t('QUOTATIONS.describeShort')}
              value={parkingTextAnswerToAddress}
            />
          </div>
        )}
        {error === PARKING_ANSWER_ERROR && (parkingAnswerToAddress === NO || parkingAnswerToAddress === UNKNOWN) && (
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

export default ToSection
