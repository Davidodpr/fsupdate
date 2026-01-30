import Text from '@/components/atoms/Text'
import { sellingPointItemVariants, textWrapperVariants, type SellingPointItemVariants } from './SellingPointItem.variants'

interface SellingPointItemProps extends SellingPointItemVariants {
  icon: React.ReactNode
  text: string
  lessFontSize?: boolean
}

const SellingPointItem = ({ icon, text, withMoreWidth, withBlueColor }: SellingPointItemProps) => {
  return (
    <div className={sellingPointItemVariants({ withMoreWidth, withBlueColor })}>
      <div>{icon}</div>
      <div className={textWrapperVariants()}>
        <Text className="text-component max-w-[120px]" spacing="none">
          {text}
        </Text>
      </div>
    </div>
  )
}

export default SellingPointItem
