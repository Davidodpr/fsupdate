import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import { useElectricityProvider } from '@/common/context/electricity/electricityContext.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import Spinner from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import { ErrorPage } from '@/components/molecules/ErrorPage'
import TailoredMoveInPreparation from '@/components/organisms/TailoredMoveInPreparation'
import { ORDER_ERROR, PRICE_NOT_FOUND } from '@/constants/errorCodes'
import { ElectricityProviderType } from '@/pageTypes/electricity'
import LightningNew from '@/public/images/Lightning_new.svg'
import ElectricityProviderCard from './ElectricityProviderCard/ElectricityProviderCard'
import {
  serviceWrapperVariants,
  errorMessageFrameVariants,
  step1ProvidersWrapperVariants,
  mainSectionWrapperVariants,
  noProvidersWrapperVariants,
  spinnerWrapperVariants,
} from './Step1ServicesAndPrices.variants'
import { RESIDENCE_TYPES } from '@/constants/residenceTypes'

export interface Step1ProvidersProps {
  setCurrentStep: (step: number) => void
  popupText: ReactElement
}

const Step1ServicesAndPrices = ({ setCurrentStep, popupText }: Step1ProvidersProps) => {
  const { electricityProviders, errorMessageKey, loadingProviders } = useElectricityProvider()
  const { theme } = useThemeContext()
  const { t } = useTranslation(['electricity', 'common', 'error'])
  const { user } = useUserContext()

  const isTooBigResidence = user?.currentMove?.residenceType !== RESIDENCE_TYPES.APARTMENT ? user?.currentMove?.residenceSize > 360 : user?.currentMove?.residenceSize > 330

  const electricityProvidersMapped: ElectricityProviderType[] = []
  Object.keys(electricityProviders).forEach((key: string) => {
    if (electricityProviders[key]?.provider)
      electricityProvidersMapped.push({
        ...electricityProviders[key],
      })
  })

  const renderErrorPage = () => {
    return (
      <div className={errorMessageFrameVariants()}>
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

  if ((errorMessageKey && user?.currentMove?.fromAddress?.street) || errorMessageKey === PRICE_NOT_FOUND) {
    return (
      <>
        {errorMessageKey === ORDER_ERROR ? (
          renderErrorPage()
        ) : (
          <div className={errorMessageFrameVariants({ variant: theme as 'fb' | 'fortum' | 'normal' })}>
            <TailoredMoveInPreparation error={errorMessageKey} />
          </div>
        )}
      </>
    )
  }

  const providersMappedAndSorted = electricityProvidersMapped.sort((a, b) => {
    return a?.periodCost - b?.periodCost
  })

  const isPricesUnavailable = isTooBigResidence || (providersMappedAndSorted?.length === 0 && !loadingProviders)

  if (loadingProviders) {
    return (
      <div className={step1ProvidersWrapperVariants()} data-testid="step-1-providers-container">
        <div className={mainSectionWrapperVariants()}>
          <div className={spinnerWrapperVariants()}>
            <Spinner scale={2} color="green" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={step1ProvidersWrapperVariants()} data-testid="step-1-providers-container">
      {isPricesUnavailable ? (
        <div className={clsx(noProvidersWrapperVariants({ isTooBig: isTooBigResidence }), 'flex flex-col justify-center items-center gap-2')}>
          <LightningNew />
          {isTooBigResidence ? (
            <Text className="text-center !text-[18px] !leading-6 !text-[var(--color-secondary-dark)]">{t('tooBigResidenceSize')}</Text>
          ) : (
            <Text className="text-center !text-[18px] !leading-6 !text-[var(--color-secondary-dark)]">{t('enterAddress')}</Text>
          )}
        </div>
      ) : (
        <div className={mainSectionWrapperVariants()}>
          <div className={serviceWrapperVariants()}>
            {!!providersMappedAndSorted?.length &&
              providersMappedAndSorted.map((provider: ElectricityProviderType) => (
                <ElectricityProviderCard setCurrentStep={setCurrentStep} key={provider.provider} provider={provider} popupText={popupText} />
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Step1ServicesAndPrices
