'use client'

import Image from 'next/image'
import { clsx } from 'clsx'

type PhoneMockupProps = {
  src: string
  alt: string
  className?: string
}

const PhoneMockup = ({ src, alt, className }: PhoneMockupProps) => {
  return (
    <div
      className={clsx(
        'relative mx-auto',
        'w-[280px] md:w-[320px] lg:w-[360px]',
        className
      )}
    >
      {/* Phone frame */}
      <div
        className={clsx(
          'relative rounded-[40px] bg-[#1a1a1a] p-2',
          'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)]',
          'before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2',
          'before:w-[100px] before:h-[28px] before:bg-[#1a1a1a] before:rounded-b-2xl before:z-10'
        )}
      >
        {/* Screen */}
        <div className="relative rounded-[32px] overflow-hidden bg-white aspect-[9/19.5]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      {/* Subtle reflection effect */}
      <div
        className={clsx(
          'absolute inset-0 rounded-[40px]',
          'bg-gradient-to-br from-white/10 via-transparent to-transparent',
          'pointer-events-none'
        )}
      />
    </div>
  )
}

export default PhoneMockup
