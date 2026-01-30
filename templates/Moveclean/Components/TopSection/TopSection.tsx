import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'react-use'
import { clsx } from 'clsx'
import { useMovecleanContext } from '@/common/context/movecleanProvider/moveclean.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { getDisabledDays } from '@/common/helpers/date'
import useResponsive from '@/common/hooks/useResponsive'
import Flex from '@/components/atoms/Flex'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import Popup from '@/components/molecules/PopupNew'
import DatePicker from '@/components/organisms/DatePicker'
import Area from '@/public/images/Area.svg'
import AreaSmall from '@/public/images/Area_small.svg'
import Caleandar from '@/public/images/Calendar_blue.svg'
import MapPin from '@/public/images/MapPin_filled_white.svg'
import MapPinLarge from '@/public/images/MapPin_large.svg'
import PencilSimple from '@/public/images/PencilSimple_small.svg'
import InfoIcon from '@/public/images/Question_green.svg'
import { FromAddress } from '@/components/organisms/AddressForm/FromAddress/FromAddress'
import { UpdatedMoveValues } from '../../types'
import {
  topSectionWrapperVariants,
  styledFlexVariants,
  popupWrapperVariants,
  pencilWrapperVariants,
  questionIconWrapperVariants,
  errorTextVariants,
  inputAndDateWrapperVariants,
  userDataHeaderVariants,
  userDataSectionVariants,
  dividerVariants,
  styledHeaderVariants,
  styledIntroSectionTitleVariants,
  introSectionVariants,
  topSectionContentWrapperVariants,
} from './TopSection.variants'

interface TopSectionProps {
  pickedDate: Date
  setPickedDate: (date: Date) => void
  residenceSizeError: string | null
  setResidenceSizeError: (error: string | null) => void
  isStepTwo: boolean
}

const TopSection = (props: TopSectionProps & { ref?: React.Ref<HTMLInputElement> }) => {
  const { pickedDate, setPickedDate, residenceSizeError, setResidenceSizeError, isStepTwo, ref } = props

  const { t } = useTranslation(['moveclean', 'common'])
  const { fetchData } = useMovecleanContext()
  const { theme } = useThemeContext()
  const [openEdit, setOpenEdit] = useState(false)
  const { isTabletPortraitOrGreater } = useResponsive()
  const [showInfoSections, setShowInfoSections] = useState({ address: false, area: false, date: true })
  const {
    user: { currentMove, hasFetchedData },
    updateCurrentFromAddress,
  } = useUserContext()

  const [data, setData] = useState<UpdatedMoveValues>({
    sqm: null,
    additionalSpace: null,
    toAddress: { street: '', zip: '', city: '' },
    fromAddress: { street: '', zip: '', city: '' },
  })

  useEffect(() => {
    if (hasFetchedData) {
      const showInfoSectionsCopy = showInfoSections
      setData({
        sqm: currentMove.fromResidenceSize,
        additionalSpace: currentMove?.fromAddress?.additionalSpace?.toString() ?? '',
        toAddress: {
          street: currentMove.toAddress?.street,
          zip: currentMove.toAddress?.zip,
          city: currentMove.toAddress?.city,
        },
        fromAddress: {
          street: currentMove.fromAddress?.street,
          zip: currentMove.fromAddress?.zip,
          city: currentMove.fromAddress?.city,
        },
      })
      if (!!currentMove.fromResidenceSize) showInfoSectionsCopy.area = true
      if (!!currentMove.fromAddress?.street?.length) showInfoSectionsCopy.address = true
      setShowInfoSections(showInfoSectionsCopy)
    }
  }, [
    hasFetchedData,
    currentMove.fromAddress?.additionalSpace,
    currentMove.fromAddress?.city,
    currentMove.fromAddress?.street,
    currentMove.fromAddress?.zip,
    currentMove.fromResidenceSize,
    currentMove.toAddress?.city,
    currentMove.toAddress?.street,
    currentMove.toAddress?.zip,
    showInfoSections,
  ])

  const [residenceSize, setResidenceSize] = useState<number | null>(currentMove?.fromResidenceSize)
  const [additionalSpace, setAdditionalSpace] = useState<number | null>(currentMove?.fromAddress?.additionalSpace ?? 0)

  useDebounce(
    async () => {
      if (residenceSize && currentMove?.fromResidenceSize !== residenceSize && !isStepTwo && !!data?.fromAddress?.street?.length) {
        const response = await updateCurrentFromAddress({ ...data.fromAddress }, residenceSize)
        if (response && response.id) {
          fetchData()
          if (residenceSizeError) setResidenceSizeError(null)
        }
      }
    },
    500,
    [residenceSize, currentMove?.fromResidenceSize],
  )

  useDebounce(
    async () => {
      if (data?.fromAddress?.street?.length && data?.fromAddress?.street !== currentMove?.fromAddress?.street && !isStepTwo && !!data?.fromAddress?.street?.length) {
        const response = await updateCurrentFromAddress({ ...data.fromAddress })
        if (response && response.id) {
          fetchData()
        }
      }
    },
    500,
    [data, currentMove?.fromAddress?.street],
  )

  useDebounce(
    async () => {
      if ((additionalSpace || additionalSpace === 0) && currentMove?.fromAddress?.additionalSpace !== additionalSpace && !isStepTwo && !!data?.fromAddress?.street?.length) {
        const response = await updateCurrentFromAddress({ ...data.fromAddress }, currentMove?.fromResidenceSize, additionalSpace)
        if (response && response.id) {
          fetchData()
          if (residenceSizeError) setResidenceSizeError(null)
        }
      }
    },
    500,
    [additionalSpace],
  )

  useMemo(() => {
    if (!!data?.fromAddress?.street?.length) fetchData()
  }, [pickedDate])

  return (
    <div className={clsx(topSectionWrapperVariants())}>
      <Flex direction="column" justifyContent="space-between" alignItems={isTabletPortraitOrGreater ? 'start' : 'center'} style={{ maxWidth: '100%' }}>
        <h1 className={clsx(styledHeaderVariants({ isSecondaryFont: theme === ThemeEnum.FASTIGHETSBYRAN }))}>{t('pageTitle')}</h1>
        <div className={clsx(styledIntroSectionTitleVariants())}>{t('topSectionSubTitle')}</div>
        {!isStepTwo && (
          <div className={clsx(topSectionContentWrapperVariants({ editIsClosed: openEdit || !showInfoSections.address }))}>
            <div className={clsx(introSectionVariants({ editIsClosed: openEdit || !showInfoSections.address }))}>
              {(!showInfoSections.address || openEdit) && (
                <Flex
                  className={clsx(styledFlexVariants({ isFromAddress: true }))}
                  style={{ gap: isTabletPortraitOrGreater ? 8 : 12 }}
                  direction={isTabletPortraitOrGreater ? 'row' : 'column'}
                  justifyContent="start"
                  alignItems={isTabletPortraitOrGreater ? 'center' : 'start'}
                >
                  {isTabletPortraitOrGreater ? (
                    <>
                      <MapPinLarge width={44} />
                      <Text spacing="none" variant="larger">
                        {t('address')}
                      </Text>
                    </>
                  ) : (
                    <Flex alignItems="center" style={{ gap: 8 }}>
                      <MapPinLarge width={44} />
                      <Text spacing="none" variant="larger">
                        {t('address')}
                      </Text>
                    </Flex>
                  )}
                  <Flex className="text-[15px]" style={{ width: 325, marginLeft: 'auto', maxWidth: '100%' }}>
                    <FromAddress moveData={data} setData={setData} withoutPadding withNoHeightOnAddress />
                  </Flex>
                </Flex>
              )}
              {(!showInfoSections.address || openEdit) && (
                <div
                  className={clsx(
                    dividerVariants({ noMarginTop: openEdit || !!currentMove?.fromAddress?.street?.length, lessMarginTop: !currentMove?.fromAddress?.street?.length }),
                  )}
                />
              )}
              {(!showInfoSections.area || openEdit) && (
                <Flex
                  className={clsx(styledFlexVariants())}
                  style={{ gap: isTabletPortraitOrGreater ? 8 : 12 }}
                  direction={isTabletPortraitOrGreater ? 'row' : 'column'}
                  justifyContent="start"
                  alignItems={isTabletPortraitOrGreater ? 'center' : 'start'}
                >
                  {isTabletPortraitOrGreater ? (
                    <>
                      <Area width={44} />
                      <Text spacing="none" variant="larger">
                        {t('topSectionCleaningArea')}
                      </Text>
                    </>
                  ) : (
                    <Flex alignItems="center" style={{ gap: 8 }}>
                      <Area width={44} />
                      <Text spacing="none" variant="larger">
                        {t('topSectionCleaningArea')}
                      </Text>
                    </Flex>
                  )}
                  <div className={clsx(inputAndDateWrapperVariants({ isFullWidth: true }))}>
                    {
                      <Input
                        defaultValue={residenceSize ?? undefined}
                        onChange={(e) => {
                          if (e?.currentTarget?.value) setResidenceSize(Number(e?.currentTarget?.value))
                        }}
                        label={t('common:INFOMISSING.fromResidenceSize')}
                        onWheel={(e) => e.currentTarget?.blur()}
                        type="number"
                        inputRef={ref}
                      />
                    }
                    <Input
                      endIcon={
                        <div className={clsx(questionIconWrapperVariants())}>
                          <Popup
                            withFluidWidth
                            noUnderline
                            showBackground={isTabletPortraitOrGreater}
                            text={<div className={clsx(popupWrapperVariants())}>{t('common:additionalSpacePopupText')}</div>}
                          >
                            <InfoIcon className="text-[#41b497]" />
                          </Popup>
                        </div>
                      }
                      defaultValue={currentMove?.fromAddress?.additionalSpace ?? ''}
                      onChange={(e) => {
                        if (e?.currentTarget?.value) setAdditionalSpace(Number(e?.currentTarget?.value) ?? 0)
                      }}
                      onWheel={(e) => e.currentTarget?.blur()}
                      type="number"
                      label={t('common:additionalSpace') ?? ''}
                    />
                    {residenceSizeError && <div className={clsx(errorTextVariants())}>{residenceSizeError}</div>}
                  </div>
                </Flex>
              )}
              {(!showInfoSections.area || openEdit) && <div className={clsx(dividerVariants())} />}
              <Flex
                className={clsx(styledFlexVariants())}
                style={{ gap: isTabletPortraitOrGreater ? 8 : 12 }}
                direction={isTabletPortraitOrGreater ? 'row' : 'column'}
                justifyContent="start"
                alignItems={isTabletPortraitOrGreater ? 'center' : 'start'}
              >
                {isTabletPortraitOrGreater ? (
                  <>
                    <Caleandar width={44} />
                    <Text spacing="none" variant="larger">
                      {t('topSectionCleaningDate')}
                    </Text>
                  </>
                ) : (
                  <Flex alignItems="center" style={{ gap: 8 }}>
                    <Caleandar width={44} />
                    <Text spacing="none" variant="larger">
                      {t('topSectionCleaningDate')}
                    </Text>
                  </Flex>
                )}
                <div className={clsx(inputAndDateWrapperVariants({ isFullWidth: true }))}>
                  <DatePicker
                    defaultValue={pickedDate ? new Date(pickedDate) : new Date()}
                    parentSelectedDay={pickedDate}
                    parentDefaultMonth={pickedDate ? new Date(pickedDate) : new Date()}
                    setDatePicked={(date: DatePickerDates) => {
                      setPickedDate(new Date(date.fullDate))
                    }}
                    placeholder={t('common:chooseDate')}
                    withoutDayInDate
                    disablePastDates
                    disabledToday={getDisabledDays(true)}
                    noSpacing
                    positionBottom
                    infoContent={<div className={clsx(popupWrapperVariants())}>{t('cleanignDatePopupText')}</div>}
                  />
                </div>
              </Flex>
            </div>
            {!openEdit && showInfoSections.address && (
              <div className={clsx(userDataSectionVariants())}>
                <div className={clsx(pencilWrapperVariants())} data-testid="edit-residence" onClick={() => setOpenEdit(!openEdit)}>
                  <PencilSimple />
                </div>
                <div className={clsx(userDataHeaderVariants())}>{t('yourResidence')}</div>
                <Flex style={{ gap: 8, marginRight: 40, marginBottom: 4, alignItems: 'center' }}>
                  <MapPin style={{ flexShrink: 0 }} />
                  <Text className="!text-[15px] truncate" spacing="none" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentMove.fromAddress?.street}
                  </Text>
                </Flex>
                {showInfoSections.area && (
                  <Flex style={{ gap: 8, marginRight: 50 }}>
                    <AreaSmall />
                    <Text className="!text-[15px]" spacing="none">
                      {currentMove?.fromResidenceSize ?? 0 + Number(currentMove?.fromAddress?.additionalSpace ?? 0)} {t('common:areaUnit')}
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
