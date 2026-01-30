import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import formatDate from '@/appComponents/format'
import { useBroadbandProvider } from '@/common/context/broadband/broadbandProvider.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import useResponsive from '@/common/hooks/useResponsive'
import ArrowForward from '@/components/atoms/ArrowForward'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Checkbox'
import Flex from '@/components/atoms/Flex'
import ImageKit from '@/components/atoms/ImageKit'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import ApartmentNumberInfoModal from '@/components/molecules/ApartmentNumberInfoModal'
import { Modal, ModalContent, ModalTitle } from '@/components/molecules/Modal'
import SelectCustom from '@/components/molecules/SelectCustom'
import DatePicker from '@/components/organisms/DatePicker'
import ArrowLeft from '@/public/images/ArrowLeft.svg'
import Close from '@/public/images/Close.svg'
import InfoIcon from '@/public/images/Info.svg'
import {
  wrapperVariants,
  priceAndDiscountTextBoldVariants,
  movingPriceBoxVariants,
  buttonsWrapperVariants,
  arrowWrapperVariants,
  customModalWrapperVariants,
  headerWrapperVariants,
  innerWrapperVariants,
  largeButtonWrapperVariants,
  mainWrapperVariants,
  inputWrapperVariants,
  apartmentNumberInfoVariants,
  selectFlatWrapperVariants,
  selectFlatInputWrapperVariants,
  iconWrapperVariants,
  linkTextVariants,
  dateInputRowVariants,
  datePickerWrapperVariants,
  dateErrorInfoDesktopVariants,
  apartmentInputRowVariants,
  apartmentInputWrapperVariants,
  apartmentNumberInfoDesktopVariants,
  iconErrorWrapperVariants,
  linkTextErrorVariants,
  dateRestrictionModalContentVariants,
  dateRestrictionIconWrapperVariants,
  dateRestrictionTextContentVariants,
} from './Step2Details.variants'
import { RESIDENCE_TYPES } from '@/constants/residenceTypes'

const ROUTER = 'router'
// Special value used by broadband API for houses in flat numbers
const HOUSE_FLAT_NUMBER = 'VILLA'

interface Step2Details {
  setCurrentStep?: (currentStep: number) => void
}

const Step2Details = ({ setCurrentStep }: Step2Details) => {
  const { chosenOffer, broadbandOrder, saveOrder, selectedFlatNr, setSelectedFlatNr } = useBroadbandProvider()
  const { isTabletPortraitOrGreater } = useResponsive()
  const { t } = useTranslation(['broadband', 'common'])
  const [openModal, setOpenModal] = useState(false)
  const [openFlatNumberModal, setOpenFlatNumberModal] = useState(false)
  const [dateError, setDateError] = useState<string | null>(null)
  const [openDateInfoModal, setOpenDateInfoModal] = useState(false)

  const {
    user: {
      currentMove: {
        residenceType,
        movingDate,
        toAddress: { apartmentNumber },
      },
    },
  } = useUserContext()

  const getDefaultDate = useCallback(() => {
    const today = new Date()
    const movingDateObj = new Date(movingDate)
    if (movingDateObj <= today) {
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
      return tomorrow
    }
    return movingDateObj
  }, [movingDate])

  const validateStartDate = useCallback(
    (date: Date) => {
      if (!chosenOffer?.allowedStartDateDaysAhead) {
        setDateError(null)
        return true
      }

      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(date)
      selectedDate.setHours(0, 0, 0, 0)

      const maxAllowedDate = new Date(today)
      maxAllowedDate.setDate(today.getDate() + chosenOffer.allowedStartDateDaysAhead)

      if (selectedDate > maxAllowedDate) {
        setDateError(t('STEPTHREE.startDateTooFar', { days: chosenOffer.allowedStartDateDaysAhead }))
        return false
      }

      setDateError(null)
      return true
    },
    [chosenOffer?.allowedStartDateDaysAhead, t],
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  // Validate the start date when component mounts or when chosenOffer changes
  useEffect(() => {
    if (broadbandOrder?.startDate) {
      validateStartDate(new Date(broadbandOrder.startDate))
    } else {
      const today = new Date()
      const movingDateObj = movingDate ? new Date(movingDate) : null
      if (movingDateObj && movingDateObj >= today) {
        validateStartDate(movingDateObj)
      } else {
        validateStartDate(getDefaultDate())
      }
    }
  }, [chosenOffer?.allowedStartDateDaysAhead, broadbandOrder?.startDate, validateStartDate, movingDate, getDefaultDate])

  const isApartment = residenceType === RESIDENCE_TYPES.APARTMENT
  const router = chosenOffer?.additionalProducts?.find((product) => product.type === ROUTER)
  const tvBoxInOffer = chosenOffer?.additionalProducts?.find((product) => product.type === 'tv' || product.category === 'tv')
  const tvBox = tvBoxInOffer?.additionalProducts?.find((x) => x.type === 'tv_box')
  const isRouterOptional = router && router.optional
  const isTvBoxOptional = tvBox && tvBox.optional
  const routerMonthly = router && router.price?.monthlyAmounts && router.price?.monthlyAmounts[0]?.amount >= 0
  const routerPrice = router && router.price?.oneTimeAmount
  const routerFreightPrice = router && router.freightPrice?.oneTimeAmount
  const routerMonthlyPrice = routerMonthly && router?.price?.monthlyAmounts && `${router?.price?.monthlyAmounts[0]?.amount} ${t('common:monthlyPriceUnit')}`
  const tvBoxMonthly = tvBox && tvBox.price?.monthlyAmounts && tvBox.price?.monthlyAmounts[0]?.amount >= 0
  const tvBoxPrice = tvBox && tvBox.price?.oneTimeAmount
  const tvBoxMonthlyPrice = tvBoxMonthly && tvBox?.price?.monthlyAmounts && `${tvBox?.price?.monthlyAmounts[0]?.amount} ${t('common:monthlyPriceUnit')}`
  const offerType = chosenOffer && chosenOffer.type !== 'mobile' ? 'fixed' : 'mobile'

  const [routerOptional, setRouterOptional] = useState(broadbandOrder?.additionalProducts?.some((product) => product.id === 'equipment-router-1'))
  const [tvBoxOptional, setTvBoxOptional] = useState(false)
  const { theme } = useThemeContext()

  const flatNumbers = chosenOffer?.flatNrs
    ?.filter((flatNr) => flatNr !== HOUSE_FLAT_NUMBER)
    .map((flatNr) => ({
      value: flatNr,
      label: flatNr,
    }))

  const getAdditionalProductsList = (optionalRouter: boolean, optionalTvBox: boolean) => {
    if (optionalRouter) {
      return chosenOffer?.additionalProducts?.map((product) => ({ id: product.id, optional: product.optional }) as AdditionalProduct)
    }
    if (optionalTvBox) {
      return chosenOffer?.additionalProducts
        ?.filter((product) => !product.optional && product.type === 'tv')
        ?.map((product) => ({ id: product.id, optional: product.optional }) as AdditionalProduct)
    }
    return chosenOffer?.additionalProducts
      ?.filter((product) => !product.optional && product.type === ROUTER)
      ?.map((product) => ({ id: product.id, optional: product.optional }) as AdditionalProduct)
  }

  useEffect(() => {
    addOptionalProducts()
  }, [routerOptional, tvBoxOptional])

  const addOptionalProducts = () => {
    if (routerOptional || tvBoxOptional) {
      saveOrder({
        ...broadbandOrder,
        additionalProducts: getAdditionalProductsList(!!isRouterOptional, !!tvBoxOptional),
      })
    } else {
      saveOrder({
        ...broadbandOrder,
        additionalProducts: [],
      })
    }
  }

  const checkDisabledButton = () => {
    // Start date is required for all orders
    if (!broadbandOrder?.startDate?.length) {
      return true
    }

    // Check if there's a date validation error
    if (dateError) {
      return true
    }

    const REQUIRED_FLAT_NUMBER_LENGTH = 4

    // For residences with fiber or coaxial service, validate flat number requirements
    if (chosenOffer?.type === 'fiber' || chosenOffer?.type === 'coaxial') {
      // When flat numbers are available in a dropdown, one must be selected
      if (flatNumbers && flatNumbers?.length > 1 && !broadbandOrder?.selectedFlatNr?.length) {
        return true
      }
      if (flatNumbers && flatNumbers?.length > 1 && broadbandOrder?.selectedFlatNr && !flatNumbers.some((flat) => flat.value === broadbandOrder.selectedFlatNr)) {
        return true
      }

      // When manual flat number input is required, it must be 4 digits
      if (!flatNumbers && chosenOffer.requireFlatNr && (!broadbandOrder?.selectedFlatNr?.length || broadbandOrder?.selectedFlatNr?.length !== REQUIRED_FLAT_NUMBER_LENGTH)) {
        return true
      }
    }

    return false
  }

  return (
    <>
      <div className={wrapperVariants()}>
        <Flex style={{ width: isTabletPortraitOrGreater ? '100%' : '' }}>
          <div className={arrowWrapperVariants()} onClick={() => setCurrentStep && setCurrentStep(1)}>
            <ArrowLeft width={22} height={22} style={{ marginRight: 8 }} />
            {isTabletPortraitOrGreater && (
              <Text spacing="none" style={{ textDecoration: 'underline', marginLeft: 8 }}>
                {t('common:goBack')}
              </Text>
            )}
          </div>
          {!isTabletPortraitOrGreater && (
            <Text variant="largerBlack" spacing="none">
              {t('details')}
            </Text>
          )}
        </Flex>
        <div className={innerWrapperVariants()}>
          <div className={headerWrapperVariants()}>
            {isTabletPortraitOrGreater && <Text spacing="none">{t('details')}</Text>}
            <ImageKit src={`/Products/Broadband/${chosenOffer?.company}.svg`} width={120} height={36} />
            <div className={movingPriceBoxVariants({ isFixed: offerType === 'fixed' })}>
              <Text className={priceAndDiscountTextBoldVariants()} spacing="none">
                {offerType === 'fixed' ? t('fixedBroadband') : t('mobileBroadband')}
              </Text>{' '}
            </div>
          </div>

          <div className={mainWrapperVariants()}>
            <div style={{ margin: '16px 0px' }}>
              <Text variant="bodyBold" spacing="none">
                {t('STEPTHREE.chooseDate')}
              </Text>
              <div className={dateInputRowVariants()}>
                <div className={datePickerWrapperVariants({ hasError: !!dateError })}>
                  <DatePicker
                    placeholder={t('STEPTHREE.startDateLabel') ?? ''}
                    defaultValue={getDefaultDate()}
                    withoutDayInDate={true}
                    disabledToday={[new Date()]}
                    setDatePicked={(value) => {
                      const date = new Date(value.fullDate)
                      validateStartDate(date)
                      saveOrder({
                        ...broadbandOrder,
                        startDate: formatDate(date, 'yyyy-MM-dd'),
                      })
                    }}
                  />
                </div>
                {dateError && (
                  <div className={dateErrorInfoDesktopVariants()}>
                    <Flex direction="row" justifyContent="space-between" alignItems="center">
                      <div className={iconErrorWrapperVariants()}>
                        <InfoIcon width={24} height={24} />
                      </div>
                      <Text variant="bodySmall" spacing="less" style={{ fontSize: 11 }}>
                        {dateError}
                        <span className={linkTextErrorVariants()} onClick={() => setOpenDateInfoModal(!openDateInfoModal)}>
                          {' '}
                          {t('STEPTHREE.moreInfo')}
                        </span>
                      </Text>
                    </Flex>
                  </div>
                )}
              </div>
            </div>

            {chosenOffer?.requireFlatNr || (isApartment && flatNumbers && flatNumbers.length > 1) ? (
              <>
                <Text variant="bodyBold" spacing="none">
                  {t('STEPTHREE.aptNumber')}
                </Text>
                <div className={selectFlatWrapperVariants()}>
                  <Flex direction={isTabletPortraitOrGreater ? 'row' : 'column'} justifyContent="start" alignItems="center">
                    <div className={selectFlatInputWrapperVariants()}>
                      <SelectCustom
                        defaultValue={apartmentNumber ?? ''}
                        value={selectedFlatNr ?? ''}
                        items={flatNumbers || []}
                        label={t('common:apartmentNumber')}
                        placeholder="Välj ett nummer"
                        onValueChange={(e) => {
                          setSelectedFlatNr(e)
                          saveOrder({
                            ...broadbandOrder,
                            selectedFlatNr: e,
                          })
                        }}
                        isFb={theme === ThemeEnum.FASTIGHETSBYRAN ? true : false}
                      />
                    </div>
                    <div className={apartmentNumberInfoVariants()} style={{ width: isTabletPortraitOrGreater ? 380 : '100%' }}>
                      <Flex direction="row" justifyContent="start" alignItems="center">
                        <div>
                          <Text variant="body" spacing="none">
                            {t('STEPTHREE.chooseFromList')}
                          </Text>
                          <Text variant="linkSmall" spacing="none" className="!text-[var(--color-primary-main)]" onClick={() => setOpenFlatNumberModal(!openFlatNumberModal)}>
                            {t('STEPTHREE.moreInfo')}
                          </Text>
                        </div>
                      </Flex>
                    </div>
                  </Flex>
                </div>
              </>
            ) : chosenOffer?.type && ['coaxial', 'fiber'].includes(chosenOffer?.type) && (chosenOffer?.requireFlatNr || (flatNumbers && flatNumbers?.length > 1) || isApartment) ? (
              <>
                <Text variant="bodyBold" spacing="none">
                  {t('STEPTHREE.aptNumber')}
                </Text>
                <div className={apartmentInputRowVariants()} style={{ margin: '16px 0px' }}>
                  <div className={apartmentInputWrapperVariants()}>
                    <Input
                      type="numberWithValidation"
                      label={t('apartmentNumber')}
                      placeholder={t('apartmentNumber')}
                      defaultValue={broadbandOrder?.selectedFlatNr || apartmentNumber || ''}
                      onChange={(e) => {
                        saveOrder({
                          ...broadbandOrder,
                          selectedFlatNr: e.target.value,
                        })
                      }}
                      maxLength={4}
                      startAdornment={t('common:apartment')}
                    />
                  </div>
                  <div className={apartmentNumberInfoDesktopVariants()}>
                    <Flex direction="row" justifyContent="space-between" alignItems="center">
                      <div className={iconWrapperVariants()}>
                        <InfoIcon width={24} height={24} />
                      </div>
                      <Text variant="bodySmall" spacing="less">
                        {t('STEPTHREE.apartmenNumberInfo')}
                        <span className={linkTextVariants()} onClick={() => setOpenModal(!openModal)}>
                          {' '}
                          {t('STEPTHREE.apartmenNumberInfoLink')}
                        </span>
                      </Text>
                    </Flex>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
        {!!isRouterOptional && (
          <div className={innerWrapperVariants({ withLessMarginTop: true })}>
            <Flex className={inputWrapperVariants()}>
              <Text variant="largeBold" spacing="bottom">
                {t('STEPTHREE.additional')}
              </Text>
              <Flex className="mt-3" direction="row" justifyContent="start" alignItems="start" style={{ gap: 10 }}>
                <Checkbox checked={routerOptional} onChange={() => setRouterOptional(!routerOptional)} />
                <Flex direction="column" justifyContent="end" alignItems="start">
                  <Text variant="body" spacing="none" className="pb-2">
                    {t('STEPTHREE.add')} {router.name}
                  </Text>
                  <Flex direction="column">
                    <Flex direction="row" justifyContent="start" alignItems="center" style={{ marginLeft: 10 }}>
                      <Text variant="bodyBold" spacing="top" style={{ width: 100 }}>
                        {routerPrice ? t('STEPTHREE.price') : t('STEPTHREE.monthlyRental')}
                      </Text>
                      <Text variant="body" spacing="top">
                        {routerPrice ? `${routerPrice} ${t('common:priceUnit')}` : routerMonthlyPrice}
                      </Text>
                    </Flex>
                    {!!routerFreightPrice && (
                      <Flex direction="row" justifyContent="start" alignItems="center" style={{ marginLeft: 10 }}>
                        <Text variant="bodyBold" spacing="none" style={{ width: 100 }}>
                          {t('STEPTWO.freight')}
                          {':'}
                        </Text>
                        <Text variant="body" spacing="none">
                          {routerFreightPrice} {t('common:priceUnit')}
                        </Text>
                      </Flex>
                    )}
                    {!!router?.contractMonths && (
                      <Flex direction="row" justifyContent="start" alignItems="center" style={{ marginLeft: 10 }}>
                        <Text variant="bodyBold" spacing="top" style={{ width: 100 }}>
                          {t('STEPTHREE.bindingTime')}
                        </Text>
                        <Text variant="body" spacing="top">
                          {router?.contractMonths} {t('months').toLocaleLowerCase()}
                        </Text>
                      </Flex>
                    )}
                    {!!router?.startupPrice?.oneTimeAmount && (
                      <Flex direction="row" justifyContent="start" alignItems="center" style={{ marginLeft: 10 }}>
                        <Text variant="bodyBold" spacing="top" style={{ width: 100 }}>
                          {t('STEPTWO.freight')}
                        </Text>
                        <Text variant="body" spacing="top">
                          {router?.startupPrice?.oneTimeAmount} {t('STEPTHREE.price')}
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </div>
        )}
        {isTvBoxOptional && (
          <div className={innerWrapperVariants({ withLessMarginTop: true })}>
            <Flex className={inputWrapperVariants()}>
              <Text variant="largeBold" spacing="bottom">
                {t('STEPTHREE.additional')}
              </Text>
              <Flex direction="row" justifyContent="start" alignItems="start" style={{ gap: 10 }}>
                <Checkbox checked={tvBoxOptional} onChange={() => setTvBoxOptional(!tvBoxOptional)} style={{ marginTop: 4 }} />
                <Flex direction="column" justifyContent="end" alignItems="start">
                  <Text variant="body" spacing="less" style={{ marginBottom: 0 }}>
                    {t('STEPTHREE.add')} {tvBox.name}
                  </Text>
                  <Flex direction="column">
                    <Flex direction="row" justifyContent="start" alignItems="center" style={{ marginLeft: 10 }}>
                      <Text variant="bodyBold" spacing="top">
                        {tvBoxPrice ? t('STEPTHREE.price') : t('STEPTHREE.monthlyRental')}
                      </Text>
                      <Text variant="body" spacing="top" style={{ marginLeft: 24 }}>
                        {tvBoxPrice ? `${tvBoxPrice} ${t('common:priceUnit')}` : tvBoxMonthlyPrice}
                      </Text>
                    </Flex>
                    {tvBox?.contractMonths && (
                      <Flex direction="row" justifyContent="start" alignItems="center" style={{ marginLeft: 10 }}>
                        <Text variant="bodyBold" spacing="top">
                          {t('STEPTHREE.bindingTime')}
                        </Text>
                        <Text variant="body" spacing="top" style={{ marginLeft: 24 }}>
                          {tvBox?.contractMonths} {t('months').toLocaleLowerCase()}
                        </Text>
                      </Flex>
                    )}
                    {!!tvBox?.startupPrice?.oneTimeAmount && (
                      <Flex direction="row" justifyContent="start" alignItems="center" style={{ marginLeft: 10 }}>
                        <Text variant="bodyBold" spacing="top">
                          {t('STEPTWO.freight')}
                        </Text>
                        <Text variant="body" spacing="top" style={{ marginLeft: 24 }}>
                          {tvBox?.startupPrice?.oneTimeAmount} {t('STEPTHREE.price')}
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </div>
        )}
        <Flex className={buttonsWrapperVariants()} alignItems="center">
          <div className={largeButtonWrapperVariants()}>
            <Button
              iconRight={<ArrowForward color="currentColor" />}
              text={t('common:continue')}
              disabled={checkDisabledButton()}
              withFullWidth={!isTabletPortraitOrGreater}
              padding="10px 104px"
              onClick={() => {
                setCurrentStep && setCurrentStep(3)
              }}
            />
          </div>
        </Flex>
      </div>

      <Modal open={openFlatNumberModal}>
        <ModalContent setShowModal={setOpenFlatNumberModal}>
          <div className={customModalWrapperVariants()}>
            <ModalTitle>{t('STEPTHREE.modalFlatNrTitle')}</ModalTitle>
            <Close width={14} height={14} onClick={() => setOpenFlatNumberModal(false)} />
          </div>
          <Text variant="body" spacing="top" style={{ color: 'var(--color-text-main)', lineHeight: '24px' }}>
            {t('STEPTHREE.modalFlatNrInfo')}
          </Text>
        </ModalContent>
      </Modal>

      <ApartmentNumberInfoModal showModal={openModal} setShowModal={setOpenModal} />

      <Modal open={openDateInfoModal}>
        <ModalContent setShowModal={setOpenDateInfoModal}>
          <div className={customModalWrapperVariants()}>
            <ModalTitle>{t('STEPTHREE.dateRestrictionTitle')}</ModalTitle>
            <Close width={14} height={14} onClick={() => setOpenDateInfoModal(false)} />
          </div>
          <div className={dateRestrictionModalContentVariants()}>
            <div className={dateRestrictionIconWrapperVariants()}>
              <InfoIcon width={32} height={32} />
            </div>
            <div className={dateRestrictionTextContentVariants()}>
              <Text variant="body" spacing="none" style={{ color: 'var(--color-text-main)', lineHeight: '24px' }}>
                {t('STEPTHREE.dateRestrictionInfo', { days: chosenOffer?.allowedStartDateDaysAhead })}
              </Text>
              <Text variant="body" spacing="none" style={{ color: 'var(--color-text-main)', lineHeight: '24px', marginTop: 16 }}>
                {t('STEPTHREE.dateRestrictionAlternative')}
              </Text>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Step2Details
