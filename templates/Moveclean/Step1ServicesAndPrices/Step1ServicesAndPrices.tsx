import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import { SupplierDetail } from 'types/price'
import formatDate from '@/appComponents/format'
import { useMovecleanContext } from '@/common/context/movecleanProvider/moveclean.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { useUtilityContext } from '@/common/context/utility/UtilityProvider'
import { checkDateForHoliday } from '@/common/helpers/date'
import Flex from '@/components/atoms/Flex'
import Spinner from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import { ErrorPage } from '@/components/molecules/ErrorPage'
import TailoredMoveInPreparation from '@/components/organisms/TailoredMoveInPreparation'
import { ORDER_ERROR, PRICE_NOT_FOUND } from '@/constants/errorCodes'
import Broom from '@/public/images/Broom.svg'
import ServiceItem from '../Components/ServiceItem/ServiceItem'
import SevenDayError from '../Components/SevenDayError/SevenDayError'
import { isDateWithinSevenDays } from '../Components/TopSection/helpers'
import {
  serviceWrapperVariants,
  errorMessageFrameVariants,
  isLoadingContainerVariants,
  step1ProvidersWrapperVariants,
  bottomSectionTitleWrapperVariants,
  mainSectionWrapperVariants,
  noProvidersWrapperVariants,
} from './Step1ServicesAndPrices.variants'

export interface Step1ProvidersProps {
  setCurrentStep: (step: number) => void
  currentDatePicked: Date
  onResidenceSizeError: () => void
}

const Step1ServicesAndPrices = ({ setCurrentStep, currentDatePicked, onResidenceSizeError }: Step1ProvidersProps) => {
  const { error, isLoading, movecleanProviders, isLoadingInfoMissingFetch } = useMovecleanContext()
  const { theme } = useThemeContext()
  const { holidayDates } = useUtilityContext()
  const { t } = useTranslation(['moveclean', 'common', 'error'])
  const { user } = useUserContext()

  const dateIsWithinSevenDays = useMemo(() => isDateWithinSevenDays(currentDatePicked), [currentDatePicked])

  const getPrice = (item: SupplierDetail, date = new Date()) => {
    const selectedDateIsHoliday =
      Number(formatDate(date, 'e')) === 6 || Number(formatDate(date, 'e')) === 7 || checkDateForHoliday(formatDate(date, 'yyyy-MM-dd'), holidayDates || [])

    if (selectedDateIsHoliday) {
      const holidayMultiplier = (100 + (Number(item?.addons?.holiday) || 0)) / 100
      return Math.round((item?.prices?.fixed?.[0]?.price || 0) * holidayMultiplier)
    } else {
      return item?.prices?.fixed?.[0]?.price || 0
    }
  }

  const renderErrorPage = () => {
    return (
      <div className={clsx(errorMessageFrameVariants())}>
        <ErrorPage
          title={t('error:title_OrderError')}
          withTryAgainButton
          withRouterReload
          subTitleOne={t(`error:order_error_sub_title`)}
          subTitleTwo={t(`error:order_error_sub_title_two`)}
        />
      </div>
    )
  }

  if ((error && user?.currentMove?.fromAddress?.street && !isLoadingInfoMissingFetch) || error === PRICE_NOT_FOUND) {
    return (
      <>
        {error === ORDER_ERROR ? (
          renderErrorPage()
        ) : (
          <div className={clsx(errorMessageFrameVariants({ variant: theme }))}>
            <TailoredMoveInPreparation error={error} />
          </div>
        )}
      </>
    )
  }

  if (dateIsWithinSevenDays) {
    return <SevenDayError />
  }

  return (
    <div className={clsx(step1ProvidersWrapperVariants())} data-testid="step-1-providers-container">
      {isLoading || isLoadingInfoMissingFetch ? (
        <div className={clsx(isLoadingContainerVariants())}>
          <Spinner color="green" scale={2} />
        </div>
      ) : (
        <div className={clsx(mainSectionWrapperVariants())}>
          <div className={clsx(serviceWrapperVariants())}>
            {movecleanProviders?.length ? (
              <div className={clsx(bottomSectionTitleWrapperVariants())}>
                <Text spacing="none" variant="extraLargeBold">
                  {t('providerTitle', { city: user?.currentMove?.fromAddress?.city })}
                </Text>
              </div>
            ) : (
              <Flex className={clsx(noProvidersWrapperVariants())} direction="column" justifyContent="center" alignItems="center">
                <Broom />
                <Text style={{ fontSize: 'var(--fs-fontSizes-6)', color: 'var(--fs-colors-secondaryDark)', textAlign: 'center' }}>{t('enterAddress')}</Text>
              </Flex>
            )}
            {!!movecleanProviders?.length &&
              movecleanProviders.map((item) => (
                <ServiceItem
                  onResidenceSizeError={onResidenceSizeError}
                  key={item.name}
                  setCurrentStep={setCurrentStep}
                  price={getPrice(item, currentDatePicked).toFixed(0)}
                  item={item}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Step1ServicesAndPrices
