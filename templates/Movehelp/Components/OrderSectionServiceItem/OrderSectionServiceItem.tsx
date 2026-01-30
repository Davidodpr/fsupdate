import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import formatDate from '@/appComponents/format'
import { useUserContext } from '@/common/context/user/UserProvider'
import { MoveService } from '@/common/enums/MoveServicesEnum'
import { MoveServiceOrder } from '@/common/enums/MoveServicesEnum'
import useResponsive from '@/common/hooks/useResponsive'
import { ActivityEnum } from '@/common/types/activity'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Popup from '@/components/atoms/Popup'
import Text from '@/components/atoms/Text'
import Check from '@/public/images/Checkmark.svg'
import PencilSimple from '@/public/images/PencilSimple.svg'
import QuestionIcon from '@/public/images/Question_green.svg'
import MovecleanImage from '@/public/images/movehelpAndMovecleanAndPackage_moveclean.svg'
import MovehelpImage from '@/public/images/movehelpAndMovecleanAndPackage_movehelp.svg'
import PackageImage from '@/public/images/movehelpAndMovecleanAndPackage_packaging.svg'
import { ServiceType } from '../../types'
import { UpdatedMoveValues } from '../../types'
import { FromAddress } from '@/components/organisms/AddressForm'
import { FromResidenceSizeInput } from '../DataSections/FromResidenceSize/FromResidenceSize'
import { MovingDate } from '../DataSections/MovingDate/MovingDate'
import { ToAddress } from '@/components/organisms/AddressForm'
import {
  itemVariants,
  topSectionVariants,
  textSectionVariants,
  textSectionWrapperVariants,
  boldTextVariants,
  largerTextVariants,
  alwaysIncludedTextSectionVariants,
  textWrapperVariants,
  penWrapperVariants,
  buttonWrapperVariants,
} from './OrderSectionServiceItem.variants'

interface ServiceItemProps {
  price?: string
  service: ServiceType | 'alwaysIncluded'
  fromAddress?: string
  toAddress?: string
  residenceSize?: string | null
  date?: Date
  additionalSpace?: string
  popupText?: React.ReactNode
  setDatePicked?: (value: Date) => void
}

const OrderSectionServiceItem = ({ price, popupText, service, fromAddress, toAddress, residenceSize, date, additionalSpace, setDatePicked }: ServiceItemProps) => {
  const { isTabletPortraitOrGreater } = useResponsive()
  const { t } = useTranslation(['moveServicesDynamicPricePerHour', 'common'])
  const isService = service !== 'alwaysIncluded' && service !== MoveService.PACKAGING
  const [showInputs, setShowInputs] = React.useState(false)
  const {
    user: { hasFetchedData, currentMove },
    updateCurrentMoveData,
  } = useUserContext()

  const [data, setData] = React.useState<UpdatedMoveValues>({
    sqm: null,
    additionalSpace: null,
    toAddress: { street: '', zip: '', city: '' },
    fromAddress: { street: '', zip: '', city: '' },
  })

  useEffect(() => {
    hasFetchedData &&
      setData({
        sqm: currentMove.fromResidenceSize,
        additionalSpace: currentMove?.fromAddress?.additionalSpace?.toString() ?? '',
        toAddress: {
          street: currentMove.toAddress?.street,
          zip: currentMove.toAddress?.zip,
          city: currentMove.toAddress?.city,
        },
        fromAddress: {
          street: currentMove.fromAddress?.street,
          zip: currentMove.fromAddress?.zip,
          city: currentMove.fromAddress?.city,
        },
      })
  }, [hasFetchedData, currentMove])

  const getImage = (serviceProp: ServiceType) => {
    if (serviceProp === MoveService.MOVEHELP) return <MovehelpImage />
    if (serviceProp === MoveService.MOVECLEAN) return <MovecleanImage />
    if (serviceProp === MoveService.PACKAGING) return <PackageImage />
  }

  const isAlwaysIncluded = ![MoveService.MOVEHELP, MoveService.MOVECLEAN, MoveService.PACKAGING].includes(service)

  return (
    <div className={itemVariants({ noMarginBottom: isAlwaysIncluded })}>
      <div className={topSectionVariants({ paddingBottom: true })}>
        <Flex justifyContent="center" alignItems="center" style={{ height: 24 }}>
          {!isAlwaysIncluded && getImage(service)}
          <Text variant="larger" spacing="none" style={{ paddingLeft: `${isAlwaysIncluded ? '0' : '10px'}` }}>
            {t(`ORDERSUMMARY.${service}`)}
          </Text>
        </Flex>
        {!isAlwaysIncluded && (
          <Flex direction={'row'} justifyContent="center" alignItems="end">
            <Flex justifyContent="center" alignItems="center" style={{ height: 24 }}>
              <Text spacing="none" style={{ paddingRight: isTabletPortraitOrGreater ? 8 : 4 }} variant="larger">
                {price}
              </Text>
            </Flex>
            <Popup withFluidWidth text={<div className={textWrapperVariants()}>{popupText}</div>}>
              <QuestionIcon style={{ marginBottom: 2 }} color="var(--fs-colors-questionIconColor)" alt="question icon" width={24} height={24} />
            </Popup>
          </Flex>
        )}
      </div>
      <div className={textSectionWrapperVariants()}>
        {isService && (
          <div className={penWrapperVariants()} onClick={() => setShowInputs(!showInputs)}>
            <PencilSimple />
          </div>
        )}
        {fromAddress && (
          <>
            {showInputs ? (
              <>
                <Text variant="larger" spacing="none" className={boldTextVariants()}>
                  {service === ActivityEnum.MOVECLEAN ? t('common:COMMONADDRESS.address') : t('common:from')}
                </Text>
                <FromAddress setData={setData} moveData={data} />
              </>
            ) : (
              <div className={textSectionVariants()}>
                <Text variant="larger" spacing="none" className={boldTextVariants()}>
                  {service === ActivityEnum.MOVECLEAN ? t('common:COMMONADDRESS.address') : t('common:from')}
                </Text>
                <Text variant="larger" spacing="none" className={largerTextVariants()}>
                  {fromAddress}
                </Text>
              </div>
            )}
          </>
        )}
        {residenceSize && (
          <>
            {showInputs ? (
              <>
                <Text variant="larger" style={{ marginBottom: 16 }} spacing="none" className={boldTextVariants()}>
                  {t('common:area')}
                </Text>
                <FromResidenceSizeInput setData={setData} moveData={data} />
              </>
            ) : (
              <div className={textSectionVariants()}>
                <Text variant="larger" spacing="none" className={boldTextVariants()}>
                  {t('common:area')}
                </Text>
                <Text variant="larger" spacing="none" className={largerTextVariants()}>
                  {residenceSize}
                </Text>
              </div>
            )}
          </>
        )}
        {additionalSpace && !showInputs && (
          <div className={textSectionVariants()}>
            <Text variant="larger" spacing="none" className={boldTextVariants()}>
              {t('common:additionalSpace')}
            </Text>
            <Text variant="larger" spacing="none" className={largerTextVariants()}>
              {additionalSpace}
            </Text>
          </div>
        )}
        {toAddress && (
          <>
            {showInputs ? (
              <>
                <Text variant="larger" spacing="none" className={boldTextVariants()}>
                  {t('common:to')}
                </Text>
                <ToAddress setData={setData} moveData={data} />
              </>
            ) : (
              <div className={textSectionVariants()}>
                <Text variant="larger" spacing="none" className={boldTextVariants()}>
                  {t('common:to')}
                </Text>
                <Text variant="larger" spacing="none" className={largerTextVariants()}>
                  {toAddress}
                </Text>
              </div>
            )}
          </>
        )}
        {date && (
          <>
            {showInputs ? (
              <>
                <Text variant="larger" spacing="none" className={boldTextVariants()}>
                  {t('common:capitalDate')}
                </Text>
                <MovingDate defaultDate={date} setDatePicked={setDatePicked} />
              </>
            ) : (
              <div className={textSectionVariants({ noPadding: true })}>
                <Text variant="larger" spacing="none" className={boldTextVariants()}>
                  {t('common:capitalDate')}
                </Text>
                <Text variant="larger" spacing="none" className={largerTextVariants()}>
                  {formatDate(date, 'yyyy-MM-dd')}
                </Text>
              </div>
            )}
          </>
        )}
        {showInputs && (
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <div className={buttonWrapperVariants()}>
              <Button
                type="submit"
                text={t('common:INFOMISSING.save')}
                onClick={async () => {
                  await updateCurrentMoveData(data)
                  setShowInputs(false)
                }}
              />
            </div>
          </Flex>
        )}
        {service === MoveServiceOrder.PACKAGING && (
          <div className={textSectionVariants()}>
            <Text variant="larger" spacing="none" className={largerTextVariants()}>
              {t('packingOrderSummaryText')}
            </Text>
          </div>
        )}
        {isAlwaysIncluded && (
          <>
            <div className={alwaysIncludedTextSectionVariants()}>
              <Check color="red" />
              <Text variant="larger" spacing="none" className={boldTextVariants()}>
                {t('ORDERSUMMARY.happyCustomerGarantee')}
              </Text>
            </div>
            <div className={alwaysIncludedTextSectionVariants()}>
              <Check />
              <Text variant="larger" spacing="none" className={boldTextVariants()}>
                {t('ORDERSUMMARY.qualityAssurance')}
              </Text>
            </div>
            <div className={alwaysIncludedTextSectionVariants()}>
              <Check />
              <Text variant="larger" spacing="none" className={boldTextVariants()}>
                {t('ORDERSUMMARY.accessToMovingExpert')}
              </Text>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderSectionServiceItem
