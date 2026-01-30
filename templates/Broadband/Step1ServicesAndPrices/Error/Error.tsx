import React from 'react'
import { useTranslation } from 'react-i18next'
import { useBroadbandProvider } from '@/common/context/broadband/broadbandProvider.provider'
import useResponsive from '@/common/hooks/useResponsive'
import { BirdError } from '@/components/atoms/BirdError'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import { ErrorPage } from '@/components/molecules/ErrorPage'
import { errorMessageFrameVariants, failedWrapperVariants, innerWrapperVariants, subButtonWrapperVariants, subLargeButtonWrapperVariants } from './Error.variants'

interface ErrorProps {
  hasNoFixedOffers: boolean
  noTypesSelected: boolean
  hasNoMobileOffers: boolean
  hasNoBothOffers: boolean
}

const BroadbandErrorPage = ({ hasNoFixedOffers, noTypesSelected, hasNoMobileOffers, hasNoBothOffers }: ErrorProps) => {
  const { filteringBroadBandOptions, updateFilterOptions } = useBroadbandProvider()
  const { isTabletPortraitOrGreater } = useResponsive()
  const { t } = useTranslation(['broadband', 'common', 'error'])

  if (hasNoBothOffers) {
    return (
      <div className={failedWrapperVariants()}>
        <BirdError />
        <div className={innerWrapperVariants()}>
          <Text className="mb-5 !text-2xl !font-bold">{t('error:noBothOffers')}</Text>
          <Text className="mb-5 text-base text-center" variant="body">
            {t('error:noBothOffersSubTitle')}
          </Text>
          <Text className="mb-10 text-base text-center" variant="body">
            {t('error:noBothOffersContact')}
          </Text>
        </div>
      </div>
    )
  }

  if (noTypesSelected) {
    return (
      <div className={failedWrapperVariants()}>
        <BirdError />
        <div className={innerWrapperVariants()}>
          <Text className="mb-5 !text-2xl !font-bolder">{t('error:noTypesChoose')}</Text>
          <Text className="mb-5 text-base text-center" variant="body">
            {t('error:NoTypesChooseSubTitle')}
          </Text>
          <Text className="mb-10 text-base text-center" variant="body">
            {t('error:noTypesChooseTryMobile')}
          </Text>
          <div className={subButtonWrapperVariants()}>
            <div className={subLargeButtonWrapperVariants()}>
              <Button
                variant="primary"
                padding="8px 32px"
                withFullWidth={!isTabletPortraitOrGreater}
                text={t('error:chooseMobile')}
                onClick={() => {
                  updateFilterOptions({ ...filteringBroadBandOptions, types: ['mobile'] })
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (hasNoMobileOffers) {
    return (
      <div className={failedWrapperVariants()}>
        <BirdError />
        <div className={innerWrapperVariants()}>
          <Text className="mb-5 !text-2xl !font-bolder">{t('error:noMobileOffers')}</Text>
          <Text className="mb-5 text-base text-center" variant="body">
            {t('error:noMobileOffersSubTitle')}
          </Text>
          <Text className="mb-10 text-base text-center" variant="body">
            {t('error:noMobileOffersTryFixed')}
          </Text>
          <div className={subButtonWrapperVariants()}>
            <div className={subLargeButtonWrapperVariants()}>
              <Button
                variant="primary"
                padding="12px 64px"
                withFullWidth={!isTabletPortraitOrGreater}
                text={t('error:chooseFixed')}
                onClick={() => {
                  updateFilterOptions({ ...filteringBroadBandOptions, types: ['dsl', 'coaxial', 'fiber'] })
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (hasNoFixedOffers) {
    return (
      <div className={failedWrapperVariants()}>
        <BirdError />
        <div className={innerWrapperVariants()}>
          <Text className="mb-5 !text-2xl !font-bolder">{t('error:noFixedOffers')}</Text>
          <Text className="mb-5 text-base text-center" variant="body">
            {t('error:noFixedOffersSubTitle')}
          </Text>
          <Text className="mb-10 text-base text-center" variant="body">
            {t('error:noFixedOffersTryMobile')}
          </Text>
          <div className={subButtonWrapperVariants()}>
            <div className={subLargeButtonWrapperVariants()}>
              <Button
                variant="primary"
                padding="12px 64px"
                withFullWidth={!isTabletPortraitOrGreater}
                text={t('error:chooseMobile')}
                onClick={() => {
                  updateFilterOptions({ ...filteringBroadBandOptions, types: ['mobile'] })
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={errorMessageFrameVariants()}>
      <ErrorPage
        title={t('error:title_OrderError')}
        withTryAgainButton
        withRouterReload
        subTitleOne={t('error:broadband_no_suppliers')}
        subTitleTwo={t('error:order_error_sub_title_two')}
      />
    </div>
  )
}

export default BroadbandErrorPage
