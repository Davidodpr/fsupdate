import { useState, useEffect, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'react-use'
import Image from 'next/image'
import { useBroadbandProvider } from '@/common/context/broadband/broadbandProvider.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import useResponsive from '@/common/hooks/useResponsive'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import Popup from '@/components/molecules/PopupNew'
import MapPin from '@/public/images/MapPin_filled_white.svg'
import MapPinLarge from '@/public/images/MapPin_large.svg'
import PencilSimple from '@/public/images/PencilSimple_small.svg'
import WifiHighNew from '@/public/images/WifiHigh_new.svg'
import { ToAddress } from '@/components/organisms/AddressForm'
import { UpdatedMoveValues } from '@/templates/Electricity/types'
import { BroadbandValues } from '../../types'
import {
  introSectionVariants,
  userDataSectionVariants,
  styledFlexVariants,
  styledHeaderVariants,
  styledIntroSectionTitleVariants,
  topSectionContentWrapperVariants,
  topSectionWrapperVariants,
  pencilWrapperVariants,
  textButtonWrapperVariants,
  buttonsWrapperVariants,
  questionMarkWrapperVariants,
} from './TopSection.variants'

interface TopSectionProps {
  hideChoiceAndAddress: boolean
  popupText: ReactElement
}

export const TopSection = (props: TopSectionProps) => {
  const { hideChoiceAndAddress, popupText } = props
  const { t } = useTranslation(['broadband', 'common'])
  const { fetchOffers, filteringBroadBandOptions, updateFilterOptions, setProgress } = useBroadbandProvider()
  const { theme, iconSet } = useThemeContext()
  const [openEdit, setOpenEdit] = useState(false)
  const { isTabletPortraitOrGreater } = useResponsive()
  const [showEditAddressSection, setShowEditAddressSection] = useState(true)

  const [isMobileBroadbandActive, setIsMobileBroadbandActive] = useState(filteringBroadBandOptions?.types?.includes('mobile'))
  const [isFixedBroadBandActive, setIsFixedBroadBandActive] = useState(
    filteringBroadBandOptions?.types?.includes('dsl') || filteringBroadBandOptions?.types?.includes('fiber') || filteringBroadBandOptions?.types?.includes('coaxial'),
  )
  const {
    user: { currentMove, hasFetchedData },
    updateCurrentToAddress,
  } = useUserContext()

  const [data, setData] = useState<BroadbandValues>({
    toAddress: { street: '', zip: '', city: '', apartmentNumber: null },
  })

  useEffect(() => {
    if (filteringBroadBandOptions?.types?.includes('mobile') && !isMobileBroadbandActive) {
      setIsMobileBroadbandActive(true)
    }
  }, [filteringBroadBandOptions])

  useEffect(() => {
    if (!isMobileBroadbandActive && !isFixedBroadBandActive) {
      updateFilterOptions({ ...filteringBroadBandOptions, types: [] })
    }
    if (isMobileBroadbandActive && isFixedBroadBandActive) {
      updateFilterOptions({ ...filteringBroadBandOptions, types: ['dsl', 'coaxial', 'fiber', 'mobile'] })
    }
    if (!isMobileBroadbandActive && isFixedBroadBandActive) {
      updateFilterOptions({ ...filteringBroadBandOptions, types: ['dsl', 'coaxial', 'fiber'] })
    }
    if (isMobileBroadbandActive && !isFixedBroadBandActive) {
      updateFilterOptions({ ...filteringBroadBandOptions, types: ['mobile'] })
    }
  }, [isFixedBroadBandActive, isMobileBroadbandActive])

  useEffect(() => {
    if (hasFetchedData) {
      setData({
        toAddress: {
          street: currentMove.toAddress?.street,
          zip: currentMove.toAddress?.zip,
          city: currentMove.toAddress?.city,
          apartmentNumber: currentMove.toAddress?.apartmentNumber?.toString()?.length ? currentMove.toAddress?.apartmentNumber : '',
        },
      })
      if (!!currentMove.toAddress?.street?.length) setShowEditAddressSection(false)
    }
  }, [hasFetchedData])

  useDebounce(
    async () => {
      if (data?.toAddress?.street?.length && data?.toAddress?.street !== currentMove?.toAddress?.street && !hideChoiceAndAddress) {
        setProgress(0)
        const response = await updateCurrentToAddress({
          ...data.toAddress,
          residenceSize: currentMove.residenceSize,
          residenceType: currentMove.residenceType,
          apartmentType: currentMove.apartmentType,
        })
        if (response && response.id) {
          setData({ toAddress: { ...response.toAddress, apartmentNumber: response?.toAddress?.apartmentNumber ?? '' } })
          if (!!response.toAddress?.street?.length) setShowEditAddressSection(false)
          setTimeout(() => {
            fetchOffers(filteringBroadBandOptions)
          }, 3000)
        } else {
          setProgress(100)
        }
      }
    },
    500,
    [data, currentMove?.toAddress?.street],
  )

  return (
    <div className={topSectionWrapperVariants()}>
      <Flex direction="column" justifyContent="space-between" alignItems={isTabletPortraitOrGreater ? 'start' : 'center'} style={{ maxWidth: '100%' }}>
        <h1 className={styledHeaderVariants({ isSecondaryFont: theme === ThemeEnum.FASTIGHETSBYRAN })}>{t('headerService')}</h1>
        <h2 className={styledIntroSectionTitleVariants()}>{t('topSectionSubTitle')}</h2>
        {!hideChoiceAndAddress && (
          <div className={topSectionContentWrapperVariants({ editIsClosed: openEdit || showEditAddressSection })}>
            <Flex direction="column" style={{ width: '100%' }}>
              <div
                className={introSectionVariants({
                  editIsClosed: !showEditAddressSection,
                  noEditIsOpen: !showEditAddressSection && !openEdit,
                })}
                style={{ marginBottom: (openEdit && !currentMove?.toAddress?.zip?.length) || !hasFetchedData ? 16 : 0 }}
              >
                {(showEditAddressSection || openEdit) && (
                  <Flex
                    className={styledFlexVariants({ isFromAddress: true })}
                    style={{ gap: isTabletPortraitOrGreater ? 8 : 12 }}
                    direction={isTabletPortraitOrGreater ? 'row' : 'column'}
                    justifyContent="start"
                    alignItems={isTabletPortraitOrGreater ? 'center' : 'start'}
                  >
                    {isTabletPortraitOrGreater ? (
                      <Flex alignItems="center" style={{ paddingBottom: 16, gap: 8 }}>
                        <MapPinLarge />
                        <Text spacing="none" className="!font-bold !text-xl">
                          {t('address')}
                        </Text>
                      </Flex>
                    ) : (
                      <Flex alignItems="center" style={{ gap: 8 }}>
                        <MapPinLarge />
                        <Text spacing="none" className="!font-bold !text-xl">
                          {t('address')}
                        </Text>
                      </Flex>
                    )}
                    <Flex
                      className="!text-[15px]"
                      style={{
                        width: isTabletPortraitOrGreater ? 325 : '100%',
                        marginLeft: 'auto',
                        maxWidth: '100%',
                        paddingBottom: !currentMove?.toAddress?.zip?.length ? 16 : 0,
                      }}
                    >
                      <ToAddress
                        moveData={data}
                        withoutPadding
                        setData={(moveData: UpdatedMoveValues) =>
                          setData({
                            toAddress: {
                              street: moveData.toAddress?.street ?? '',
                              zip: moveData.toAddress?.zip ?? '',
                              city: moveData.toAddress?.city ?? '',
                              apartmentNumber: data.toAddress?.apartmentNumber?.toString()?.length ? data.toAddress?.apartmentNumber : null,
                            },
                          })
                        }
                      />
                    </Flex>
                  </Flex>
                )}
              </div>

              {(!openEdit || !showEditAddressSection) && (
                <div className={introSectionVariants()} style={{ marginTop: openEdit || showEditAddressSection ? 16 : 0, paddingBottom: 16 }}>
                  <Flex
                    className={styledFlexVariants()}
                    style={{ gap: isTabletPortraitOrGreater ? 8 : 0, padding: isTabletPortraitOrGreater ? '0 16px 0 16px' : 0 }}
                    direction={isTabletPortraitOrGreater ? 'row' : 'column'}
                    justifyContent="space-between"
                    alignItems={isTabletPortraitOrGreater ? 'center' : 'center'}
                  >
                    <Flex alignItems="center" style={{ gap: 8 }}>
                      {isTabletPortraitOrGreater ? (
                        <>
                          <WifiHighNew />
                          <Text spacing="none" className="!font-bold !text-xl" style={{ textWrap: 'nowrap' }}>
                            {t('typeOfBroadband')}
                          </Text>
                          <Popup textMargin noUnderline text={popupText}>
                            <div className={questionMarkWrapperVariants()}>
                              <Image src={iconSet.INFO_ICON} alt="question icon" width={24} height={24} style={{ marginTop: 4 }} />
                            </div>
                          </Popup>
                        </>
                      ) : (
                        <Flex alignItems="center" style={{ gap: 8 }}>
                          <WifiHighNew />
                          <Text spacing="none" className="!font-bold !text-xl" style={{ textWrap: 'nowrap' }}>
                            {t('typeOfBroadband')}
                          </Text>
                          <Popup textMargin text={popupText} noUnderline>
                            <div className={questionMarkWrapperVariants()}>
                              <Image src={iconSet.INFO_ICON} alt="question icon" width={24} height={24} />
                            </div>
                          </Popup>
                        </Flex>
                      )}
                    </Flex>
                    <div className={buttonsWrapperVariants()}>
                      <div
                        className={textButtonWrapperVariants({
                          editAddressIsOpen: showEditAddressSection || openEdit,
                          selected: isFixedBroadBandActive,
                        })}
                        onClick={() => setIsFixedBroadBandActive(!isFixedBroadBandActive)}
                      >
                        <Text spacing="none">{t('fixedBroadband')}</Text>
                      </div>
                      <div
                        className={textButtonWrapperVariants({
                          editAddressIsOpen: showEditAddressSection || openEdit,
                          selected: isMobileBroadbandActive,
                        })}
                        onClick={() => setIsMobileBroadbandActive(!isMobileBroadbandActive)}
                      >
                        <Text spacing="none">{t('mobileBroadband')}</Text>
                      </div>
                    </div>
                  </Flex>
                </div>
              )}
            </Flex>
            {!openEdit && !showEditAddressSection && (
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
                <Text className="!text-[18px]" style={{ margin: '0px 0px 10px' }}>
                  {t('yourResidence')}
                </Text>
                <Flex style={{ gap: 8, marginRight: 40, marginBottom: 4, alignItems: 'center' }}>
                  <MapPin style={{ flexShrink: 0 }} />
                  <Text className="!text-[15px] truncate" spacing="none" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentMove.toAddress?.street}
                  </Text>
                </Flex>
              </div>
            )}
          </div>
        )}
      </Flex>
    </div>
  )
}

export default TopSection
