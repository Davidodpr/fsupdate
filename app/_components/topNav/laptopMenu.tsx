import React from 'react'
import { useTranslation } from 'react-i18next'
import NextLink from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import ServiceUrlEnum from '@/common/enums/ServiceUrlEnum'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import { LanguageSelect } from '@/components/molecules/LanguageSelect'
import Link from '@/components/molecules/Link'
import Globe from '@/public/images/Globe.svg'
import { headerMenuButtonVariants, styledLinkVariants } from './Menu.variants'

interface Props {
  onlyLogin: boolean
}

const LaptopMenu = ({ onlyLogin }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const isExternalSite = pathname.includes(`/${ServiceUrlEnum.EXTERNAL_MOVEHELP}`) || pathname.includes(`/${ServiceUrlEnum.EXTERNAL_MOVECLEAN}`)
  const { t } = useTranslation('header')

  return (
    <>
      {!onlyLogin && (
        <div className={headerMenuButtonVariants()}>
          <NextLink href="#faq" className={styledLinkVariants()}>
            {t('MENU.faq')}
          </NextLink>
        </div>
      )}
      {!onlyLogin && (
        <div className={headerMenuButtonVariants()}>
          <NextLink href="#contact" className={styledLinkVariants()}>
            {' '}
            {t('MENU.contact')}
          </NextLink>
        </div>
      )}
      {!onlyLogin && (
        <div className={headerMenuButtonVariants()}>
          <NextLink href="https://jobb.flyttsmart.se/" className={styledLinkVariants()}>
            {t('MENU.jobs')}
          </NextLink>
        </div>
      )}
      {isExternalSite ? (
        <Flex direction="row" alignItems="center">
          <Link
            href={`/${ServiceUrlEnum.EXTERNAL_MOVEHELP}?step=1`}
            sx={{
              margin: '0px 32px',
              color: 'var(--fs-colors-secondaryMain)',
            }}
            noUnderline
          >
            {t('EXTERNAL.toMovehelp')}
          </Link>
          <Link
            href={`/${ServiceUrlEnum.EXTERNAL_MOVECLEAN}?step=1`}
            sx={{
              margin: '0px 32px',
              color: 'var(--fs-colors-secondaryMain)',
            }}
            noUnderline
          >
            {t('EXTERNAL.toMoveclean')}
          </Link>
          <Link
            href={'/'}
            sx={{
              margin: '0px 32px',
              color: 'var(--fs-colors-tertiaryMain)',
            }}
            noUnderline
          >
            {t('EXTERNAL.toFlyttsmart')}
          </Link>
        </Flex>
      ) : (
        <Button onClick={() => router.push(process.env.NODE_ENV === 'development' ? '/i/testmode' : `/login${pathname !== '/' ? `?ref=${pathname}` : ''}`)} text={t('MENU.login')} className="!uppercase !px-13 !py-3" />
      )}
      <Flex className="ml-8" display="flex">
        <Flex display="flex" alignItems="center">
          <Globe height={22} width={22} />
        </Flex>
        <LanguageSelect />
      </Flex>
    </>
  )
}

export default LaptopMenu
