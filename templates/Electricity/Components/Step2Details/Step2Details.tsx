import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'react-use'
import Image from 'next/legacy/image'
import { useElectricityProvider } from '@/common/context/electricity/electricityContext.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ElectricityEnum, ElectricityIconsUrls } from '@/common/enums/ElectricityEnum'
import { getDefaultDate, getDisabledDays } from '@/common/helpers/date'
import useResponsive from '@/common/hooks/useResponsive'
import ArrowForward from '@/components/atoms/ArrowForward'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Checkbox'
import Flex from '@/components/atoms/Flex'
import ImageKit from '@/components/atoms/ImageKit'
import Input from '@/components/atoms/Input'
import Popup from '@/components/atoms/Popup'
import Text from '@/components/atoms/Text'
import ApartmentNumberInfoModal from '@/components/molecules/ApartmentNumberInfoModal'
import DatePicker from '@/components/organisms/DatePicker'
import { FORTUM, TIBBER } from '@/constants/electricity'
import ArrowLeft from '@/public/images/ArrowLeft.svg'
import { FromAddress } from '@/components/organisms/AddressForm'
import { UpdatedMoveValues, CancelOldContractFromAddress } from '@/templates/Electricity/types'

import { RESIDENCE_TYPES } from '@/constants/residenceTypes'

export interface Step2DetailsProps {
  providerName: string
  setCurrentStep: (step: number) => void
  previousStep: number
}

const Step2Details = ({ providerName, setCurrentStep, previousStep }: Step2DetailsProps) => {
  const { t } = useTranslation(['electricity', 'common'])
  const { isTabletPortraitOrGreater } = useResponsive()
  const {
    startDate,
    setStartDate,
    apartmentNumber: selectedApartmentNumber,
    setApartmentNumber,
    facilityId,
    setFacilityId,
    cancelOldContractDate,
    setCancelOldContractDate,
    cancelOldContract,
    setCancelOldContract,
  } = useElectricityProvider()

  const {
    user: {
      currentMove: {
        movingDate,
        toAddress: { apartmentNumber },
        fromAddress,
        residenceType,
      },
      hasFetchedData,
    },
    updateCurrentFromAddress,
  } = useUserContext()

  const [cancelOldContractFromData, setCancelOldContractFromData] = useState<CancelOldContractFromAddress>({
    street: '',
    zip: '',
    city: '',
  })

  const [hasCheckedDefaultDate, setHasCheckedDefaultDate] = useState(false)
  const [isPristine, setIsPristine] = useState(true)
  const { iconSet } = useThemeContext()

  useEffect(() => {
    if (!selectedApartmentNumber && apartmentNumber && isPristine) {
      setApartmentNumber(apartmentNumber)
    }
  }, [apartmentNumber, selectedApartmentNumber, setApartmentNumber, isPristine])

  const inputRef = useRef<HTMLInputElement>(null)

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pastedText = event.clipboardData.getData('text')
    const trimmedText = pastedText.replace(/\s+/g, '')
    if (inputRef.current) {
      setFacilityId(trimmedText)
      inputRef.current.value = trimmedText
    }
  }

  const isFriday = new Date().getDay() === 5
  const isSaturday = new Date().getDay() === 6
  const isSunday = new Date().getDay() === 0
  const daysToAdd = isFriday ? 3 : isSaturday ? 2 : isSunday ? 1 : 1
  const today = new Date()
  const fromDate = new Date(today)
  const toDate = new Date(today)
  const tomorrow = new Date(today)
  const twoDaysAfter = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  twoDaysAfter.setDate(twoDaysAfter.getDate() + 2)
  toDate.setDate(toDate.getDate() + 7 + daysToAdd)
  fromDate.setDate(fromDate.getDate() + daysToAdd)
  const [showModal, setShowModal] = useState(false)
  const [showFacilityId, setShowFacilityId] = useState<boolean>(movingDate && new Date(movingDate) >= toDate ? true : false)

  useEffect(() => {
    const newToDate = new Date()
    newToDate.setDate(newToDate.getDate() + 8)
    if (startDate !== null && startDate <= newToDate) {
      setShowFacilityId(true)
    } else setShowFacilityId(false)
  }, [startDate])

  useEffect(() => {
    if (hasFetchedData) {
      setCancelOldContractFromData({
        street: fromAddress?.street ?? '',
        zip: fromAddress?.zip ?? '',
        city: fromAddress?.city ?? '',
      })
    }
  }, [hasFetchedData])

  useDebounce(
    async () => {
      if (cancelOldContractFromData?.street?.length && cancelOldContractFromData?.street !== fromAddress?.street) {
        const response = await updateCurrentFromAddress({ ...cancelOldContractFromData })
        if (response && response.id) {
          setCancelOldContractFromData({ ...response.fromAddress })
          checkDisabledButton()
        }
      }
    },
    500,
    [cancelOldContractFromData, fromAddress?.street],
  )

  useEffect(() => {
    if (!hasCheckedDefaultDate && previousStep !== 3) {
      setStartDate(getDefaultDate(new Date(movingDate)))
      setCancelOldContractDate(getDefaultDate(new Date(movingDate)))
      setHasCheckedDefaultDate(true)
    } else {
      setHasCheckedDefaultDate(true)
    }
  }, [movingDate, setStartDate, hasCheckedDefaultDate])

  const checkDisabledButton = () => {
    if (
      !startDate ||
      (residenceType === RESIDENCE_TYPES.APARTMENT && !selectedApartmentNumber) ||
      (selectedApartmentNumber.toString().length > 0 && selectedApartmentNumber.toString().length < 4) ||
      (!Number(selectedApartmentNumber) && selectedApartmentNumber.toString().length !== 0) ||
      (cancelOldContract && !cancelOldContractDate) ||
      (showFacilityId && (!facilityId.startsWith('735999') || facilityId.length !== 18)) ||
      (cancelOldContract && !cancelOldContractFromData.street)
    ) {
      return true
    }
    return false
  }

  const getFacilityIdError = () => {
    if (facilityId.length > 0 && facilityId.length !== 0 && !facilityId.startsWith('735999')) {
      return t('STEP3DETAILS.facilityIdError')
    }
    if (facilityId.startsWith('735999') && facilityId.length < 18) {
      return t('STEP3DETAILS.facilityIdLengthError')
    } else return undefined
  }

  return (
    <>
      <ApartmentNumberInfoModal setShowModal={setShowModal} showModal={showModal} />
      <div className="w-full h-full px-4 pb-20 md:max-w-[744px] md:mx-auto md:p-0" data-testid="step-3-details-container">
        <div className="flex items-center justify-center w-full relative text-[var(--color-text-main)] hover:cursor-pointer md:w-full md:my-4 md:h-8">
          <div className="absolute left-0 flex justify-center items-center md:flex md:justify-center md:items-center md:pr-4" onClick={() => setCurrentStep(1)}>
            <ArrowLeft width={22} height={22} />
            {isTabletPortraitOrGreater && <Text style={{ textDecoration: 'underline', margin: '0px 0px 0px 8px' }}>{t('common:goBack')}</Text>}
          </div>
          {!isTabletPortraitOrGreater && (
            <Text spacing="none" className="!text-[24px] !font-bold !py-4" style={{ fontSize: '24px !important', fontWeight: 'bold', padding: '16px 0' }}>
              {t('STEP3DETAILS.details')}
            </Text>
          )}
        </div>
        <div className="p-4 w-[822px] max-w-full flex flex-col bg-white rounded-[var(--radius-main)] relative shadow-[var(--shadow-regular)] md:p-4 md:px-8">
          <div className="flex border-b border-[var(--color-background-default)] relative items-center w-full justify-between pb-4 flex-wrap md:w-full md:p-0 md:pb-4 md:border-b md:border-[#21476633] md:text-[32px]">
            {isTabletPortraitOrGreater && (
              <Text spacing="none" className="!text-[32px] !font-bold !py-0">
                {t('STEP3DETAILS.details')}
              </Text>
            )}
            <Flex justifyContent={isTabletPortraitOrGreater ? 'center' : 'space-between'} alignItems="center" style={{ width: isTabletPortraitOrGreater ? 'fit-content' : '100%' }}>
              <ImageKit
                objectFit={providerName === TIBBER ? 'cover' : 'contain'}
                src={`${ElectricityEnum?.[providerName as keyof ElectricityIconsUrls]}`}
                width={165}
                height={36}
              />
              <div className="px-3 py-2 rounded-lg bg-[var(--color-standard-move-section-background)] h-fit ml-4">
                <Text className="!text-[16px] !font-bold" spacing="none">
                  {providerName === TIBBER ? t('quarterPrice') : providerName === FORTUM ? t('movingPriceMonthly') : t('movingPrice')}
                </Text>
              </div>
            </Flex>
          </div>
          <div className={`py-4 px-0 flex flex-col md:pt-4 md:pb-0 ${showFacilityId ? 'pt-4 pb-0' : ''}`}>
            <div className="flex flex-col font-bold md:max-w-[50%] md:text-[20px]">
              <Text spacing="none" className="mb-3 !font-bold">
                {t('STEP3DETAILS.startingText')}
              </Text>
              {hasCheckedDefaultDate && (
                <DatePicker
                  key="startDate"
                  placeholder={t('STEP3DETAILS.chooseDate') ?? ''}
                  defaultValue={new Date(startDate)}
                  positionBottom
                  parentSelectedDay={new Date(startDate)}
                  parentDefaultMonth={new Date(startDate)}
                  setDatePicked={(value) => {
                    const date = new Date(value.fullDate)
                    setStartDate(date)
                  }}
                  withoutDayInDate
                  disabledToday={getDisabledDays(true)}
                  highlighted={{ from: fromDate, to: toDate }}
                  infoContent={<div>{t('STEP3DETAILS.datePopupText')}</div>}
                />
              )}
            </div>
            {residenceType === RESIDENCE_TYPES.APARTMENT && (
              <div className="flex flex-col font-bold md:max-w-[50%] md:text-[20px]" style={{ padding: showFacilityId ? '20px 0 35px 0' : '20px 0 0 0' }}>
                <Text className="mb-3 !font-bold" spacing="bottom">
                  {t('STEP3DETAILS.apartmentNumber')}
                </Text>
                <Input
                  className="!text-[16px]"
                  endIcon={
                    <div className="w-6 h-6 text-[var(--color-question-icon-color)] hover:cursor-pointer" onClick={() => setShowModal(true)}>
                      <Image src={iconSet.INFO_ICON} alt="question icon" width={24} height={24} />
                    </div>
                  }
                  type="numberWithValidation"
                  maxLength={4}
                  error={
                    (selectedApartmentNumber.toString().length > 0 && selectedApartmentNumber.toString().length < 4) ||
                    (!Number(selectedApartmentNumber) && selectedApartmentNumber.toString().length !== 0)
                      ? t('STEP3DETAILS.aptNumberError')
                      : undefined
                  }
                  label={t('STEP3DETAILS.addApartmentNumber')}
                  onChange={(event) => {
                    setApartmentNumber(event.currentTarget.value)
                    if (isPristine) setIsPristine(false)
                  }}
                  value={selectedApartmentNumber}
                />
              </div>
            )}
            {showFacilityId && (
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col font-bold px-1 md:max-w-full md:w-full md:text-[20px]">
                  <Text className="mb-3 !font-bold" spacing="bottom">
                    {t('STEP3DETAILS.facilityIdText')}
                  </Text>
                  <Input
                    endIcon={
                      <div className="w-6 h-6 text-[var(--color-question-icon-color)] hover:cursor-pointer">
                        <Popup text={t('STEP3DETAILS.facilityIdPopupText')}>
                          <Image src={iconSet.INFO_ICON} alt="question icon" width={24} height={24} />
                        </Popup>
                      </div>
                    }
                    value={facilityId}
                    type="numberWithValidation"
                    maxLength={18}
                    placeholder="735999XXXXXXXXXX"
                    className="!text-[16px]"
                    error={getFacilityIdError()}
                    label={t('STEP3DETAILS.addFacilityId')}
                    alwaysActiveLabel={true}
                    onChange={(event) => setFacilityId(event.currentTarget.value)}
                    onPaste={handlePaste}
                    inputRef={inputRef}
                  />
                </div>
                <div className="w-full flex flex-col justify-end items-center md:h-[73px]">
                  <div className="rounded-[var(--radius-small)] bg-[#ECF9F7] text-[#123A33] flex justify-center items-center px-4 py-3 mt-4 mb-0 md:max-w-full md:m-0 md:ml-6">
                    <Text style={{ paddingLeft: 10 }} variant="bodyLarge" spacing="none">
                      <span style={{ fontWeight: 'bold', paddingRight: 4 }}>{t('STEP3DETAILS.tip')}</span>
                      {t('STEP3DETAILS.facilityIDWarningMessage')}
                    </Text>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="p-4 w-[822px] max-w-full flex flex-col bg-white rounded-[var(--radius-main)] relative shadow-[var(--shadow-regular)] md:p-8 md:px-12"
          style={{ marginTop: 16 }}
        >
          <Flex style={{ maxWidth: isTabletPortraitOrGreater ? '50%' : '100%', marginBottom: 16 }} justifyContent="center">
            <Checkbox style={{ marginTop: 4 }} checked={cancelOldContract} onChange={(event) => setCancelOldContract(event.target.checked)} />
            <Text spacing="none" style={{ paddingLeft: 8, fontSize: '16px' }}>
              {t('STEPTWO.cancelOldContractDateText')}
            </Text>
          </Flex>

          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col font-bold px-1 md:max-w-full md:w-full md:text-[20px]">
              <Text className="mb-3 !font-bold" spacing="none">
                {t('STEPTWO.cancelOldContractDate')}
              </Text>
              {hasCheckedDefaultDate && (
                <DatePicker
                  key="cancelOldContractDate"
                  placeholder={t('STEP3DETAILS.chooseDate') ?? ''}
                  defaultValue={new Date(cancelOldContractDate)}
                  parentSelectedDay={new Date(cancelOldContractDate)}
                  parentDefaultMonth={new Date(startDate)}
                  setDatePicked={(value) => {
                    const date = new Date(value.fullDate)
                    setCancelOldContractDate(date)
                  }}
                  withoutDayInDate
                  disabledToday={getDisabledDays(true)}
                  highlighted={{ from: fromDate, to: toDate }}
                  infoContent={<div>{t('STEP3DETAILS.datePopupText')}</div>}
                />
              )}
            </div>
            <div className="w-full flex flex-col justify-end items-center md:h-[73px]">
              <div className="rounded-[var(--radius-small)] bg-[#ECF9F7] text-[#123A33] flex justify-center items-center px-4 py-3 mt-2 mb-0 md:max-w-full md:m-0 md:ml-6">
                <Text style={{ paddingLeft: 10 }} variant="bodyLarge" spacing="none">
                  {t('STEPTWO.cancelOldContractHelperBoxText')}
                </Text>
              </div>
            </div>
          </div>
          {cancelOldContract && (
            <div className="flex items-center justify-center my-4 md:items-start md:justify-start md:w-1/2">
              <FromAddress
                moveData={{ fromAddress: { ...cancelOldContractFromData } }}
                withoutPadding
                setData={(moveData: UpdatedMoveValues) =>
                  setCancelOldContractFromData({
                    street: moveData.fromAddress?.street ?? '',
                    zip: moveData.fromAddress?.zip ?? '',
                    city: moveData.fromAddress?.city ?? '',
                  })
                }
              />
            </div>
          )}
        </div>
        <div className="w-full flex justify-center items-center pl-2.5 mt-8 md:p-0">
          <div className="h-12 m-0 md:p-0 md:w-[300px]">
            <Button
              iconRight={<ArrowForward color="currentColor" />}
              text={t('common:continue')}
              padding={isTabletPortraitOrGreater ? '8px 64px' : '8px 100px'}
              disabled={checkDisabledButton()}
              onClick={() => {
                setCurrentStep(3)
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Step2Details
