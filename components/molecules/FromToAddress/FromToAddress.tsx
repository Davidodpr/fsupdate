import { clsx } from 'clsx'
import MapPin from '@/public/images/map-pin.svg'
import DottedLine from '@/public/images/three-dot-line-v.svg'
import { addressBoxVariants } from './FromToAddress.variants'

export interface FromToAddressProps {
  fromAddress?: string
  toAddress?: string
  backgroundColor?: string
  borderRadius?: string
  textColor?: string
  hideToAddress?: boolean
  padding?: string
}
export const FromToAddress = ({ fromAddress, toAddress, backgroundColor, borderRadius, textColor, padding, hideToAddress = false }: FromToAddressProps) => {
  const addressBoxClasses = clsx(addressBoxVariants(), padding && `p-[${padding}]`)

  const addressBoxStyle = {
    ...(backgroundColor && { backgroundColor }),
    ...(borderRadius && { borderRadius }),
    ...(textColor && { color: textColor }),
  }

  return (
    <div data-testid="displayAddress" className={addressBoxClasses} style={addressBoxStyle}>
      <div className="flex flex-col items-center mr-3">
        <div className="w-6 h-6 flex items-center justify-center">
          <MapPin />
        </div>
        {hideToAddress ? null : (
          <>
            <div className="flex items-center justify-center my-1">
              <DottedLine />
            </div>
            <div className="w-6 h-6 flex items-center justify-center">
              <MapPin />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col flex-1 gap-2">
        <div className="text-sm font-medium text-gray-700">{fromAddress}</div>
        {hideToAddress ? null : <div className="text-sm font-medium text-gray-700">{toAddress}</div>}
      </div>
    </div>
  )
}
