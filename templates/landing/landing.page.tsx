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

        {/* CTA Section */}
        <section className="w-screen flex justify-center bg-white py-16 md:py-20">
          <div className="w-full px-4 md:px-8 max-w-[1232px]">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary-main)] mb-4">
                Har du frågor?
              </h2>
              <p className="text-[var(--color-secondary-main)]/60 mb-8 max-w-[480px] mx-auto">
                Vi finns här för dig. Ring, maila eller läs mer om hur vi kan hjälpa dig flytta smartare.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/kontakt"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--color-primary-main)] text-white font-semibold hover:bg-[var(--color-primary-main)]/85 transition-colors"
                >
                  Kontakta oss
                </a>
                <a
                  href="/tjanster"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[var(--color-secondary-main)]/15 text-[var(--color-secondary-main)] font-semibold hover:border-[var(--color-primary-main)] hover:text-[var(--color-primary-main)] transition-colors"
                >
                  Se våra tjänster
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
