import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useIntercom } from 'react-use-intercom'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useUserContext } from '@/common/context/user/UserProvider'
import useResponsive from '@/common/hooks/useResponsive'
import { getTwoRandomMcAdminIds } from '@/common/utils/mcAdminHelpers'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import ImageKit from '@/components/atoms/ImageKit'
import Text from '@/components/atoms/Text'
import ArrowRightThin from '@/public/images/ArrowRight_thin.svg'
import Checkmark from '@/public/images/Checkmark.svg'

const MovehelpQuotationIntroSection = () => {
  const router = useRouter()
  const { t } = useTranslation(['movehelp', 'common', 'error'])
  const { show } = useIntercom()
  const {
    user: {
      profile: { leadDetails },
    },
  } = useUserContext()

  const assignedMcAdmin = leadDetails?.assignedMcAdmin
  const { isTabletPortraitOrGreater } = useResponsive()

  const additionalMcAdminIds = useMemo(() => {
    return getTwoRandomMcAdminIds(assignedMcAdmin?.id)
  }, [assignedMcAdmin?.id])

  return (
    <>
      <Flex direction={isTabletPortraitOrGreater ? 'column' : 'column'} style={{ gap: isTabletPortraitOrGreater ? 0 : 16 }}>
        <Flex
          direction="column"
          alignItems="center"
          className={clsx(
            'flex mx-auto w-full p-4 rounded-[var(--radius-border-radius-main)]',
            'shadow-[0px_4px_32px_0px_rgba(0,0,0,0.07)]',
            'md:px-12 md:py-8 md:min-w-[748px]',
            'sm:max-w-[629px]',
          )}
          style={{
            backgroundColor: 'var(--color-background-secondary)',
          }}
        >
          <Flex direction="column" alignItems="center" className={clsx('text-center gap-6 justify-center items-center', 'sm:w-[400px]')}>
            <Text className="!text-2xl !font-bold !leading-6 w-full mb-5 !m-0">{t('QUOTATIONS.quotationHeader')}</Text>
            <Text className="!text-base w-4/5 mb-6 !m-0">{t('QUOTATIONS.quotationSubtitle')}</Text>
            <div className="flex w-full justify-center items-center text-xs flex-col !gap-2">
              <div className="h-12 w-[300px] [&_svg]:text-white [&_svg_path]:text-white [&_svg_path]:stroke-white">
                <Button
                  onClick={() => {
                    router.push('/movehelp-quotation?service=movehelpAndCleaning')
                  }}
                  text={t('QUOTATIONS.movehelpAndCleaningButton')}
                  variant="primary"
                  withFullWidth
                  padding="10px 16px"
                  iconRight={<ArrowRightThin color="#fff" />}
                  withSpaceBetween
                />
              </div>
              <div className="h-12 w-[300px] [&_svg]:text-[var(--color-secondary-main)] [&_svg_path]:text-[var(--color-secondary-main)] [&_svg_path]:stroke-[var(--color-secondary-main)]">
                <Button
                  onClick={() => {
                    router.push('/movehelp-quotation?service=movehelp')
                  }}
                  text={t('QUOTATIONS.movehelpButton')}
                  variant="outline"
                  withFullWidth
                  padding="10px 16px"
                  iconRight={<ArrowRightThin color="#fff" />}
                  withSpaceBetween
                />
              </div>
            </div>
          </Flex>
        </Flex>
        <Flex
          alignItems="center"
          direction="column"
          className={clsx('border border-[rgba(33,71,102,0.20)] rounded-2xl h-max', isTabletPortraitOrGreater ? 'w-[70%] p-6 mt-8 mx-auto' : 'mx-4 my-0 p-4')}
          style={{
            gap: 16,
          }}
        >
          <Flex className="w-full" direction={isTabletPortraitOrGreater ? 'row' : 'column'} justifyContent="space-between">
            <div
              className={clsx(
                'w-full flex items-start gap-2 text-sm italic text-[var(--color-text-main)] text-left flex-col mb-8',
                '[&_svg]:w-6 [&_svg]:h-6 [&_svg]:stroke-[var(--color-secondary-light)]',
                '[&_p]:text-sm',
                'md:mb-0 md:flex-col md:gap-2 md:justify-between md:p-0',
                'md:[&_p]:text-base',
              )}
            >
              <Flex alignItems="center">
                <Checkmark style={{ marginRight: 4 }} />
                <Text spacing="none">{t('QUOTATIONS.quotationSellingPoint1')}</Text>
              </Flex>
              <Flex alignItems="center">
                <Checkmark style={{ marginRight: 4 }} />
                <Text spacing="none">{t('QUOTATIONS.quotationSellingPoint2')}</Text>
              </Flex>
              <Flex alignItems="center">
                <Checkmark style={{ marginRight: 4 }} />
                <Text spacing="none">{t('QUOTATIONS.quotationSellingPoint3')}</Text>
              </Flex>
              <Flex alignItems="center">
                <Checkmark style={{ marginRight: 4 }} />
                <Text spacing="none">{t('QUOTATIONS.quotationSellingPoint4')}</Text>
              </Flex>
              <Flex alignItems="center">
                <Checkmark style={{ marginRight: 4 }} />
                <Text spacing="none">{t('QUOTATIONS.quotationSellingPoint5')}</Text>
              </Flex>
            </div>
            <Flex alignItems="center" justifyContent="center" direction="column" style={{ minWidth: 200, height: '100%' }}>
              <Flex className="pb-2">
                <div style={{ borderRadius: '50%', border: '1px solid #bfbfbf', width: 40, height: 40, overflow: 'hidden' }}>
                  <ImageKit src={`/Marketing/site_images/${assignedMcAdmin?.id}.jpg`} alt="Moving Coordinator" width={40} height={40} />
                </div>
                <div style={{ borderRadius: '50%', border: '1px solid #bfbfbf', width: 40, height: 40, overflow: 'hidden', marginLeft: -12 }}>
                  <ImageKit src={`/Marketing/site_images/${additionalMcAdminIds[0]}.jpg`} alt="Moving Coordinator" width={40} height={40} />
                </div>
                <div style={{ borderRadius: '50%', border: '1px solid #bfbfbf', width: 40, height: 40, overflow: 'hidden', marginLeft: -12 }}>
                  <ImageKit src={`/Marketing/site_images/${additionalMcAdminIds[1]}.jpg`} alt="Moving Coordinator" width={40} height={40} />
                </div>
              </Flex>
              <Text spacing="none" variant="bodyLarge" style={{ fontStyle: 'italic', fontWeight: '16px' }}>
                {t('bookDirectly')}
              </Text>
              <Text variant="bodyLarge" onClick={() => show()} spacing="none" className="text-[var(--color-primary-main)] !font-bold hover:cursor-pointer">
                {t('chatWithUs')}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default MovehelpQuotationIntroSection
