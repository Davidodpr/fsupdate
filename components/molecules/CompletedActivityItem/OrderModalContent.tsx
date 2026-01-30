import React from 'react'
import { useTranslation } from 'react-i18next'
import { Order, PowerOrderProduct } from 'types/orders'
import { TodoItemType } from '@/common/api/todo'
import { MoveServiceOrder } from '@/common/enums/MoveServicesEnum'
import { capitalizeFirstLetter } from '@/common/utils/text'
import Flex from '@/components/atoms/Flex'
import { ActivityEnum } from '@/types/activity'
import { ChecklistItem } from '../../../types/checklist'
import { SupplierServiceTypes } from '../../../types/price'
import { TodoActivityType } from '../../../types/todo'
import { contentContainerVariants, titleVariants, descriptionVariants, additionalDescriptionVariants } from './OrderModalContent.variants'
import { ORDER_TYPE_MOVE_SERVICE } from '@/constants/order'

export interface Props {
  item: TodoActivityType | ChecklistItem | TodoItemType
}

export interface ActivityDescriptionProps {
  title?: string | null
  description?: string | React.ReactNode
}

const ActivityDescription = ({ title, description }: ActivityDescriptionProps) => {
  return (
    <Flex justifyContent={'space-between'}>
      <h3 className={titleVariants()}>{title ?? ''}</h3>
      <p className={descriptionVariants()}>{description ?? ''}</p>
    </Flex>
  )
}

const OrderModalContent = ({ item }: Props) => {
  const activityItem = item as ChecklistItem
  const currentOrder = activityItem?.orders?.[0]
  const { t, i18n } = useTranslation(['common', 'activityModal', 'movePage', 'checklistItems'])
  const locale = i18n.language
  const stringToDate = (value: string) => {
    return new Date(value)?.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }) ?? value
  }

  const isAdvancedServiceState = (toBeDetermined: ChecklistItem | AdvancedServiceState): toBeDetermined is AdvancedServiceState => {
    if ((toBeDetermined as AdvancedServiceState)?.contractData || (toBeDetermined as ChecklistItem)?.orders) {
      return true
    }
    return false
  }

  const chosenAddons = [
    ...(isAdvancedServiceState(activityItem) &&
    activityItem?.orders &&
    activityItem?.orders[0]?.type === ORDER_TYPE_MOVE_SERVICE &&
    'wantsStorage' in activityItem.orders[0].meta &&
    activityItem.orders[0].meta.wantsStorage
      ? [t('activityModal:ADDON_SERVICES.storage')]
      : []),
    ...(isAdvancedServiceState(activityItem) &&
    activityItem?.orders &&
    activityItem?.orders[0]?.type === ORDER_TYPE_MOVE_SERVICE &&
    'wantsPackaging' in activityItem.orders[0].meta &&
    activityItem.orders[0].meta.wantsPackaging
      ? [t('activityModal:ADDON_SERVICES.packaging')]
      : []),
    ...(isAdvancedServiceState(activityItem) &&
    activityItem?.orders &&
    activityItem?.orders[0]?.type === ORDER_TYPE_MOVE_SERVICE &&
    'wantsHandyman' in activityItem.orders[0].meta &&
    activityItem.orders[0].meta.wantsHandyman
      ? [t('activityModal:ADDON_SERVICES.handyman')]
      : []),
  ]

  const orderProduct = currentOrder?.products ? currentOrder?.products[0] : ([] as unknown as PowerOrderProduct)
  const orderIsPricePerHour = orderProduct.unitsType === 'hourly'

  const getProductFromServiceType = (order: Order, service: SupplierServiceTypes) => {
    if (order.type === ORDER_TYPE_MOVE_SERVICE && 'products' in order) {
      return order.products.find((product) => product.service === service)
    }
    return undefined
  }

  const CombinedPriceSection = () =>
    currentOrder?.products?.[0]?.unitsType === 'hourly' ? (
      <>
        <ActivityDescription
          title={`${capitalizeFirstLetter(t('common:price'))} ${t('common:ACTIVITIES.movehelp').toLowerCase()} `}
          description={`${currentOrder?.products?.[0]?.price} ${t('hourlyPriceUnit')}`}
        />
        <ActivityDescription
          title={`${capitalizeFirstLetter(t('common:price'))} ${t('common:ACTIVITIES.movecleaning').toLowerCase()} `}
          description={`${activityItem?.orders?.[0]?.products?.[1]?.price} ${t('hourlyPriceUnit')}`}
        />
        {activityItem?.orders?.[0]?.products?.[2]?.price && (
          <ActivityDescription
            title={`${capitalizeFirstLetter(t('common:price'))} ${t('common:ACTIVITIES.simplePackaging').toLowerCase()} `}
            description={`${activityItem?.orders?.[0]?.products?.[2]?.price} ${t('hourlyPriceUnit')}`}
          />
        )}
        {activityItem?.orders?.[0]?.products?.[3]?.price && (
          <ActivityDescription title={`${t('common:combinedDiscount')} `} description={`- ${activityItem?.orders?.[0]?.products?.[3]?.price} ${t('priceUnit')}`} />
        )}
      </>
    ) : (
      <>
        <ActivityDescription title={t('priceAfter')} description={`${currentOrder?.totalPrice} kr`} />
      </>
    )

  return (
    <div className={contentContainerVariants()}>
      {item?.type === ActivityEnum.POWER && (
        <div>
          <ActivityDescription title={t('startDateOfAgreement')} description={stringToDate(orderProduct?.deliveryDate as string)} />
          <ActivityDescription title={t('electricityContract')} description={orderProduct?.description as string} />
          {orderProduct?.meta && 'discountPeriod' in orderProduct.meta && orderProduct.meta.discountPeriod && (
            <ActivityDescription title={t('discountPeriod')} description={`${orderProduct.meta.discountPeriod} ${t('months')}`} />
          )}
        </div>
      )}
      {item?.type === ActivityEnum.MOVEHELP && activityItem.orders && (
        <div>
          <ActivityDescription title={t('movePage:quotationsRequested')} description={stringToDate(activityItem.skippedAt as string)} />
        </div>
      )}
      {item?.type === ActivityEnum.MOVECLEAN && isAdvancedServiceState(activityItem) && activityItem.orders && (
        <div>
          <ActivityDescription title={t('bookingDate')} description={stringToDate(currentOrder?.orderDate as string)} />
          <ActivityDescription title={t('executionDate')} description={stringToDate(orderProduct?.deliveryDate as string)} />
          <ActivityDescription title={t('supplier')} description={currentOrder?.supplierName} />
          <ActivityDescription
            title={orderIsPricePerHour ? t('priceAfterMovehelp') : t('priceAfter')}
            description={`${orderIsPricePerHour ? orderProduct?.price : currentOrder?.totalPrice} ${orderIsPricePerHour ? t('hourlyPriceUnit') : t('priceUnit')}`}
          />
        </div>
      )}
      {item?.type === ActivityEnum.MOVEHELP_COMBINED && isAdvancedServiceState(activityItem) && activityItem.orders && currentOrder?.products && (
        <div>
          <ActivityDescription title={t('bookingDate')} description={stringToDate(currentOrder?.orderDate as string)} />
          {new Date(currentOrder?.products[0].deliveryDate as string)?.toDateString() === new Date(currentOrder?.products[1].deliveryDate as string)?.toDateString() ? (
            <ActivityDescription title={t('executionDate')} description={stringToDate(orderProduct?.deliveryDate as string)} />
          ) : (
            <>
              <ActivityDescription title={t('moveHelpDate')} description={stringToDate(getProductFromServiceType(currentOrder, MoveServiceOrder.MOVING)?.deliveryDate as string)} />
              <ActivityDescription
                title={t('moveCleanDate')}
                description={stringToDate(getProductFromServiceType(currentOrder, MoveServiceOrder.CLEANING)?.deliveryDate as string)}
              />
            </>
          )}
          <ActivityDescription
            title={t('additionalServices')}
            description={
              chosenAddons?.length > 0
                ? chosenAddons.join(', ')
                : currentOrder?.type === ORDER_TYPE_MOVE_SERVICE &&
                    'products' in currentOrder &&
                    currentOrder.products.find((product) => product?.service !== MoveServiceOrder.CLEANING && product?.service !== MoveServiceOrder.MOVING)
                  ? currentOrder.products
                      .filter(
                        (product) =>
                          product?.service !== MoveServiceOrder.CLEANING && product?.service !== MoveServiceOrder.MOVING && product?.service !== MoveServiceOrder.DISCOUNT,
                      )
                      .map((product) => product.description)
                      .join(', ')
                  : t('no')
            }
          />
          <ActivityDescription title={t('supplier')} description={currentOrder?.supplierName} />
          <CombinedPriceSection />
        </div>
      )}
      {item?.type === ActivityEnum.ADDRESSCHANGE && isAdvancedServiceState(activityItem) && activityItem.orders && (
        <>
          {orderProduct?.meta && 'newAddress' in orderProduct.meta ? (
            <div>
              <ActivityDescription title={t('moveInDate')} description={stringToDate(orderProduct?.deliveryDate as string)} />
              <ActivityDescription
                title={t('newAddress')}
                description={`${orderProduct.meta.newAddress?.street}, ${orderProduct.meta.newAddress?.zip as string}
                ${orderProduct.meta.newAddress?.city} ${orderProduct.meta.newAddress?.apartmentNumber as string}`}
              />
              <ActivityDescription title={t('receiptNumber')} description={orderProduct.meta.receiptNumber as string} />
              {orderProduct.meta.isConsentNeeded && <div className={additionalDescriptionVariants()}>{t('activityModal:consentInfo')}</div>}
            </div>
          ) : (
            <div className={additionalDescriptionVariants()}>{t('addresschangeDescription')}</div>
          )}
        </>
      )}
      {item?.type === ActivityEnum.INSURANCE && (
        <div>
          <Flex justifyContent={'space-between'}>
            <h3 className={titleVariants()}>{t('clearMark')}</h3>
            <p className={descriptionVariants()}>
              {new Date(activityItem?.skippedAt || (item as unknown as TodoActivityType)?.skippedAt || (item as unknown as ChecklistItem)?.hiddenAt || '')?.toLocaleDateString(
                locale,
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                },
              )}
            </p>
          </Flex>
        </div>
      )}

      {item?.type === ActivityEnum.INTERNET && isAdvancedServiceState(activityItem) && activityItem.orders && (
        <div>
          <ActivityDescription title={t('startDateOfAgreement')} description={stringToDate(orderProduct?.deliveryDate as string)} />
          <ActivityDescription title={t('supplier')} description={activityItem?.orders[0]?.supplierName} />
          <ActivityDescription title={t('subscription')} description={orderProduct?.description?.replace(/-/g, ' ') as string} />
        </div>
      )}
    </div>
  )
}

export default OrderModalContent
