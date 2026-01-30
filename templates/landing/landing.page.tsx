'use client'

import { useTranslation } from 'react-i18next'
import Footer from 'app/_components/footer/FooterClient'
import { clsx } from 'clsx'
import dynamic from 'next/dynamic'
import useResponsive from '@/common/hooks/useResponsive'
import { useCookieFirst } from '@cookiefirst/cookiefirst-react'
import Contact from './components/contact'
import FAQ from './components/faq'
import HowItWorks from './components/howItWorks'
import LandingHero from './components/landingHero'
import Milestones from './components/milestones'
import Partners from './components/Partners'

const Testimonials = dynamic(() => import('./components/testimonials'), { ssr: false })

interface LandingPageProps {
  isServerIosOrSafari: boolean
}

export const LandingPage = ({ isServerIosOrSafari }: LandingPageProps) => {
  const { changeLanguage } = useCookieFirst()
  const { i18n } = useTranslation('')
  changeLanguage(i18n.language)
  const { isTabletPortraitOrGreater } = useResponsive()

  return (
    <>
      <div className="overflow-x-hidden overflow-y-auto scroll-smooth sm:scroll-auto">
        {/* Hero Section - component handles its own background */}
        <LandingHero />

        {/* Partners Section */}
        <Partners />

        {/* Testimonials Section - lighter gradient */}
        <section
          className={clsx(
            'w-screen flex pt-8 justify-center',
            'bg-gradient-to-br from-[#1a3a52] via-[#214766] to-[#2d5a7b] text-[var(--color-white-main)]',
            'py-16 md:py-24',
            '[&_a]:text-[var(--color-white-main)]'
          )}
        >
          <div className="w-full px-4 md:px-8 max-w-[1232px]">
            <Testimonials />
          </div>
        </section>

        {/* How It Works Section (Hybrid Benefits/Process) */}
        <HowItWorks />

        {/* Milestones Section - compact */}
        <section
          className={clsx(
            'w-screen flex justify-center',
            'bg-gradient-to-bl from-[#2d5a7b] via-[#214766] to-[#1a3a52] text-[var(--color-white-main)]',
            '[&_a]:text-[var(--color-white-main)]'
          )}
        >
          <div className="w-full px-4 md:px-8 max-w-[1232px]">
            <Milestones />
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          className={clsx(
            'w-screen flex pt-8 justify-center',
            'bg-[var(--color-background-default)] text-[var(--color-secondary-main)]',
            'py-16 md:py-24'
          )}
        >
          <div className="w-full px-4 md:px-8 max-w-[1232px]">
            <FAQ isServerIosOrSafari={isServerIosOrSafari} />
          </div>
        </section>

        {/* Contact & Footer Sections */}
        <section
          id="contact"
          className={clsx(
            'w-screen flex pt-8 justify-center',
            'bg-[var(--color-white-main)] text-[var(--color-secondary-main)]',
            'py-16 md:py-24 pb-8'
          )}
        >
          <div className="w-full px-4 md:px-8 max-w-[1232px]">
            <Contact />
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
