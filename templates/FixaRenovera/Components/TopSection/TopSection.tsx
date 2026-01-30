import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'react-use'
import { useUserContext } from '@/common/context/user/UserProvider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import useResponsive from '@/common/hooks/useResponsive'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import Input from '@/components/atoms/Input'
import MapPin from '@/public/images/MapPin_filled_white.svg'
import MapPinLarge from '@/public/images/MapPin_large.svg'
import PencilSimple from '@/public/images/PencilSimple_small.svg'
import Area from '@/public/images/Area.svg'
import AreaSmall from '@/public/images/Area_small.svg'
import HouseLine from '@/public/images/HouseLine.svg'
import HouseLineSmall from '@/public/images/HouseLine_small.svg'
import { ToAddress } from '@/components/organisms/AddressForm'
import { APARTMENT, TOWNHOUSE, HOUSE } from '@/constants/residenceTypes'
import {
  topSectionWrapperVariants,
  styledFlexVariants,
  pencilWrapperVariants,
  userDataSectionVariants,
  styledHeaderVariants,
  styledIntroSectionTitleVariants,
  introSectionVariants,
  topSectionContentWrapperVariants,
  dividerVariants,
  inputAndDateWrapperVariants,
  textButtonWrapperVariants,
  buttonsWrapperVariants,
  userDataHeaderVariants,
  errorTextVariants,
  subtitleAndContentWrapperVariants,
} from './TopSection.variants'

interface MoveData {
  toAddress: {
    street: string
    zip: string
    city: string
    apartmentNumber?: string | null
    residenceSize?: number | null
    residenceType?: string | null
    apartmentType?: string | null
  }
}

export const TopSection = () => {
  const { t } = useTranslation(['fixaRenoveraPage', 'common'])
  const { theme } = useThemeContext()
  const { isTabletPortraitOrGreater } = useResponsive()
  const [openEdit, setOpenEdit] = useState(false)
  const [showInfoSections, setShowInfoSections] = useState({ address: false, area: false, residenceType: false })
  const [residenceSizeError, setResidenceSizeError] = useState<string | null>(null)

  const {
    user: { currentMove, hasFetchedData },
    updateCurrentToAddress,
  } = useUserContext()

  const [data, setData] = useState<MoveData>({
    toAddress: {
      street: '',
      zip: '',
      city: '',
      apartmentNumber: null,
      residenceSize: null,
      residenceType: null,
      apartmentType: null,
    },
  })

  const [selectedFromResidenceType, setSelectedFromResidenceType] = useState<string | null>(currentMove?.residenceType)

  const checkShowInfoSection = (moveData: any) => {
    if (!!moveData.residenceSize) showInfoSections.area = true
    else showInfoSections.area = false

    if (!!moveData.toAddress?.street?.length) showInfoSections.address = true
    else showInfoSections.address = false

    if (!!moveData.residenceType) showInfoSections.residenceType = true
    else showInfoSections.residenceType = false

    setShowInfoSections(showInfoSections)
  }

  useEffect(() => {
    if (hasFetchedData) {
      setData({
        toAddress: {
          street: currentMove.toAddress?.street || '',
          zip: currentMove.toAddress?.zip || '',
          city: currentMove.toAddress?.city || '',
          apartmentNumber: currentMove.toAddress?.apartmentNumber?.toString()?.length ? currentMove.toAddress?.apartmentNumber : null,
          residenceSize: currentMove?.residenceSize?.toString()?.length ? Number(currentMove?.residenceSize) : null,
          residenceType: currentMove?.residenceType?.length ? currentMove?.residenceType : null,
          apartmentType: currentMove?.apartmentType?.length ? currentMove?.apartmentType : null,
        },
      })
      if (!!currentMove.residenceSize) showInfoSections.area = true
      if (!!currentMove.toAddress?.street?.length) showInfoSections.address = true
      if (!!currentMove.residenceType) showInfoSections.residenceType = true
      if (!showInfoSections?.residenceType && !showInfoSections?.area && !showInfoSections?.address) setOpenEdit(true)
      setShowInfoSections(showInfoSections)
    }
  }, [hasFetchedData, currentMove.toAddress, currentMove.residenceSize, currentMove.residenceType, currentMove.apartmentType])

  useDebounce(
    async () => {
      if (data?.toAddress?.residenceSize && currentMove?.residenceSize !== data?.toAddress?.residenceSize) {
        const response = await updateCurrentToAddress({
          street: data.toAddress.street,
          zip: data.toAddress.zip,
          city: data.toAddress.city,
          residenceSize: data.toAddress.residenceSize,
          residenceType: data.toAddress.residenceType || null,
          apartmentNumber: data.toAddress.apartmentNumber || null,
          apartmentType: data.toAddress.apartmentType || null,
        })
        if (response && response.id) {
          checkShowInfoSection(response)
          setData({
            toAddress: {
              ...response.toAddress,
              residenceSize: response.residenceSize,
              residenceType: response.residenceType,
              apartmentType: response.apartmentType,
            },
          })
          if (residenceSizeError) setResidenceSizeError(null)
        }
      }
    },
    500,
    [data?.toAddress?.residenceSize, currentMove?.residenceSize],
  )

  useDebounce(
    async () => {
      if (data?.toAddress?.street?.length && data?.toAddress?.street !== currentMove?.toAddress?.street) {
        const response = await updateCurrentToAddress({
          street: data.toAddress.street,
          zip: data.toAddress.zip,
          city: data.toAddress.city,
          residenceSize: data.toAddress.residenceSize || null,
          residenceType: data.toAddress.residenceType || null,
          apartmentNumber: data.toAddress.apartmentNumber || null,
          apartmentType: data.toAddress.apartmentType || null,
        })
        if (response && response.id) {
          setData({
            toAddress: {
              ...response.toAddress,
              residenceSize: response.residenceSize,
              residenceType: response.residenceType,
              apartmentType: response.apartmentType,
            },
          })
          checkShowInfoSection(response)
        }
      }
    },
    500,
    [data, currentMove?.toAddress?.street],
  )

  useDebounce(
    async () => {
      if (selectedFromResidenceType && currentMove?.residenceType !== selectedFromResidenceType) {
        const response = await updateCurrentToAddress({
          street: currentMove.toAddress.street,
          city: currentMove.toAddress.city,
          zip: currentMove.toAddress.zip,
          residenceType: selectedFromResidenceType,
          apartmentNumber: currentMove.toAddress.apartmentNumber || null,
          apartmentType: currentMove.apartmentType || null,
          residenceSize: currentMove.residenceSize?.toString()?.length ? Number(currentMove.residenceSize) : null,
        })
        if (response && response.id) {
          setData({
            toAddress: {
              ...response.toAddress,
              residenceSize: response.residenceSize,
              residenceType: response.residenceType,
              apartmentType: response.apartmentType,
            },
          })
          checkShowInfoSection(response)
        }
      }
    },
    500,
    [selectedFromResidenceType],
  )

  return (
    <div className={topSectionWrapperVariants()}>
      <Flex direction="column" className="w-full md:min-w-[740px] md:max-w-[740px]" justifyContent="space-between" alignItems={isTabletPortraitOrGreater ? 'start' : 'center'}>
        <h1 className={styledHeaderVariants({ isSecondaryFont: theme === ThemeEnum.FASTIGHETSBYRAN })}>{t('SIMPLIFIED.header')}</h1>
        <div className={subtitleAndContentWrapperVariants()}>
          <Text className={styledIntroSectionTitleVariants()} spacing="none">
            {t('SIMPLIFIED.description')}
          </Text>
          {!openEdit && showInfoSections.address && (
            <div className={userDataSectionVariants()}>
              <div
                className={pencilWrapperVariants()}
                data-testid="edit-residence"
                onClick={() => {
                  setOpenEdit(!openEdit)
                }}
              >
                <PencilSimple />
              </div>
              <Text className={userDataHeaderVariants()}>{t('common:yourAddress')}</Text>
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
        <div className={topSectionContentWrapperVariants({ editIsClosed: openEdit || !showInfoSections.address })}>
          <Flex direction="column" style={{ width: '100%' }}>
            <div
              className={introSectionVariants({
                editIsClosed: openEdit || !showInfoSections.address,
                noEditIsOpen: !openEdit && showInfoSections.address && showInfoSections.area && showInfoSections.residenceType,
              })}
            >
              {/* Address Section */}
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
                        {t('common:address')}
                      </Text>
                    </>
                  ) : (
                    <Flex alignItems="center" style={{ gap: 8 }}>
                      <MapPinLarge />
                      <Text spacing="none" variant="larger">
                        {t('common:address')}
                      </Text>
                    </Flex>
                  )}
                  <Flex style={{ width: isTabletPortraitOrGreater ? 325 : '100%', marginLeft: 'auto', maxWidth: '100%' }}>
                    <ToAddress
                      moveData={data}
                      withoutPadding
                      setData={(moveData: any) =>
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
              {/* Area Size Section */}
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
                        {t('common:INFOMISSING.fromResidenceSize')}
                      </Text>
                    </>
                  ) : (
                    <Flex alignItems="center" style={{ gap: 8 }}>
                      <Area />
                      <Text spacing="none" variant="larger">
                        {t('common:INFOMISSING.fromResidenceSize')}
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
                      label={t('common:areaUnit')}
                      onWheel={(e) => e.currentTarget?.blur()}
                      type="number"
                    />
                    {residenceSizeError && <Text className={errorTextVariants()}>{residenceSizeError}</Text>}
                  </div>
                </Flex>
              )}
              {((!showInfoSections.residenceType && !showInfoSections.area) || openEdit) && <div className={dividerVariants()} />}
              {/* Residence Type Section */}
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
                        {t('common:INFOMISSING.fromResidenceType')}
                      </Text>
                    </>
                  ) : (
                    <Flex alignItems="center" style={{ gap: 8 }}>
                      <HouseLine />
                      <Text spacing="none" variant="larger">
                        {t('common:INFOMISSING.fromResidenceType')}
                      </Text>
                    </Flex>
                  )}
                  <div className={inputAndDateWrapperVariants({ isFullWidth: true })}>
                    <div className={buttonsWrapperVariants()}>
                      <div className={textButtonWrapperVariants({ selected: selectedFromResidenceType === APARTMENT })} onClick={() => setSelectedFromResidenceType(APARTMENT)}>
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
          </Flex>
        </div>
      </Flex>
    </div>
  )
}

export default TopSection
