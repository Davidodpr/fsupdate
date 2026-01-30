import React, { ReactNode, useEffect } from 'react'
import ReactGA from 'react-ga4'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import ServiceUrlEnum from '@/common/enums/ServiceUrlEnum'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import useResponsive from '@/common/hooks/useResponsive'
import { ActivityEnum, ORDER_SERVICE_ACTIVITY_TYPE_MAP } from '@/common/types/activity'
import Button from '@/components/atoms/Button'
import ExitActivityButton from '@/components/atoms/ExitActivityButton'
import Flex from '@/components/atoms/Flex'
import ImageKit from '@/components/atoms/ImageKit'
import ActivityItem from '@/components/organisms/ActivityItem'
import { OrderServiceType } from '@/constants/order'
import { ActivitiesIcons, IconsUrls } from '@/enums/ActivitiesIconsEnum'

type NextBestActionLabel = 'broadband' | 'hemlarm' | 'hemstadning' | 'diy' | 'addresschange' | 'insurance' | 'power' | 'movehelpCombined' | 'moveclean' | 'movehelp'

interface Props {
  isLoggedIn: boolean
  title?: string
  subtitle?: string | null
  children?: ReactNode
  moreInfo?: string | null
  extraButton?: ReactNode
  gaEventName?: string
  buttonText?: string
  titleSpecial?: string
  nextBestAction?: OrderServiceType | null
  customCtaText?: string
  additionalTitle?: string
  isExternalSite?: boolean
  activityItem?: ReactNode
}

export const SuccessPageNew = ({
  isLoggedIn,
  title,
  subtitle,
  children,
  moreInfo,
  extraButton,
  buttonText,
  gaEventName,
  titleSpecial,
  nextBestAction,
  customCtaText,
  additionalTitle,
  isExternalSite,
  activityItem,
}: Props) => {
  const { isTabletPortraitOrGreater } = useResponsive()
  const nextBestActionActivity = nextBestAction ? ORDER_SERVICE_ACTIVITY_TYPE_MAP[nextBestAction] : null
  const { t } = useTranslation(['common', 'movePage'])
  const router = useRouter()
  const { theme } = useThemeContext()
  const {
    user: {
      currentMove: { fromAddress, toAddress, fromResidenceSize },
    },
  } = useUserContext()

  useEffect(() => {
    if (gaEventName) {
      ReactGA.event(gaEventName)
    }
  }, [gaEventName])

  const handleRedirect = () => {
    let route
    switch (nextBestActionActivity) {
      case ActivityEnum.POWER:
        route = `app/${ServiceUrlEnum.ELECTRICITY}?nextBest=true`
        break
      case ActivityEnum.INTERNET:
        route = `app/${ServiceUrlEnum.BROADBAND}?nextBest=true`
        break
      case ActivityEnum.MOVEHELP_COMBINED:
        route = `app/${ServiceUrlEnum.MOVEHELP_COMBINED}?nextBest=true`
        break
      case ActivityEnum.MOVEHELP:
        route = `app/${ServiceUrlEnum.MOVEHELP_NEW}?nextBest=true`
        break
      case ActivityEnum.MOVECLEAN:
        route = `app/${ServiceUrlEnum.MOVECLEAN_NEW}?nextBest=true`
        break
      default:
        route = nextBestActionActivity ?? ''
    }
    ReactGA.event(`next_best_action_click_${nextBestActionActivity}`)
    router.push(`/${route}`)
  }

  const getSubtitle = () => {
    const translation = t(`${nextBestActionActivity as NextBestActionLabel}Subtitle`)
    if (nextBestActionActivity === ActivityEnum.MOVEHELP) {
      if (fromResidenceSize && fromResidenceSize > 0) return translation?.replace('{{sqm}}', fromResidenceSize?.toString() || '')
      else return t('internetAlternativeSubtitle')
    } else {
      return translation?.replace(
        '{{address}}',
        nextBestActionActivity === ActivityEnum.INTERNET || nextBestActionActivity === ActivityEnum.INSURANCE ? toAddress?.street : fromAddress.street,
      )
    }
  }

  return (
    <>
      <div className="h-auto mx-auto bg-white border-2 border-white shadow-[var(--shadow-regular)] mt-4 rounded-[var(--radius-border-radius-main)] w-[95%] sm:w-[744px] sm:max-w-full">
        <Flex display="flex" direction="column" alignItems="center" className="w-full justify-center items-center flex-col p-4 sm:p-4 md:p-4 lg:px-24 lg:py-8">
          <div className="text-2xl text-center font-black text-[var(--color-text-main)] pb-8 sm:text-3xl [&_strong]:font-black [&_strong]:text-[var(--color-tertiary-main)] [&_p]:m-0 [&_p]:leading-none">
            {title}
            <span
              className={clsx(
                'text-2xl mb-6 font-black text-[var(--color-text-tertiary)]',
                'sm:text-3xl sm:mb-1',
                '[&_strong]:font-black [&_strong]:text-[var(--color-text-tertiary)]',
                '[&_p]:m-0 [&_p]:leading-none',
                additionalTitle && 'mb-0',
              )}
            >
              {titleSpecial}
            </span>
            {additionalTitle && (
              <span className="text-2xl mb-4 font-black text-[var(--color-text-main)] sm:text-3xl [&_strong]:font-black [&_strong]:text-[var(--color-tertiary-main)] [&_p]:m-0 [&_p]:leading-none">
                {' '}
                {additionalTitle}
              </span>
            )}
          </div>
          <div className="w-full h-[1px] bg-[#E1E1E3]" />
          <div className="text-[15px] py-6 text-center font-bold text-[var(--color-text-main)]">{subtitle}</div>
          {children}
          {moreInfo && <div className="w-full text-[15px] text-left px-4 md:text-center md:p-0">{moreInfo}</div>}
          {activityItem && <div className="w-full mb-10">{activityItem}</div>}
          {isLoggedIn && (
            <Flex display="flex" direction={isTabletPortraitOrGreater ? 'row' : 'column'} justifyContent={'center'} alignItems="center" className="w-full pt-6">
              {extraButton}
              <div className={clsx('flex w-full justify-center items-center sm:w-auto md:mt-0', extraButton && 'w-[282px]')}>
                <ExitActivityButton variant={theme === ThemeEnum.FASTIGHETSBYRAN ? 'fbPrimary' : 'primaryAlt'} text={customCtaText || buttonText || ''} />
              </div>
            </Flex>
          )}
        </Flex>
      </div>
      {nextBestActionActivity && !isExternalSite && theme !== ThemeEnum.FASTIGHETSBYRAN && (
        <>
          <div className="text-base font-bold text-[rgba(33,71,102,0.75)] text-center w-full my-3">{t('getMoreThingsDone')}</div>
          <div className="mt-4 pt-4 mx-auto w-[95%] cursor-pointer sm:w-full md:w-[744px] lg:w-[744px]" onClick={handleRedirect}>
            <ActivityItem
              buttonText={t(`${nextBestActionActivity as NextBestActionLabel}ButtonText`)}
              handleButton={handleRedirect}
              nextBestActionEvent={`next_best_action_view_${nextBestActionActivity}`}
              description={getSubtitle()}
              title={t(`${nextBestActionActivity as NextBestActionLabel}Label`)}
              icon={!!theme && <ImageKit src={`${ActivitiesIcons?.[theme]?.[nextBestActionActivity as keyof IconsUrls]}`} />}
              isConfirmationPage={true}
              isNextBestAction={true}
            />
          </div>
        </>
      )}
      {isExternalSite && (
        <Flex justifyContent="center" direction="column" alignItems="center">
          <Flex justifyContent="center" className="justify-center w-full my-8">
            <div>
              <div className="text-center text-[var(--color-secondary-main)] m-0 p-0 font-normal text-base w-[330px] md:w-[350px] [&_span]:text-[var(--color-primary-main)] [&_span]:pl-1.5">
                {t('externalSiteConfirmationHeaderOne')}
                {<span>{t('flyttsmart')}</span>}
              </div>
            </div>
          </Flex>
          <ImageKit src="Products/MovingAndCleaning/Group%203296_xknDhnST8.svg?updatedAt=1690983796347" width="305" height="640" />
          <div className="w-[245px] h-12 mt-[38px]">
            <Button
              type="submit"
              fontSize={15}
              padding="24px 60px !important"
              text={t('toFlyttsmart')}
              variant="primary"
              onClick={() => {
                router.push('/')
              }}
            />
          </div>
        </Flex>
      )}
    </>
  )
}

export default SuccessPageNew
