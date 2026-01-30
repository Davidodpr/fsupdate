import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { sv } from 'date-fns/locale'
import useNextBestAction from 'hooks/nextBestAction'
import useResponsive from '@/common/hooks/useResponsive'
import { useBroadbandProvider } from '@/common/context/broadband/broadbandProvider.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import SuccessPageNew from '@/components/organisms/SuccessPageNew'
import { mainWrapperVariants, styledFlexVariants, buttonContainerVariants } from './Step4Confirmation.variants'

interface ConfirmationProps {
  setCurrentStep: (step: number) => void
}

const Confirmation = ({ setCurrentStep }: ConfirmationProps) => {
  const { theme } = useThemeContext()
  const { t } = useTranslation(['broadband', 'common'])
  const { chosenOffer, broadbandOrder } = useBroadbandProvider()
  const { nextBestAction } = useNextBestAction()
  const { isTabletPortraitOrGreater } = useResponsive()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return chosenOffer && broadbandOrder ? (
    <div className={styledFlexVariants()}>
      <SuccessPageNew
        gaEventName="broadband_complete"
        nextBestAction={nextBestAction}
        isLoggedIn={true}
        moreInfo={t('CONFIRMATIONPAGE.confirmationSubtitle')}
        title={t('CONFIRMATIONPAGE.title')}
        buttonText={theme === ThemeEnum.FASTIGHETSBYRAN ? t('common:customCtaText') : t('common:redirectToMovingPage')}
        titleSpecial={t('CONFIRMATIONPAGE.titleSpecial')}
        additionalTitle={t('CONFIRMATIONPAGE.goodJob')}
        extraButton={
          <div className={buttonContainerVariants()}>
            <Button
              variant="outlineHoverInvertedAlt2"
              text={t('CONFIRMATIONPAGE.cancelExisitingBroadband')}
              padding="14px 20px"
              withFullWidth={!isTabletPortraitOrGreater}
              onClick={() => {
                setCurrentStep(5)
              }}
            />
          </div>
        }
      >
        <div className={mainWrapperVariants()}>
          <Text variant="bodyBold" spacing="none" className="mb-4">
            {t('CONFIRMATIONPAGE.confirmationText').replace(
              '{{provider}}',
              chosenOffer?.company.replace(chosenOffer.company.charAt(0), chosenOffer.company.charAt(0).toUpperCase()),
            )}
          </Text>
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Text variant="bodyBold" spacing="top">
              {t('offer')}
            </Text>
            <Text variant="body" spacing="top" style={{ textAlign: 'right' }}>
              {chosenOffer?.name}
            </Text>
          </Flex>
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Text variant="bodyBold" spacing="top">
              {t('CONFIRMATIONPAGE.provider')}
            </Text>
            <Text variant="body" spacing="top">
              {chosenOffer?.company.replace(chosenOffer.company.charAt(0), chosenOffer.company.charAt(0).toUpperCase())}
            </Text>
          </Flex>
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Text variant="bodyBold" spacing="top">
              {t('startDate')}
            </Text>
            {broadbandOrder.startDate && (
              <Text variant="body" spacing="top">
                {format(new Date(broadbandOrder.startDate), 'dd MMMM yyyy', { locale: sv })}
              </Text>
            )}
          </Flex>
        </div>
      </SuccessPageNew>
    </div>
  ) : null
}

export default Confirmation
