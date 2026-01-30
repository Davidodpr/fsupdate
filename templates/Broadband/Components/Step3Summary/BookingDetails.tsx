import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import formatDate from '@/appComponents/format'
import { useBroadbandProvider } from '@/common/context/broadband/broadbandProvider.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import SelectCustom from '@/components/molecules/SelectCustom'
import DatePicker from '@/components/organisms/DatePicker'
import PencilSimple from '@/public/images/PencilSimple.svg'
import { UpdatedMoveValues } from '@/templates/Electricity/types'
import { BroadbandValues } from '../../types'
import { ToAddress } from '@/components/organisms/AddressForm'
import { ContactDetailsForm } from '@/components/molecules/ContactDetailsForm'
import {
  inputSectionWrapperVariants,
  selectFlatWrapperVariants,
  selectFlatInputWrapperVariants,
  penWrapperVariants,
  buttonWrapperVariants,
  cardTitleVariants,
  cardTitleTextVariants,
  textSectionVariants,
  boldTextVariants,
  largerTextVariants,
} from './BookingDetails.variants'
import { RESIDENCE_TYPES } from '@/constants/residenceTypes'

interface Props {
  formMethods: UseFormReturn<{ phone: string; email: string }>
  formFullWidth?: boolean
  showAddressInput: boolean
  setShowAddressInput: (show: boolean) => void
  showContactInput: boolean
  setShowContactInput: (show: boolean) => void
}

export const BookingDetails = ({ formMethods, formFullWidth, showAddressInput, setShowAddressInput, setShowContactInput, showContactInput }: Props) => {
  const { t } = useTranslation(['common', 'broadband'])
  const { isTabletPortraitOrGreater } = useResponsive()
  const { chosenOffer, broadbandOrder, setSelectedFlatNr, saveOrder, selectedFlatNr } = useBroadbandProvider()

  const routerIsAdded = !!broadbandOrder?.additionalProducts?.length
  const router = chosenOffer?.additionalProducts?.find((x) => x.type === 'router')
  const routerIsNotOptional = router && !router.optional
  const routerMonthly = router && (routerIsAdded || routerIsNotOptional) && router.price?.monthlyAmounts && router.price?.monthlyAmounts[0]?.amount >= 0
  const routerMonthlyPrice = routerMonthly && router?.price?.monthlyAmounts && `${router?.price?.monthlyAmounts[0]?.amount} ${t('common:monthlyPriceUnit')}`
  const routerPrice = router && (routerIsAdded || routerIsNotOptional) && router.price?.oneTimeAmount
  const routerFreightPrice = router && (routerIsAdded || routerIsNotOptional) && router.freightPrice?.oneTimeAmount
  const flatNumbers = chosenOffer?.flatNrs?.map((flatNr) => ({
    value: flatNr,
    label: flatNr,
  }))

  const discountPrice = chosenOffer?.price?.monthlyAmounts?.find((price) => price.end !== -1)

  const {
    user: { profile, currentMove, contact },
    user: {
      currentMove: {
        toAddress: { street: toStreet, zip: toZip, city: toCity, apartmentNumber },
        residenceSize,
        residenceType,
        apartmentType,
      },
      hasFetchedData,
    },
    updateUserInfo,
    updateCurrentToAddress,
  } = useUserContext()

  const isApartment = residenceType === RESIDENCE_TYPES.APARTMENT

  const [data, setData] = useState<BroadbandValues>({
    toAddress: {
      street: '',
      zip: '',
      city: '',
      apartmentNumber: !flatNumbers?.length && apartmentNumber ? apartmentNumber : (broadbandOrder?.selectedFlatNr ?? ''),
    },
  })

  useEffect(() => {
    if (hasFetchedData) {
      setData({
        toAddress: {
          street: toStreet,
          zip: toZip,
          city: toCity,
          apartmentNumber: !flatNumbers?.length && apartmentNumber ? apartmentNumber : (broadbandOrder?.selectedFlatNr ?? ''),
        },
      })
    }
  }, [hasFetchedData])

  const handleSave = async () => {
    const response = await updateCurrentToAddress({
      ...data.toAddress,
      apartmentType,
      residenceType,
      residenceSize,
      apartmentNumber: !chosenOffer?.flatNrs?.length && selectedFlatNr ? selectedFlatNr : null,
    })
    if (response?.id) {
      setShowAddressInput(false)
    }
  }

  return (
    <>
      <div className={inputSectionWrapperVariants({ isOpen: showAddressInput })}>
        <div className={cardTitleVariants()}>
          <h2 className={cardTitleTextVariants()}>{t('orderDetails')}</h2>
        </div>
        {!showAddressInput && (
          <div className={penWrapperVariants()} onClick={() => setShowAddressInput(!showAddressInput)}>
            <PencilSimple />
          </div>
        )}
        <div className={textSectionVariants()}>
          <Text spacing="none" className={boldTextVariants()}>
            {t('broadband:headerService')}
          </Text>
          <Text spacing="none" className={largerTextVariants()}>
            {chosenOffer?.title}
          </Text>
          <ul className="list-disc ml-10">
            {chosenOffer?.price?.monthlyAmounts && chosenOffer.price.monthlyAmounts[0] && (
              <li>
                {chosenOffer.price.monthlyAmounts[0].amount} {t('common:monthlyPriceUnit')}
              </li>
            )}
            {!!chosenOffer?.price?.campaign && discountPrice && <li>{t('broadband:STEPFOUR.monthsDiscount', { months: discountPrice?.end })}</li>}
            <li>{t('broadband:STEPFOUR.monthsBindingTime', { months: chosenOffer?.contractMonths ?? 0 })}</li>
          </ul>
        </div>
        {currentMove?.toAddress && (
          <>
            {showAddressInput ? (
              <>
                <Text spacing="none" className={boldTextVariants()}>
                  {t('common:COMMONADDRESS.address')}
                </Text>
                <ToAddress
                  setData={(moveData: UpdatedMoveValues) =>
                    setData({
                      toAddress: {
                        street: moveData?.toAddress?.street ?? '',
                        zip: moveData?.toAddress?.zip ?? '',
                        city: moveData?.toAddress?.city ?? '',
                        apartmentNumber: !flatNumbers?.length && apartmentNumber ? apartmentNumber : (broadbandOrder?.selectedFlatNr ?? ''),
                      },
                    })
                  }
                  moveData={data}
                />
              </>
            ) : (
              <div className={textSectionVariants()}>
                <Text spacing="none" className={boldTextVariants()}>
                  {t('common:COMMONADDRESS.address')}
                </Text>
                <Text spacing="none" className={largerTextVariants()}>{`${currentMove?.toAddress?.street}, ${currentMove?.toAddress?.zip} ${currentMove?.toAddress.city}`}</Text>
              </div>
            )}
          </>
        )}
        <>
          {!!broadbandOrder?.selectedFlatNr && isApartment && (
            <>
              {showAddressInput ? (
                <>
                  <Text style={{ margin: '0px 0px 16px' }} className={boldTextVariants()}>
                    {t('common:apartmentNumber')}
                  </Text>
                  {chosenOffer?.requireFlatNr || (isApartment && flatNumbers && flatNumbers.length > 0) ? (
                    <div className={selectFlatWrapperVariants()}>
                      <Flex direction={isTabletPortraitOrGreater ? 'row' : 'column'} justifyContent="start" alignItems="center">
                        <div className={selectFlatInputWrapperVariants()}>
                          <SelectCustom
                            defaultValue={broadbandOrder?.selectedFlatNr ?? ''}
                            value={broadbandOrder?.selectedFlatNr ?? ''}
                            items={flatNumbers || []}
                            label={t('apartmentNumber')}
                            onValueChange={(e) => {
                              setSelectedFlatNr(e)
                              saveOrder({
                                ...broadbandOrder,
                                selectedFlatNr: e,
                              })
                            }}
                          />
                        </div>
                      </Flex>
                    </div>
                  ) : (
                    <Input
                      type="numberWithValidation"
                      maxLength={4}
                      placeholder="XXXX"
                      style={{ marginBottom: 16 }}
                      error={
                        (broadbandOrder?.selectedFlatNr?.toString().length > 0 && broadbandOrder?.selectedFlatNr?.toString().length < 4) ||
                        (!Number(broadbandOrder?.selectedFlatNr) && broadbandOrder?.selectedFlatNr?.toString().length !== 0)
                          ? t('STEP3DETAILS.aptNumberError')
                          : undefined
                      }
                      label={t('broadband:apartmentNumber')}
                      onChange={(event) => {
                        saveOrder({
                          ...broadbandOrder,
                          selectedFlatNr: event.currentTarget.value,
                        })
                        setSelectedFlatNr(event.currentTarget.value)
                      }}
                      value={broadbandOrder?.selectedFlatNr}
                    />
                  )}
                </>
              ) : (
                <div className={textSectionVariants()}>
                  <Text spacing="none" className={boldTextVariants()}>
                    {t('common:apartmentNumber')}
                  </Text>
                  <Text spacing="none" className={largerTextVariants()}>
                    {broadbandOrder?.selectedFlatNr}
                  </Text>
                </div>
              )}
            </>
          )}
        </>

        {broadbandOrder?.startDate && (
          <>
            {showAddressInput ? (
              <>
                <Text spacing="none" className={`${boldTextVariants()} mb-4`}>
                  {t('broadband:STEPFOUR.startDate')}
                </Text>
                <DatePicker
                  placeholder={t('broadband:STEPTHREE.startDateLabel') ?? ''}
                  defaultValue={new Date(broadbandOrder?.startDate)}
                  withoutDayInDate={true}
                  setDatePicked={(value) => {
                    const date = new Date(value.fullDate)
                    saveOrder({
                      ...broadbandOrder,
                      startDate: formatDate(date, 'yyyy-MM-dd'),
                    })
                  }}
                />
              </>
            ) : (
              <>
                <div className={textSectionVariants({ noPadding: true })} style={{ marginBottom: 16 }}>
                  <Text spacing="none" className={boldTextVariants()}>
                    {t('broadband:STEPFOUR.startDate')}
                  </Text>
                  {broadbandOrder?.startDate && (
                    <Text spacing="none" className={largerTextVariants()}>
                      {formatDate(new Date(broadbandOrder?.startDate), 'dd MMMM yyyy')}
                    </Text>
                  )}
                </div>
              </>
            )}
          </>
        )}
        {!!router?.name?.length && (routerIsAdded || routerIsNotOptional) && (
          <div className={textSectionVariants()}>
            <Text spacing="none" className={boldTextVariants()}>
              {t('broadband:STEPFOUR.addon')}
            </Text>
            <Text spacing="none" className={largerTextVariants()}>
              {router?.title ?? router?.name}
            </Text>
            <ul style={{ margin: 0 }}>
              {routerPrice ? (
                <li>
                  {t('broadband:STEPTHREE.price')} {`${routerPrice} ${t('common:priceUnit')}`}
                </li>
              ) : routerMonthlyPrice ? (
                <li>
                  {t('broadband:STEPTHREE.monthlyRental')} {routerMonthlyPrice}
                </li>
              ) : (
                <li>
                  {t('broadband:STEPTHREE.price')} {`${0} ${t('common:priceUnit')}`}
                </li>
              )}
              <li>
                {t('broadband:STEPTHREE.bindingTime')} {router?.contractMonths ?? 0} {t('common:months')}
              </li>
              {!!routerFreightPrice && (
                <li>
                  {t('broadband:STEPTWO.freight')} {router?.freightPrice?.oneTimeAmount} {t('common:priceUnit')}
                </li>
              )}
            </ul>
          </div>
        )}
        {chosenOffer?.comparisonPriceAmount && (
          <div className={textSectionVariants()}>
            <Text spacing="none" className={boldTextVariants()}>
              {t('broadband:STEPTWO.comparisonPrice')}
            </Text>
            <Text spacing="none" className={largerTextVariants()}>
              {chosenOffer?.comparisonPriceAmount} {t('broadband:STEPTWO.pricePerMonth')}
            </Text>
          </div>
        )}
        {showAddressInput && (
          <Flex direction="row" justifyContent="space-between" alignItems="center" style={{ marginTop: '16px' }}>
            <div className={buttonWrapperVariants()}>
              <Button
                type="submit"
                padding="10px 84px"
                text={t('common:INFOMISSING.save')}
                onClick={async (event) => {
                  event.preventDefault()
                  await handleSave()
                }}
              />
            </div>
          </Flex>
        )}
      </div>

      <ContactDetailsForm
        formMethods={formMethods}
        formFullWidth={formFullWidth}
        showContactInput={showContactInput}
        setShowContactInput={setShowContactInput}
        buttonPadding="10px 84px"
      />
    </>
  )
}
