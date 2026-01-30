import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NextLink from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import ServiceUrlEnum from '@/common/enums/ServiceUrlEnum'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import { LanguageSelect } from '@/components/molecules/LanguageSelect'
import Link from '@/components/molecules/Link'
import CloseIcon from '@/public/images/Close_large.svg'
import Globe from '@/public/images/Globe.svg'
import Logo from '@/public/images/Logo2.svg'
import MenuIcon from '@/public/images/MenuIcon.svg'
import { menuIconWrapperVariants, mobileMenuWrapperVariants, iconWrapperVariants, menuButtonVariants, languageSelectWrapperVariants, styledLinkVariants } from './Menu.variants'

interface Props {
  onlyLogin?: boolean
}

const MobileMenu = ({ onlyLogin }: Props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { t } = useTranslation('header')
  const pathname = usePathname()
  const isExternalSite = pathname.includes(`${ServiceUrlEnum.EXTERNAL_MOVEHELP}`) || pathname.includes(`${ServiceUrlEnum.EXTERNAL_MOVECLEAN}`)

  return (
    <>
      {!isExternalSite && (
        <Button padding="0px 32px" onClick={() => router.push(process.env.NODE_ENV === 'development' ? '/i/testmode' : `/login${pathname !== '/' ? `?ref=${pathname}` : ''}`)} text={t('MENU.login')} size="sm" className="uppercase" />
      )}
      <div className={menuIconWrapperVariants()} onClick={() => setOpen(true)}>
        <MenuIcon />
      </div>
      {open && (
        <div className={mobileMenuWrapperVariants()}>
          <div>
            <Flex display="flex" alignItems="center" justifyContent="space-between">
              <Link
                href="/"
                sx={{
                  position: 'relative',
                  top: 5,
                }}
                noUnderline
              >
                <Logo width={116} height={21} alt="logo" />
              </Link>
              <div className={iconWrapperVariants()} onClick={() => setOpen(false)}>
                <CloseIcon />
              </div>
            </Flex>
            <Flex display="flex" direction="column" alignItems="center" justifyContent="center">
              {!onlyLogin && (
                <div className={menuButtonVariants({ withMargin: true })}>
                  <NextLink href="#faq" onClick={() => setOpen(false)} className={styledLinkVariants()}>
                    {t('MENU.faq')}
                  </NextLink>
                </div>
              )}
              {!onlyLogin && (
                <div className={menuButtonVariants()}>
                  <NextLink href="#contact" onClick={() => setOpen(false)} className={styledLinkVariants()}>
                    {t('MENU.contact')}
                  </NextLink>
                </div>
              )}
              {!onlyLogin && (
                <div className={menuButtonVariants()}>
                  <Link href="https://jobb.flyttsmart.se/" noUnderline>
                    {t('MENU.jobs')}
                  </Link>
                </div>
              )}
              {isExternalSite && onlyLogin ? (
                <>
                  <Link
                    href={`/${ServiceUrlEnum.EXTERNAL_MOVEHELP}?step=1`}
                    sx={{
                      marginTop: onlyLogin ? '40px' : '0px',
                      color: 'var(--fs-colors-secondaryMain)',
                    }}
                    noUnderline
                  >
                    {t('EXTERNAL.toMovehelp')}
                  </Link>
                  <Link
                    href={`/${ServiceUrlEnum.EXTERNAL_MOVECLEAN}?step=1`}
                    sx={{
                      marginTop: onlyLogin ? '40px' : '0px',
                      color: 'var(--fs-colors-secondaryMain)',
                    }}
                    noUnderline
                  >
                    {t('EXTERNAL.toMoveclean')}
                  </Link>
                  <Link
                    href={'/'}
                    sx={{
                      marginTop: onlyLogin ? '40px' : '0px',
                      color: 'var(--fs-colors-tertiaryMain)',
                    }}
                    noUnderline
                  >
                    {t('EXTERNAL.toFlyttsmart')}
                  </Link>
                </>
              ) : (
                <Link
                  href={process.env.NODE_ENV === 'development' ? '/i/testmode' : `/login${pathname !== '/' ? `?ref=${pathname}` : ''}`}
                  sx={{
                    marginTop: onlyLogin ? '40px' : '0px',
                    color: 'var(--fs-colors-tertiaryMain)',
                  }}
                  noUnderline
                >
                  {t('MENU.login')}
                </Link>
              )}
              <Flex display="flex" className={languageSelectWrapperVariants()}>
                <Flex display="flex" alignItems="center">
                  <Globe height={22} width={22} />
                </Flex>
                <LanguageSelect />
              </Flex>
            </Flex>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileMenu
