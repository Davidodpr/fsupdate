import { forwardRef, useState, useEffect, ReactElement } from 'react'
import { useDebounce } from 'react-use'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useElectricityProvider } from '@/common/context/electricity/electricityContext.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import useResponsive from '@/common/hooks/useResponsive'
import Flex from '@/components/atoms/Flex'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import Popup from '@/components/atoms/Popup'
import Area from '@/public/images/Area.svg'
import AreaSmall from '@/public/images/Area_small.svg'
import HouseLine from '@/public/images/HouseLine.svg'
import HouseLineSmall from '@/public/images/HouseLine_small.svg'
import LightningNew from '@/public/images/Lightning_new.svg'
import MapPin from '@/public/images/MapPin_filled_white.svg'
import MapPinLarge from '@/public/images/MapPin_large.svg'
import PencilSimple from '@/public/images/PencilSimple_small.svg'
import { ToAddress } from '@/components/organisms/AddressForm'
import { UpdatedMoveValues } from '@/templates/Electricity/types'
import { ElectricityValues } from '../../types'
import ConsumptionSelector from './ConsumptionSelector'
import {
  topSectionWrapperVariants,
  styledFlexVariants,
  textButtonWrapperVariants,
  buttonsWrapperVariants,
  questionMarkWrapperVariants,
  pencilWrapperVariants,
  errorTextVariants,
  inputAndDateWrapperVariants,
  userDataSectionVariants,
  dividerVariants,
  styledHeaderVariants,
  styledIntroSectionTitleVariants,
  userDataHeaderVariants,
  introSectionVariants,
  topSectionContentWrapperVariants,
} from './TopSection.variants'
import { APARTMENT, TOWNHOUSE, HOUSE, APARTMENT_TYPES } from '@/constants/residenceTypes'

interface TopSectionProps {
  residenceSizeError: string | null
  setResidenceSizeError: (error: string | null) => void
  isStepTwo: boolean
  popupText: ReactElement
}

const TopSection = (props: TopSectionProps & { inputRef: React.Ref<HTMLInputElement> }) => {
  const { residenceSizeError, setResidenceSizeError, isStepTwo, popupText, inputRef } = props
  const { t } = useTranslation(['electricity', 'common'])
  const { fetchProviders, getYearlyElectricityConsumption } = useElectricityProvider()
  const { theme, iconSet } = useThemeContext()
  const [openEdit, setOpenEdit] = useState(false)
  const { isTabletPortraitOrGreater } = useResponsive()
  const [showConsumpution, setShowConsumpution] = useState(false)
  const [showInfoSections, setShowInfoSections] = useState({ address: false, area: false, residenceType: false })
  const {
    user: { currentMove, hasFetchedData },
    updateCurrentToAddress,
  } = useUserContext()

  const [data, setData] = useState<ElectricityValues>({
    toAddress: { street: '', zip: '', city: '', residenceSize: null, residenceType: null, apartmentNumber: null, apartmentType: null },
  })

  const checkShowInfoSection = (moveData: any) => {
    const showInfoSectionsCopy = showInfoSections
    if (!!moveData.residenceSize) showInfoSectionsCopy.area = true
    else showInfoSectionsCopy.area = false

    if (!!moveData.toAddress?.street?.length) showInfoSectionsCopy.address = true
    else showInfoSectionsCopy.address = false

    if (!!moveData.residenceType) showInfoSectionsCopy.residenceType = true
    else showInfoSectionsCopy.residenceType = false
    setShowInfoSections(showInfoSectionsCopy)

    if (showInfoSectionsCopy?.residenceType && showInfoSectionsCopy?.area && showInfoSectionsCopy?.address) setShowConsumpution(true)
  }

  useEffect(() => {
    if (!!currentMove?.residenceSize && !!currentMove?.residenceType) {
      getYearlyElectricityConsumption(Number(currentMove?.residenceSize), currentMove?.residenceType)
    }
  }, [currentMove?.residenceSize, currentMove?.residenceType])

  useEffect(() => {
    if (hasFetchedData) {
      const showInfoSectionsCopy = showInfoSections
      setData({
        toAddress: {
          street: currentMove.toAddress?.street,
          zip: currentMove.toAddress?.zip,
          city: currentMove.toAddress?.city,
          residenceSize: currentMove?.residenceSize?.toString()?.length ? Number(currentMove?.residenceSize) : null,
          residenceType: currentMove?.residenceType?.length ? currentMove?.residenceType : null,
          apartmentNumber: currentMove.toAddress?.apartmentNumber?.toString()?.length ? currentMove.toAddress?.apartmentNumber : null,
          apartmentType: currentMove?.apartmentType?.length ? currentMove?.apartmentType : null,
        },
      })
      if (!!currentMove.residenceSize) showInfoSectionsCopy.area = true
      if (!!currentMove.toAddress?.street?.length) showInfoSectionsCopy.address = true
      if (!!currentMove.residenceType) showInfoSectionsCopy.residenceType = true
      if (!showInfoSectionsCopy?.residenceType && !showInfoSectionsCopy?.area && !showInfoSectionsCopy?.address) setOpenEdit(true)
      setShowInfoSections(showInfoSectionsCopy)
    }
  }, [
    hasFetchedData,
    currentMove?.apartmentType,
    currentMove.residenceSize,
    currentMove.residenceType,
    currentMove.toAddress?.apartmentNumber,
    currentMove.toAddress?.city,
    currentMove.toAddress?.street,
    currentMove.toAddress?.zip,
    getYearlyElectricityConsumption,
    showInfoSections,
  ])

  const [selectedFromResidenceType, setSelectedFromResidenceType] = useState<string | null>(currentMove?.residenceType)

  useDebounce(
    async () => {
      if (data?.toAddress?.residenceSize && currentMove?.residenceSize !== data?.toAddress?.residenceSize && !isStepTwo) {
        const response = await updateCurrentToAddress({ ...data.toAddress })
        if (response && response.id) {
          checkShowInfoSection(response)
          setData({ toAddress: { ...response.toAddress, residenceSize: response.residenceSize, residenceType: response.residenceType, apartmentType: response.apartmentType } })
          fetchProviders()
          getYearlyElectricityConsumption(Number(data?.toAddress?.residenceSize), data?.toAddress?.residenceType ?? '')
          if (residenceSizeError) setResidenceSizeError(null)
        }
      }
    },
    500,
    [data?.toAddress?.residenceSize, currentMove?.residenceSize],
  )

  useDebounce(
    async () => {
      if (data?.toAddress?.street?.length && data?.toAddress?.street !== currentMove?.toAddress?.street && !isStepTwo) {
        const response = await updateCurrentToAddress({ ...data.toAddress })
        if (response && response.id) {
          setData({ toAddress: { ...response.toAddress, residenceSize: response.residenceSize, residenceType: response.residenceType, apartmentType: response.apartmentType } })
          checkShowInfoSection(response)
          fetchProviders()
          getYearlyElectricityConsumption(Number(data?.toAddress?.residenceSize), data?.toAddress?.residenceType ?? '')
        }
      }
    },
    500,
    [data, currentMove?.toAddress?.street],
  )

  useDebounce(
    async () => {
      if (selectedFromResidenceType && currentMove?.residenceType !== selectedFromResidenceType && !isStepTwo) {
        const response = await updateCurrentToAddress({
          street: currentMove.toAddress.street,
          city: currentMove.toAddress.city,
          zip: currentMove.toAddress.zip,
          residenceType: selectedFromResidenceType,
          apartmentNumber: currentMove.toAddress.apartmentNumber || null,
          apartmentType: currentMove.apartmentType || APARTMENT_TYPES.OWNED,
          residenceSize: currentMove.residenceSize?.toString()?.length ? Number(currentMove.residenceSize) : null,
        })
        if (response && response.id) {
          setData({ toAddress: { ...response.toAddress, residenceSize: response.residenceSize, residenceType: response.residenceType, apartmentType: response.apartmentType } })
          checkShowInfoSection(response)
          getYearlyElectricityConsumption(Number(data?.toAddress?.residenceSize), selectedFromResidenceType ?? '')
          fetchProviders()
        }
      }
    },
    500,
    [selectedFromResidenceType],
  )

  return (
    <div className={topSectionWrapperVariants()}>
      <Flex direction="column" className="w-full md:min-w-[740px] md:max-w-[740px]" justifyContent="space-between" alignItems={isTabletPortraitOrGreater ? 'start' : 'center'}>
        <h1 className={styledHeaderVariants({ isSecondaryFont: theme === ThemeEnum.FASTIGHETSBYRAN })}>{t('pageTitle')}</h1>
        <Text className={styledIntroSectionTitleVariants()} spacing="none">
          {t('topSectionSubTitle')}
        </Text>
        {!isStepTwo && (
          <div className={topSectionContentWrapperVariants({ editIsClosed: openEdit || !showInfoSections.address })}>
            <Flex direction="column" style={{ width: '100%' }}>
              <div
                className={introSectionVariants({
                  editIsClosed: openEdit || !showInfoSections.address,
                  noEditIsOpen: !openEdit && showInfoSections.address && showInfoSections.area && showInfoSections.residenceType,
                })}
              >
                {(!showInfoSections.address || openEdit) && (
                  <Flex
                    className={styledFlexVariants({ isFromAddress: true })}
                    style={{ gap: isTabletPortraitOrGreater ? 8 : 12 }}
                    direction={isTabletPortraitOrGreater ? 'row' : 'column'}
                    justifyContent="start"
                    alignItems={isTabletPortraitOrGreater ? 'center' : 'start'}
                  >
                    {isTabletPortraitOrGreater ? (
                      <>
                        <MapPinLarge />
                        <Text spacing="none" variant="larger">
                          {t('address')}
                        </Text>
                      </>
                    ) : (
                      <Flex alignItems="center" style={{ gap: 8 }}>
                        <MapPinLarge />
                        <Text spacing="none" variant="larger">
                          {t('address')}
                        </Text>
                      </Flex>
                    )}
                    <Flex style={{ width: isTabletPortraitOrGreater ? 325 : '100%', marginLeft: 'auto', maxWidth: '100%' }}>
                      <ToAddress
                        moveData={data}
                        withoutPadding
                        setData={(moveData: UpdatedMoveValues) =>
                          setData({
                            toAddress: {
                              street: moveData.toAddress?.street ?? '',
                              zip: moveData.toAddress?.zip ?? '',
                              city: moveData.toAddress?.city ?? '',
                              residenceSize: data.toAddress?.residenceSize?.toString()?.length ? Number(data.toAddress?.residenceSize) : null,
                              residenceType: data.toAddress?.residenceType?.length ? data.toAddress?.residenceType : null,
                              apartmentNumber: data.toAddress?.apartmentNumber?.toString()?.length ? data.toAddress?.apartmentNumber : null,
                              apartmentType: data.toAddress?.apartmentType?.length ? data.toAddress?.apartmentType : null,
                            },
                          })
                        }
                      />
                    </Flex>
                  </Flex>
                )}
                {(!showInfoSections.address || openEdit) && (
                  <div
                    className={dividerVariants({ noMarginTop: openEdit || !!currentMove?.fromAddress?.street?.length, lessMarginTop: !currentMove?.fromAddress?.street?.length })}
                  />
                )}
                {(!showInfoSections.area || openEdit) && (
                  <Flex
                    className={styledFlexVariants()}
                    style={{ gap: isTabletPortraitOrGreater ? 8 : 12 }}
                    direction={isTabletPortraitOrGreater ? 'row' : 'column'}
                    justifyContent="start"
                    alignItems={isTabletPortraitOrGreater ? 'center' : 'start'}
                  >
                    {isTabletPortraitOrGreater ? (
                      <>
                        <Area />
                        <Text spacing="none" variant="larger">
                          {t('topSectionAreaSize')}
                        </Text>
                      </>
                    ) : (
                      <Flex alignItems="center" style={{ gap: 8 }}>
                        <Area />
                        <Text spacing="none" variant="larger">
                          {t('topSectionAreaSize')}
                        </Text>
                      </Flex>
                    )}
                    <div className={inputAndDateWrapperVariants({ isFullWidth: true })}>
                      <Input
                        defaultValue={data.toAddress.residenceSize ?? undefined}
                        onChange={(e) => {
                          if (e?.currentTarget?.value)
                            setData({
                              toAddress: {
                                street: data.toAddress?.street ?? '',
                                zip: data.toAddress?.zip ?? '',
                                city: data.toAddress?.city ?? '',
                                residenceSize: e?.currentTarget?.value?.toString()?.length ? Number(e?.currentTarget?.value) : null,
                                residenceType: data.toAddress?.residenceType?.length ? data.toAddress?.residenceType : null,
                                apartmentNumber: data.toAddress?.apartmentNumber?.toString()?.length ? data.toAddress?.apartmentNumber : null,
                                apartmentType: data.toAddress?.apartmentType?.length ? data.toAddress?.apartmentType : null,
                              },
                            })
                        }}
                        label={t('common:INFOMISSING.fromResidenceSize')}
                        onWheel={(e) => e.currentTarget?.blur()}
                        type="number"
                        inputRef={inputRef}
                      />

                      {residenceSizeError && <Text className={errorTextVariants()}>{residenceSizeError}</Text>}
                    </div>
                  </Flex>
                )}
                {((!showInfoSections.residenceType && !showInfoSections.area) || openEdit) && <div className={dividerVariants()} />}
                {(!showInfoSections.residenceType || openEdit) && (
                  <Flex
                    className={styledFlexVariants()}
                    style={{ gap: isTabletPortraitOrGreater ? 8 : 12 }}
                    direction={isTabletPortraitOrGreater ? 'row' : 'column'}
                    justifyContent="start"
                    alignItems={isTabletPortraitOrGreater ? 'center' : 'start'}
                  >
                    {isTabletPortraitOrGreater ? (
                      <>
                        <HouseLine />
                        <Text spacing="none" variant="larger">
                          {t('topSectionResidenceType')}
                        </Text>
                      </>
                    ) : (
                      <Flex alignItems="center" style={{ gap: 8 }}>
                        <HouseLine />
                        <Text spacing="none" variant="larger">
                          {t('topSectionResidenceType')}
                        </Text>
                      </Flex>
                    )}
                    <div className={inputAndDateWrapperVariants({ isFullWidth: true })}>
                      <div className={buttonsWrapperVariants()}>
                        <div
                          className={textButtonWrapperVariants({ selected: selectedFromResidenceType === APARTMENT })}
                          onClick={() => {
                            setSelectedFromResidenceType(APARTMENT)
                          }}
                        >
                          {t('common:INFOMISSING.apartment')}
                        </div>
                        <div className={textButtonWrapperVariants({ selected: selectedFromResidenceType === TOWNHOUSE })} onClick={() => setSelectedFromResidenceType(TOWNHOUSE)}>
                          {t('common:INFOMISSING.townhouse')}
                        </div>
                        <div className={textButtonWrapperVariants({ selected: selectedFromResidenceType === HOUSE })} onClick={() => setSelectedFromResidenceType(HOUSE)}>
                          {t('common:INFOMISSING.house')}
                        </div>
                      </div>
                    </div>
                  </Flex>
                )}
              </div>

              {((!openEdit && showInfoSections.address && showInfoSections.area && showInfoSections.residenceType) || showConsumpution) && (
                <div className={introSectionVariants()} style={{ marginTop: openEdit ? 16 : 0 }}>
                  <Flex
                    className={styledFlexVariants()}
                    style={{ gap: isTabletPortraitOrGreater ? 8 : 0, padding: isTabletPortraitOrGreater ? '8px 16px' : 0 }}
                    direction={isTabletPortraitOrGreater ? 'row' : 'column'}
                    justifyContent="space-between"
                    alignItems={isTabletPortraitOrGreater ? 'center' : 'center'}
                  >
                    <Flex alignItems="center" style={{ gap: 8 }}>
                      {isTabletPortraitOrGreater ? (
                        <>
                          <LightningNew />
                          <Text spacing="none" variant="larger" style={{ textWrap: 'nowrap' }}>
                            {t('calculatedConsumption')}
                          </Text>
                          <Popup textMargin text={popupText}>
                            <div className={questionMarkWrapperVariants()}>
                              <Image src={iconSet.INFO_ICON} alt="question icon" width={24} height={24} style={{ marginTop: 4 }} />
                            </div>
                          </Popup>
                        </>
                      ) : (
                        <Flex alignItems="center" style={{ gap: 8 }}>
                          <LightningNew />
                          <Text spacing="none" variant="larger" style={{ textWrap: 'nowrap' }}>
                            {t('calculatedConsumption')}
                          </Text>
                          <Popup textMargin text={popupText}>
                            <div className={questionMarkWrapperVariants()}>
                              <Image src={iconSet.INFO_ICON} alt="question icon" width={24} height={24} />
                            </div>
                          </Popup>
                        </Flex>
                      )}
                    </Flex>
                    <ConsumptionSelector withSolidUnderline={theme === ThemeEnum.FASTIGHETSBYRAN} withFastighetsbyranColors={theme === ThemeEnum.FASTIGHETSBYRAN} />
                  </Flex>
                </div>
              )}
            </Flex>
            {!openEdit && showInfoSections.address && (
              <div className={userDataSectionVariants()}>
                <div
                  className={pencilWrapperVariants()}
                  data-testid="edit-residence"
                  onClick={() => {
                    setOpenEdit(!openEdit)
                    if (showInfoSections.address && showInfoSections.area && showInfoSections.residenceType) setShowConsumpution(true)
                  }}
                >
                  <PencilSimple />
                </div>
                <Text className={userDataHeaderVariants()}>{t('yourResidence')}</Text>
                <Flex style={{ gap: 8, marginRight: 40, marginBottom: 4, alignItems: 'center' }}>
                  <MapPin style={{ flexShrink: 0 }} />
                  <Text className="!text-[15px] truncate" spacing="none" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentMove.toAddress?.street}
                  </Text>
                </Flex>
                {showInfoSections.area && (
                  <Flex style={{ gap: 8, marginRight: 50 }}>
                    <AreaSmall />
                    <Text className="!text-[15px]" spacing="none">
                      {currentMove?.residenceSize ?? 0} {t('common:areaUnit')}
                    </Text>
                  </Flex>
                )}
                {showInfoSections.residenceType && (
                  <Flex style={{ gap: 8, marginRight: 50, marginTop: 4 }}>
                    <HouseLineSmall />
                    <Text className="!text-[15px]" spacing="none">
                      {currentMove.residenceType === APARTMENT
                        ? t('common:INFOMISSING.apartment')
                        : currentMove.residenceType === TOWNHOUSE
                          ? t('common:INFOMISSING.townhouse')
                          : t('common:INFOMISSING.house')}
                    </Text>
                  </Flex>
                )}
              </div>
            )}
          </div>
        )}
      </Flex>
    </div>
  )
}

TopSection.displayName = 'TopSection'
export default TopSection
