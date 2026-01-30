import React, { ReactElement, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useBroadbandProvider } from '@/common/context/broadband/broadbandProvider.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { IMAGEKIT_IMAGES } from '@/common/enums/ImageKitImageEnum'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import useResponsive from '@/common/hooks/useResponsive'
import Checkbox from '@/components/atoms/Checkbox'
import Flex from '@/components/atoms/Flex'
import H3 from '@/components/atoms/H3'
import Spinner from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import { Modal, ModalContent } from '@/components/molecules/Modal'
import Select from '@/components/molecules/Select'
import SelectCustom from '@/components/molecules/SelectCustom'
import ArrowUpDown from '@/public/images/ArrowUpDown.svg'
import CaretDownBig from '@/public/images/CaretDown_big.svg'
import CaretUpBig from '@/public/images/CaretUp_big.svg'
import Close from '@/public/images/Close.svg'
import WifiHighNew from '@/public/images/WifiHigh_new.svg'
import BroadbandOfferCard from './BroadbandOffer/BroadbandOfferCard'
import BroadbandErrorPage from './Error/Error'
import DiscountDealCard from './GroupDeal/DiscountDealCard'
import GroupDealCard from './GroupDeal/GroupDealCard'
import {
  serviceWrapperVariants,
  step1ProvidersWrapperVariants,
  bottomSectionTitleWrapperVariants,
  mainSectionWrapperVariants,
  noProvidersWrapperVariants,
  sortByFilterVariants,
  customModalWrapperVariants,
  modalTextVariants,
  filterButtonVariants,
  loadingCardVariants,
} from './Step1ServicesAndPrices.variants'

export interface Step1ProvidersProps {
  setCurrentStep: (step: number) => void
  popupText: ReactElement
}

const Step1ServicesAndPrices = ({ setCurrentStep, popupText }: Step1ProvidersProps) => {
  const {
    offers,
    filteringBroadBandOptions,
    updateFilterOptions,
    fetchBredbandsvalTerms,
    fetchTvChannels,
    fetchStreamingServices,
    progress,
    responseStatus,
    groupDeals,
    hasFetchedFixedOffers,
    externalGroupDealProvider,
  } = useBroadbandProvider()

  const { theme, iconSet } = useThemeContext()
  const { t } = useTranslation(['broadband', 'common', 'error'])
  const { user } = useUserContext()
  const [isLoading, setIsLoading] = useState(true)
  const { isTabletPortraitOrGreater } = useResponsive()
  const [openModal, setOpenModal] = useState(false)
  const [packageType, setPackageType] = useState('all')
  const [showFilterOptions, setShowFilterOptions] = useState(false)

  const hasFixedTypes = filteringBroadBandOptions.types?.some((type) => ['dsl', 'coaxial', 'fiber'].includes(type)) || false
  const hasMobileType = filteringBroadBandOptions.types?.includes('mobile') || false
  const hasNoBothOffers = offers.length === 0 && responseStatus !== 'failed' && !isLoading && progress === 100 && hasFixedTypes && hasMobileType
  const hasNoFixedOffers = hasFetchedFixedOffers && offers.length === 0 && responseStatus !== 'failed' && !isLoading && progress === 100 && hasFixedTypes && !hasMobileType
  const hasNoMobileOffers = offers.length === 0 && responseStatus !== 'failed' && !isLoading && progress === 100 && !hasFixedTypes && hasMobileType
  const noTypesSelected = filteringBroadBandOptions.types?.length === 0 && offers.length === 0 && responseStatus !== 'failed' && !isLoading && progress === 100
  const isGeneralError = responseStatus === 'failed' && !isLoading && progress === 100
  const [shouldDisplayStayPatienceText, setShouldDisplayStayPatienceText] = useState(false)

  const updatePackageType = (value: string) => {
    switch (value) {
      case 'broadband':
        updateFilterOptions({ ...filteringBroadBandOptions, selectedPackages: { router: true } })
        break
      case 'broadbandAndTv':
        updateFilterOptions({ ...filteringBroadBandOptions, selectedPackages: { router: true, tv: true } })
        break
      case 'all':
        updateFilterOptions({ ...filteringBroadBandOptions, selectedPackages: {} })
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (progress === 100) {
      setIsLoading(false)
      setShouldDisplayStayPatienceText(false)
    }
  }, [progress])

  useEffect(() => {
    fetchTvChannels()
    fetchStreamingServices()
    fetchBredbandsvalTerms()
  }, [])

  useEffect(() => {
    if (isLoading || progress !== 100) {
      setTimeout(() => {
        setShouldDisplayStayPatienceText(true)
      }, 20000)
    }
  }, [isLoading, progress])

  if (isGeneralError || noTypesSelected || hasNoBothOffers || hasNoMobileOffers || (hasNoFixedOffers && !externalGroupDealProvider)) {
    return <BroadbandErrorPage noTypesSelected={noTypesSelected} hasNoFixedOffers={hasNoFixedOffers} hasNoMobileOffers={hasNoMobileOffers} hasNoBothOffers={hasNoBothOffers} />
  }

  const modal = () => {
    return (
      <>
        <Image onClick={() => setOpenModal(!openModal)} src={iconSet.INFO_ICON} alt="question icon" width={16} height={16} />
        <Modal open={openModal}>
          <ModalContent setShowModal={setOpenModal}>
            <div className={customModalWrapperVariants()}>
              <H3>{t('STEPTWO.modalSpeedTitle')}</H3>
              <Close width={14} height={14} onClick={() => setOpenModal(false)} />
            </div>
            <Flex direction="row" justifyContent="space-between" alignItems="center">
              <div className={modalTextVariants()} style={{ marginRight: 16 }}>
                <Text>{t('STEPTWO.modalSpeedDescription')}</Text>
              </div>
              {isTabletPortraitOrGreater && <Image src={IMAGEKIT_IMAGES.BROADBAND_SPEED} alt="hastighetsmätare" width={130} height={103} />}
            </Flex>
          </ModalContent>
        </Modal>
      </>
    )
  }

  if (!user?.currentMove?.toAddress?.zip?.length) {
    return (
      <div className={step1ProvidersWrapperVariants()} data-testid="step-1-providers-container">
        <Flex className={noProvidersWrapperVariants()} direction="column" justifyContent="center" alignItems="center">
          <WifiHighNew />
          <Text style={{ fontSize: 'var(--fs-fontSizes-6)', color: 'var(--fs-colors-secondaryDark)', textAlign: 'center' }}>{t('enterAddress')}</Text>
        </Flex>
      </div>
    )
  }

  return (
    <div className={step1ProvidersWrapperVariants()} data-testid="step-1-providers-container">
      {isLoading || progress !== 100 ? (
        <div className={loadingCardVariants()}>
          <Flex direction="column" justifyContent="center" alignItems="center" style={{ position: 'relative' }}>
            <H3>{t('loadingText')}</H3>
            {shouldDisplayStayPatienceText && <Text spacing="bottom">{t('stayPatient')}</Text>}
            <div>
              <Spinner scale={3} color="green" bolder percentage={`${progress}%`} />
            </div>
          </Flex>
        </div>
      ) : (
        <div className={mainSectionWrapperVariants()}>
          <div className={serviceWrapperVariants()}>
            <div className={bottomSectionTitleWrapperVariants()}>
              <Flex direction="column" style={{ width: 'fit-content', minWidth: isTabletPortraitOrGreater ? 311 : 'fit-content' }}>
                <Flex className={filterButtonVariants()} onClick={() => setShowFilterOptions(!showFilterOptions)} alignItems="center">
                  <Text spacing="none" variant="extraLargeBold">
                    {t('filter')}
                  </Text>
                  {showFilterOptions ? <CaretUpBig width={24} style={{ marginLeft: 10 }} /> : <CaretDownBig width={24} style={{ marginLeft: 10 }} />}
                </Flex>
              </Flex>

              <div className={sortByFilterVariants()}>
                <Select
                  defaultValue={filteringBroadBandOptions.sortBy}
                  value={filteringBroadBandOptions.sortBy}
                  withBiggerFont
                  onValueChange={(e) => {
                    updateFilterOptions({ ...filteringBroadBandOptions, sortBy: e })
                  }}
                  items={[
                    {
                      value: 'price',
                      label: t('STEPTWO.lowestPrice'),
                    },
                    {
                      value: 'downSpeed',
                      label: t('STEPTWO.downSpeed'),
                    },
                    {
                      value: 'provider',
                      label: t('STEPTWO.provider'),
                    },
                    {
                      value: 'dataLimit',
                      label: t('STEPTWO.dataLimit'),
                    },
                  ]}
                  noBorder
                  filter
                  icon={<ArrowUpDown className="stroke-[var(--color-text-main)]" />}
                />
              </div>
            </div>
            {showFilterOptions && (
              <Flex direction="column" style={{ marginTop: '-10px', marginRight: 'auto' }}>
                <div>
                  <SelectCustom
                    defaultValue="all"
                    value={filteringBroadBandOptions?.speed?.toString() === '0' ? '0' : filteringBroadBandOptions?.speed?.toString()}
                    items={[
                      {
                        value: '0',
                        label: t('STEPTWO.all'),
                      },
                      {
                        value: '50',
                        label: `50 ${t('STEPTWO.speedUnit')}`,
                      },
                      {
                        value: '100',
                        label: `100 ${t('STEPTWO.speedUnit')}`,
                      },
                      {
                        value: '250',
                        label: `250 ${t('STEPTWO.speedUnit')}`,
                      },
                      {
                        value: '500',
                        label: `500 ${t('STEPTWO.speedUnit')}`,
                      },
                    ]}
                    label={t('STEPTWO.filterSpeedLabel')}
                    labelExtraElement={modal()}
                    onValueChange={(e) => {
                      updateFilterOptions({ ...filteringBroadBandOptions, speed: Number(e) })
                    }}
                    isFb={theme === ThemeEnum.FASTIGHETSBYRAN ? true : false}
                  />
                </div>
                <div style={{ marginTop: 16 }}>
                  <SelectCustom
                    defaultValue="all"
                    value={packageType}
                    items={[
                      {
                        value: 'all',
                        label: t('STEPTWO.all'),
                      },
                      {
                        value: 'broadband',
                        label: t('broadband'),
                      },
                      {
                        value: 'broadbandAndTv',
                        label: t('broadbandAndTv'),
                      },
                    ]}
                    label={t('STEPTWO.filterPackageLabel')}
                    onValueChange={(e) => {
                      updatePackageType(e)
                      setPackageType(e)
                    }}
                    isFb={theme === ThemeEnum.FASTIGHETSBYRAN ? true : false}
                  />
                </div>
                <Flex className="mt-2" direction="row" justifyContent="start" alignItems="center">
                  <Checkbox
                    checked={filteringBroadBandOptions.isRouter}
                    onChange={(event) => {
                      updateFilterOptions({ ...filteringBroadBandOptions, isRouter: event.target.checked })
                    }}
                  />
                  <Text style={{ marginLeft: '8px', fontSize: '15px', textAlign: 'left' }}>{t('STEPTWO.filterRouterLabel')}</Text>
                </Flex>
              </Flex>
            )}

            {groupDeals.length > 0 && (
              <>
                <Flex justifyContent="center" alignItems="center">
                  {groupDeals.length > 0 && <GroupDealCard groupDealComapanyLogo={groupDeals[0].company} />}
                </Flex>
                {!!offers?.length && <H3 style={{ margin: '16px 0px 0px 0px' }}>{t('STEPTWO.otherOffer')}</H3>}
              </>
            )}

            {!!externalGroupDealProvider && (
              <>
                <Flex justifyContent="center" alignItems="center">
                  <DiscountDealCard groupDealComapanyLogo={externalGroupDealProvider} />
                </Flex>
                {!!offers?.length && <H3 style={{ margin: '16px 0px 0px 0px' }}>{t('STEPTWO.otherOffer')}</H3>}
              </>
            )}

            {offers.map((offer, index) => {
              return <BroadbandOfferCard key={`${offer.id}${index}`} offer={offer} setCurrentStep={setCurrentStep} popupText={popupText} />
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Step1ServicesAndPrices
