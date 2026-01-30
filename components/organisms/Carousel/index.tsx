import React from 'react'
import Slider from 'react-slick'
import { clsx } from 'clsx'

// CSS imports are done in _app.tsx

type CarouselProps = {
  infinite: boolean
  speed: number
  slidesToShow: number
  slidesToScroll: number
  autoplay: boolean
  autoplaySpeed: number
  children: React.ReactNode[]
  nav?: 'dots' | 'arrows'
  asCardWith?: boolean
  withBothNav?: boolean
  withArrowOnBottom?: boolean
  wideSlideTrack?: boolean
}

const Carousel = ({ children, nav, asCardWith, withBothNav, withArrowOnBottom, wideSlideTrack, ...props }: CarouselProps) => {
  const dotsSetting = (nav === 'dots' || withBothNav) && { dots: true }

  return (
    <div
      className={clsx(
        'max-w-full block',
        asCardWith && 'w-full',
        wideSlideTrack && '[&_.slick-track]:!w-[10000px]',
        nav === 'arrows' || withBothNav
          ? '[&_.slick-next:before]:text-[var(--color-secondary-main)] [&_.slick-prev:before]:text-[var(--color-secondary-main)]'
          : '[&_.slick-next:before]:hidden [&_.slick-prev:before]:hidden',
        withArrowOnBottom && [
          '[&_.slick-next]:top-auto [&_.slick-next]:bottom-[-30px] [&_.slick-next]:right-[15px] [&_.slick-next]:z-[1]',
          '[&_.slick-prev]:top-auto [&_.slick-prev]:bottom-[-30px] [&_.slick-prev]:left-[15px] [&_.slick-prev]:z-[1]',
        ],
      )}
    >
      <Slider {...props} {...dotsSetting} appendDots={(dots) => <ul className="[&_li_button:before]:text-xs [&_li_button:before]:text-[var(--color-secondary-main)]">{dots}</ul>}>
        {React.Children.map(children, (child) => (
          <div>{child}</div>
        ))}
      </Slider>
    </div>
  )
}

export default Carousel
