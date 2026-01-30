import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'react-use'
import { Building02Icon, House03Icon } from 'hugeicons-react'
import getPublicFortumPrice, { sendPublicFortumPricePageVisit } from '@/common/api/publicFortumPrice'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Input from '@/components/atoms/Input'
import Slider from '@/components/atoms/Slider'
import Text from '@/components/atoms/Text'
import LanguageSelect from '@/components/molecules/LanguageSelect'
import { ExternalElectricityProviderType } from '@/pageTypes/electricity'
import ArrowDown from '@/public/images/Arrow-down-black.svg'
import ArrowUp from '@/public/images/Arrow-up-black.svg'
import ProviderDetails from '../Electricity/Step1ServicesAndPrices/ProviderDetails/ProviderDetails'
import {
  buttonWrapperVariants,
  headerVariants,
  pageWrapperVariants,
  residenceTypeWrapperVariants,
  showMoreSectionVariants,
  sizeWrapperVariants,
  textButtonWrapperVariants,
  popupHeaderVariants,
  styledHeaderVariants,
  styledInputVariants,
  styledTextVariants,
  buttonsWrapperVariants,
  consumptionWrapperVariants,
  topSectionWrapperVariants,
  showMoreTextVariants,
  sliderWrapperVariants,
  monthlyCostWillBeUpdatedTextVariants,
  languageSelectorWrapperVariants,
} from './ExternalElectricityPrice.variants'
import { APARTMENT, HOUSE } from '@/constants/residenceTypes'

const ExternalElectricityPrice = () => {
  const { t } = useTranslation(['electricity', 'common'])
  const { isTabletPortraitOrGreater } = useResponsive()
  const [zipCode, setZipCode] = useState<number | null>(null)
  const [currentPrices, setCurrentPrices] = useState<ExternalElectricityProviderType | null>(null)
  const [selectedFromResidenceType, setSelectedFromResidenceType] = useState<typeof APARTMENT | typeof HOUSE>(APARTMENT)
  const [currentSliderValue, setCurrentSliderValue] = useState<number>(60)
  const [stepTwo, setStepTwo] = useState<boolean>(false)
  const [showMore, setShowMore] = useState<boolean>(false)
  const [currentPageVisitId, setCurrentPageVisitId] = useState<string | null>(null)

  useEffect(() => {
    const sendInitialPageVisit = async () => {
      const response = await sendPublicFortumPricePageVisit(true)
      if (response) {
        setCurrentPageVisitId(response.id)
      }
    }
    if (!currentPageVisitId) {
      sendInitialPageVisit()
    }
  }, [])

  const getPrice = async () => {
    if (zipCode && selectedFromResidenceType && currentSliderValue) {
      const response = await getPublicFortumPrice(zipCode, selectedFromResidenceType, currentSliderValue)
      if (response) {
        setCurrentPrices(response)
      }
    }
  }

  useEffect(() => {
    if (stepTwo && !isTabletPortraitOrGreater) {
      setTimeout(
        () =>
          window.scrollTo({
            top: 1000,
            behavior: 'smooth',
          }),
        100,
      )
    }
  }, [stepTwo])

  useDebounce(
    () => {
      if (!selectedFromResidenceType && !currentSliderValue && !zipCode) return
      getPrice()
    },
    10,
    [selectedFromResidenceType, currentSliderValue, zipCode],
  )

  const numberWithSpaces = (number: string) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  const getPopupText = () => {
    return (
      <div>
        <Text>{t('calculationsPopupFirstText')}</Text>
        <Text className={popupHeaderVariants()}>{t('calculationsPopupFirstHeader')}</Text>
        <ul>
          <li>{t('calculationsPopupFirstListItem')}</li>
          <li>{t('calculationsPopupSecondListItem')}</li>
          <li>{t('calculationsPopupThirdListItem')}</li>
          <li>{t('calculationsPopupFourthListItem')}</li>
          <li>{t('calculationsPopupFifthListItem')}</li>
        </ul>
      </div>
    )
  }

  if (stepTwo && currentPrices?.consumption) {
    return (
      <div>
        <div className={topSectionWrapperVariants()}>
          <Flex
            justifyContent="center"
            alignItems={isTabletPortraitOrGreater ? 'end' : 'center'}
            style={{ gap: isTabletPortraitOrGreater ? 16 : 0 }}
            direction={isTabletPortraitOrGreater ? 'row' : 'column'}
          >
            <h1 className={styledHeaderVariants()}>{t('EXTERNAL.seeYourPrice')}</h1>
            <Text className={styledTextVariants()} spacing="none">
              {t('EXTERNAL.fromFortum')}
            </Text>
          </Flex>
          <Text variant="bodyLarge" style={{ color: 'var(--fs-colors-whiteMain)' }}>
            {t('EXTERNAL.calculatePriceText')}
          </Text>
          <div className={residenceTypeWrapperVariants()}>
            <div className={buttonsWrapperVariants()}>
              <div
                className={textButtonWrapperVariants({ selected: selectedFromResidenceType === APARTMENT })}
                onClick={() => {
                  setSelectedFromResidenceType(APARTMENT)
                }}
              >
                <Building02Icon size={42} color={selectedFromResidenceType === APARTMENT ? '#fff' : 'var(--fs-colors-secondaryLight)'} />
                {t('common:INFOMISSING.apartment')}
              </div>
              <div className={textButtonWrapperVariants({ selected: selectedFromResidenceType === HOUSE })} onClick={() => setSelectedFromResidenceType(HOUSE)}>
                <House03Icon size={42} color={selectedFromResidenceType === HOUSE ? '#fff' : 'var(--fs-colors-secondaryLight)'} />
                {t('EXTERNAL.house')}
              </div>
            </div>
          </div>
        </div>
        <div className={sizeWrapperVariants()}>
          <Text style={{ color: 'var(--fs-colors-secondaryDark)', margin: '0 0 32px' }} variant="providerDetails">
            {t('EXTERNAL.residenceSize')}
          </Text>
          <Flex style={{ width: '100%' }} justifyContent="space-between">
            <Text spacing="none" style={{ color: 'var(--fs-colors-primaryMain)' }} variant="largeBold">
              {t('EXTERNAL.residenceSqm')}
            </Text>
            <Text spacing="none" style={{ color: 'var(--fs-colors-primaryMain)' }} variant="largeBold">
              {currentSliderValue} {t('EXTERNAL.sqm')}
            </Text>
          </Flex>
          <div className={sliderWrapperVariants()}>
            <Slider min={20} max={250} step={1} defaultValue={[60]} showLabel={false} onValueChange={(e) => setCurrentSliderValue(e[0])} />
          </div>
          <Flex style={{ width: '100%', paddingTop: 12 }} justifyContent="space-between">
            <Text spacing="none" style={{ color: 'gray' }} variant="bodySmall">
              {t('EXTERNAL.twentySqm')}
            </Text>
            <Text spacing="none" style={{ color: 'gray' }} variant="bodySmall">
              {t('EXTERNAL.twohundredAndFiftySqm')}
            </Text>
          </Flex>
          <div className={consumptionWrapperVariants()}>
            <Flex direction="column" style={{ gap: 14 }}>
              <Text spacing="none" variant="mediumSemibold">
                {t('EXTERNAL.esstimatedUsage')}
              </Text>
              <Flex direction="column" style={{ gap: 6 }}>
                <Text variant="extraLargeBold" spacing="none" style={{ color: 'var(--fs-colors-secondaryLight)' }}>
                  {numberWithSpaces(currentPrices.consumption?.toString())}
                  {t('EXTERNAL.kilowattPerYear')}
                </Text>
                <Text spacing="none" variant="body" style={{ color: 'var(--fs-colors-secondaryLight)' }}>
                  {numberWithSpaces(Math.floor(Number(currentPrices.consumption / 12))?.toString())}
                  {t('EXTERNAL.kilowattPerMonth')}
                </Text>
              </Flex>
            </Flex>
            <Flex direction="column" style={{ gap: 14 }}>
              <Text spacing="none" variant="mediumSemibold">
                {t('EXTERNAL.monthlyCost')}
              </Text>
              <Flex direction="column" style={{ gap: 6 }}>
                <Text variant="extraLargeBold" spacing="none" style={{ color: 'var(--fs-colors-secondaryLight)' }}>
                  {numberWithSpaces(Math.round(Number(currentPrices.monthlyCostWithDiscount))?.toString())}
                  {t('EXTERNAL.sekPerMonth')}
                </Text>
                <Text spacing="none" variant="body" style={{ color: 'var(--fs-colors-secondaryLight)' }}>
                  {numberWithSpaces(Number(currentPrices.totalKwhPriceExcDiscount)?.toString())}
                  {t('EXTERNAL.pennyPerKilowatt')}
                </Text>
              </Flex>
            </Flex>
          </div>
        </div>
        <div className={showMoreSectionVariants()} onClick={() => setShowMore(!showMore)}>
          <Text className={showMoreTextVariants()} spacing="none">
            {t('EXTERNAL.showPriceSpecification')}
          </Text>
          {showMore ? <ArrowUp /> : <ArrowDown />}
        </div>
        {showMore && (
          <div className={sizeWrapperVariants({ isPriceSpecification: true })}>
            <ProviderDetails provider={currentPrices} popupText={getPopupText()} onlyPriceSpecfication customConsumptionValue={currentPrices?.consumption} />
          </div>
        )}
        <Text className={monthlyCostWillBeUpdatedTextVariants()}>{t('EXTERNAL.closingTestament')}</Text>
      </div>
    )
  }

  return (
    <div className={pageWrapperVariants()}>
      <div className={languageSelectorWrapperVariants()}>
        <LanguageSelect />
      </div>
      <h1 className={headerVariants()}>{t('EXTERNAL.whichZipCode')}</h1>
      <Flex direction="column" alignItems="start" className="gap-2 sm:flex-row sm:items-center">
        <Flex className="flex-grow w-full">
          <Input
            className={styledInputVariants()}
            type="numberWithValidation"
            maxLength={5}
            minLength={5}
            label={t('EXTERNAL.addZipCode')}
            onChange={(e) => {
              const trimmedString = e.target.value.replace(/[^\d\s]/g, '').replace('.', '')
              setZipCode(Number(trimmedString))
            }}
          />
        </Flex>
      </Flex>
      <div className={buttonWrapperVariants()}>
        <Button
          text={t('common:continue')}
          disabled={zipCode?.toString()?.length !== 5}
          onClick={() => {
            setStepTwo(true)
            if (zipCode && currentPageVisitId) sendPublicFortumPricePageVisit(false, zipCode, currentPageVisitId)
          }}
          padding="12px 64px !important"
        />
      </div>
    </div>
  )
}

export default ExternalElectricityPrice
