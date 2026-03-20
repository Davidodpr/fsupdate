'use client'

import { useTranslation } from 'react-i18next'
import Footer from 'app/_components/footer/FooterClient'
import { clsx } from 'clsx'
import dynamic from 'next/dynamic'
import useResponsive from '@/common/hooks/useResponsive'
import { useCookieFirst } from '@cookiefirst/cookiefirst-react'
import type { GoogleReview, GoogleReviewCountAndRating } from 'app/_actions/googleReviews.types'
import FAQ from './components/faq'
import HowItWorks from './components/howItWorks'
import LandingHero from './components/landingHero'
import Milestones from './components/milestones'
import Partners from './components/Partners'

const Testimonials = dynamic(() => import('./components/testimonials'), { ssr: false })

interface LandingPageProps {
  isServerIosOrSafari: boolean
  googleReviews?: GoogleReview[] | null
  googleRating?: GoogleReviewCountAndRating | null
}

export const LandingPage = ({ isServerIosOrSafari, googleReviews, googleRating }: LandingPageProps) => {
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
            <Testimonials googleReviews={googleReviews} googleRating={googleRating} />
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

        {/* Contact Section */}
        <section className="w-screen flex justify-center bg-white py-16 md:py-20">
          <div className="w-full px-4 md:px-8 max-w-[1232px]">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary-main)] mb-2">
                  Har du frågor?
                </h2>
                <p className="text-[var(--color-secondary-main)]/50 text-sm max-w-[360px]">
                  Vi svarar snabbt. Ring eller maila - du når oss mån-fre 09-16.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="tel:+46812008822" className="flex items-center gap-3 text-[var(--color-secondary-main)] hover:text-[var(--color-primary-main)] transition-colors">
                  <span className="w-9 h-9 rounded-full bg-[var(--color-primary-main)]/10 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[var(--color-primary-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  <span className="text-[15px] font-semibold">08-12 00 88 22</span>
                </a>
                <a href="mailto:hej@flyttsmart.se" className="flex items-center gap-3 text-[var(--color-secondary-main)] hover:text-[var(--color-primary-main)] transition-colors">
                  <span className="w-9 h-9 rounded-full bg-[var(--color-primary-main)]/10 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-[var(--color-primary-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <span className="text-[15px] font-semibold">hej@flyttsmart.se</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
