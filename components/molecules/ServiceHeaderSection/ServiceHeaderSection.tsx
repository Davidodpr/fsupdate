import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { IMAGEKIT_IMAGES } from '@/common/enums/ImageKitImageEnum'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import Flex from '@/components/atoms/Flex'
import { SellingPointItem } from '@/components/atoms/SellingPointItem'
import Text from '@/components/atoms/Text'

interface ServiceHeaderSectionProps {
  translationKey: 'painting' | 'moveServicesDynamicPricePerHour'
  firstIcon: React.ReactNode
  secondIcon: React.ReactNode
  thirdIcon: React.ReactNode
}

const ServiceHeaderSection = ({ translationKey, firstIcon, secondIcon, thirdIcon }: ServiceHeaderSectionProps) => {
  const { t, i18n } = useTranslation(translationKey)
  const locale = i18n.language
  const { theme } = useThemeContext()

  const backgroundStyles =
    translationKey === 'painting'
      ? {
          backgroundImage: `url(${IMAGEKIT_IMAGES.PAINTING_BG_MOBILE}), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5))`,
          backgroundBlendMode: 'overlay' as const,
        }
      : {
          backgroundImage: `url(${IMAGEKIT_IMAGES.MOVEHELP_BG_MOBILE})`,
        }

  return (
    <>
      {translationKey === 'moveServicesDynamicPricePerHour' && (
        <style jsx>{`
          @media (min-width: 1024px) {
            .service-header-section-movehelp {
              background-image: url(${IMAGEKIT_IMAGES.MOVEHELP_BG_DESKTOP}) !important;
            }
          }
        `}</style>
      )}
      <div
        className={clsx(
          'w-full flex flex-col p-[32px_16px] text-center justify-center items-center',
          'bg-center bg-cover bg-no-repeat',
          'md:p-[32px_160px]',
          translationKey === 'moveServicesDynamicPricePerHour' && 'md:flex-row md:bg-center service-header-section-movehelp',
        )}
        style={backgroundStyles}
      >
        <Flex direction="column" justifyContent="space-between" alignItems="start">
          <h1
            className={clsx(
              'm-0 text-[32px] text-[var(--color-white-main)] pb-8 text-left',
              'leading-[120%] tracking-[0.72px] pl-4',
              theme === ThemeEnum.FASTIGHETSBYRAN && 'font-[var(--font-family-secondary)]',
              'min-[380px]:whitespace-nowrap min-[380px]:pl-0',
              'md:text-[64px] md:whitespace-nowrap',
            )}
          >
            {t('headerTitle')}
          </h1>
          <div className="flex flex-col md:flex-row md:justify-center md:items-center">
            <div
              className={clsx(
                'flex flex-col p-[24px_16px] items-center text-left',
                'rounded-[var(--radius-border-radius-small)] bg-[rgba(255,255,255,0.90)]',
                'md:p-[32px_48px] md:w-[692px] md:h-[212px]',
              )}
            >
              <Text className={clsx('w-full mt-0 font-bold text-[var(--color-text-main)]', 'text-[20px] md:text-[22px]')}>{t('introSectionTitle')}</Text>
              <Text spacing="none" className={clsx('text-[16px] leading-[22px] text-[var(--color-text-main)]', 'font-normal md:text-[18px]')}>
                {t('introSectionText')}
              </Text>
            </div>
            <div className={clsx('w-full flex justify-between items-between', 'p-[10px_0] gap-[10px] text-[var(--color-text-main)]', 'md:flex-col md:max-w-[200px] md:p-[0_8px]')}>
              <SellingPointItem icon={firstIcon} text={t('SELLING_POINTS.moves')} />
              <SellingPointItem withBlueColor={theme === 'normal'} lessFontSize={locale === 'en'} icon={secondIcon} text={t('SELLING_POINTS.satisfiedCustomers')} />
              <SellingPointItem withBlueColor={theme === 'normal'} icon={thirdIcon} text={t('SELLING_POINTS.qualityAssured')} />
            </div>
          </div>
        </Flex>
      </div>
    </>
  )
}

export default ServiceHeaderSection
