import React from 'react'
import { clsx } from 'clsx'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { SliderProps } from '@radix-ui/react-slider'
import { sliderRootVariants, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants, sliderLabelVariants } from './Slider.variants'

export interface Props extends SliderProps {
  mainText?: string
  additionalText?: string
  showLabel?: boolean
}

const Slider = ({ mainText, additionalText, showLabel = true, className, ...props }: Props) => {
  const values = props.value || props.defaultValue || []

  const rootClasses = sliderRootVariants()
  const trackClasses = sliderTrackVariants()
  const rangeClasses = sliderRangeVariants()
  const thumbClasses = sliderThumbVariants()

  return (
    <SliderPrimitive.Root className={clsx(rootClasses, className)} {...props}>
      <SliderPrimitive.Track className={trackClasses}>
        <SliderPrimitive.Range className={rangeClasses} />
      </SliderPrimitive.Track>
      {values?.[0] > 0 &&
        values?.map((value, i) => (
          <SliderPrimitive.Thumb key={i} className={thumbClasses}>
            {showLabel && (
              <div className={sliderLabelVariants({ lower: false })} data-testid="main-label">
                {value} {mainText}
              </div>
            )}
            {additionalText && <div className={sliderLabelVariants({ lower: true })}>{additionalText}</div>}
          </SliderPrimitive.Thumb>
        ))}
    </SliderPrimitive.Root>
  )
}

export default Slider
