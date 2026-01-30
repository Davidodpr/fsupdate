import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { format } from 'date-fns'
import { enGB, sv } from 'date-fns/locale'
import Image from 'next/image'
import { ChecklistCardItem, ChecklistItem } from 'types/checklist'
import { PowerOrderProduct } from 'types/orders'
import { TodoActivityType, TodoCard } from 'types/todo'
import { TodoItemType } from '@/common/api/todo'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ShortLocale } from '@/common/enums/LocaleEnum'
import { ActivityEnum } from '@/common/types/activity'
import Flex from '@/components/atoms/Flex'
import H3 from '@/components/atoms/H3'
import Text from '@/components/atoms/Text'
import { ORDER_SERVICE_CLEANING, ORDER_SERVICE_MOVING, ORDER_TYPE_MOVE_SERVICE } from '@/constants/order'
import { IconsUrls, THEME_ASSETS } from '@/constants/themeAssets'
import Chevron from '@/public/images/Chevron.svg'
import Checkmark from '@/public/images/FAS-module-checkmark.svg'

export type CompletedChecklistItemsProps = {
  item: ChecklistItem
  todoItems: TodoCard[]
  checklistItems: ChecklistCardItem[]
  counter: number
  setCounter: (counter: number) => void
}

export interface ActivityDescriptionProps {
  title?: string | null
  description?: string | React.ReactNode
}

const ActivityDescription = ({ title, description }: ActivityDescriptionProps) => {
  return (
    <Flex direction="row" justifyContent="space-between" alignItems="start">
      <Text className="!text-right" variant="bodyBold" spacing="bottom">
        {title ?? ''}
      </Text>
      <Text className="!text-right" variant="body" spacing="bottom">
        {description ?? ''}
      </Text>
    </Flex>
  )
}

const CompletedChecklistItems = ({ item, todoItems, checklistItems, counter, setCounter }: CompletedChecklistItemsProps) => {
  const [isChevronOpen, setIsChevronOpen] = useState(false)

  const { theme } = useThemeContext()
  const { t, i18n } = useTranslation(['common', 'movePage', 'activitiesModule', 'checklistItems'])
  const locale = i18n.language
  const orderProduct = item?.orders && item?.orders?.[0]?.products ? item?.orders?.[0]?.products?.[0] : ([] as unknown as PowerOrderProduct)
  const orderIsPricePerHour = item?.orders && item?.orders?.[0]?.products && item?.orders?.[0].products?.[0].unitsType === 'hourly'
  const startDateText = item.type === ActivityEnum.INTERNET || item.type === ActivityEnum.POWER ? t('activitiesModule:starts') : t('activitiesModule:preformed')
  const tItem = checklistItems.find((x) => x.name === item.type) || todoItems.find((x) => x.name === item.type)

  /**
   * In order for the iFrame to resize correctly, we need to send the height of the wrapper of the module and then whenever the
   * card is expanded or collapsed, we also send the updated height with a postMessage so the
   * iframe can resize accordingly.
   */
  useEffect(() => {
    if (isChevronOpen) {
      setCounter((counter += 1))
    } else {
      setCounter((counter += 1))
    }
  }, [isChevronOpen])

  const stringToDate = (value: string) => {
    return new Date(value)?.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' }) ?? value
  }

  const isAdvancedServiceState = (toBeDetermined: TodoActivityType | ChecklistItem | TodoItemType | AdvancedServiceState): toBeDetermined is AdvancedServiceState => {
    if ((toBeDetermined as AdvancedServiceState)?.contractData || (toBeDetermined as ChecklistItem)?.orders) {
      return true
    }
    return false
  }

  const chosenAddons = [
    ...(isAdvancedServiceState(item) &&
    item?.orders &&
    item?.orders[0]?.type === ORDER_TYPE_MOVE_SERVICE &&
    'wantsStorage' in item.orders[0].meta &&
    item.orders[0].meta.wantsStorage
      ? [t('activitiesModule:ADDON_SERVICES.storage')]
      : []),
    ...(isAdvancedServiceState(item) &&
    item?.orders &&
    item?.orders[0]?.type === ORDER_TYPE_MOVE_SERVICE &&
    'wantsPackaging' in item.orders[0].meta &&
    item.orders[0].meta.wantsPackaging
      ? [t('activitiesModule:ADDON_SERVICES.packaging')]
      : []),
    ...(isAdvancedServiceState(item) &&
    item?.orders &&
    item?.orders[0]?.type === ORDER_TYPE_MOVE_SERVICE &&
    'wantsHandyman' in item.orders[0].meta &&
    item.orders[0].meta.wantsHandyman
      ? [t('activitiesModule:ADDON_SERVICES.handyman')]
      : []),
  ]

  if (!item?.orders?.length) {
    return null
  }

  return (
    <div className={clsx('bg-[var(--color-white-main)] p-6 pb-4 rounded-[var(--border-radius-medium)] w-full md:w-[45%]', isChevronOpen && 'open')}>
      <Flex direction="row" justifyContent="space-between" alignItems="center">
        <Flex direction="row" justifyContent="start" alignItems="center">
          <div className="bg-[var(--color-activity-icon-background)] w-14 h-14 rounded-full">
            {!!theme && <Image src={`${THEME_ASSETS?.[theme]?.[item.type.toUpperCase() as keyof IconsUrls]}`} alt="test" width={56} height={56} />}
          </div>
          <Flex className="ml-4" direction="column" justifyContent="start" alignItems="start">
            <H3
              className="cursor-pointer font-[var(--fs-fonts-secondary)] text-[var(--fs-fontSizes-2)]"
              onClick={() => {
                setIsChevronOpen(!isChevronOpen)
              }}
            >
              {tItem?.title}
            </H3>
            {item?.orders && item.orders?.[0]?.orderDate && (
              <Text className="m-0 p-0 text-[var(--color-order-date-text)]">
                {startDateText} {format(new Date(orderProduct?.deliveryDate as string), 'd MMMM yyyy', { locale: locale === ShortLocale.SV ? sv : enGB })}
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex direction="row" alignItems="center">
          <Checkmark className="w-10 h-10 mr-[var(--space-2)] hidden md:block" />
          <Chevron className={clsx('cursor-pointer w-[30px] h-[30px]', isChevronOpen && 'scale-y-[-1]')} onClick={() => setIsChevronOpen(!isChevronOpen)} />
        </Flex>
      </Flex>

      {isChevronOpen && item.orders && (
        <div className={clsx('mt-4', isChevronOpen ? 'block' : 'hidden')}>
          <div className="ml-0 md:ml-[72px] md:mb-6 [&_p]:my-[2px] [&_p]:p-0 [&_p]:w-[49%] [&_p,&_b]:text-[var(--fs-fontSizes-3)]">
            {item?.type === ActivityEnum.MOVEHELP && item.orders && (
              <>
                <ActivityDescription title={t('bookingDate')} description={stringToDate(item?.orders[0]?.orderDate as string)} />
                <ActivityDescription title={t('executionDate')} description={stringToDate(orderProduct?.deliveryDate as string)} />
                <ActivityDescription
                  title={t('additionalServices')}
                  description={
                    chosenAddons?.length > 0
                      ? chosenAddons.join(', ')
                      : item?.orders[0] && item?.orders[0]?.products
                        ? item?.orders[0]?.products
                            .map((product) => product.description)
                            .slice(1)
                            .join(', ')
                        : t('no')
                  }
                />
                <ActivityDescription title={t('supplier')} description={item?.orders[0]?.supplierName} />
                <ActivityDescription
                  title={orderIsPricePerHour ? t('priceAfterMovehelp') : t('priceAfter')}
                  description={`${orderIsPricePerHour ? item?.orders?.[0]?.products?.[0]?.price : item?.orders[0]?.totalPrice} ${
                    orderIsPricePerHour ? t('hourlyPriceUnit') : t('priceUnit')
                  }`}
                />
              </>
            )}
            {item?.type === ActivityEnum.MOVECLEAN && isAdvancedServiceState(item) && item.orders && (
              <>
                <ActivityDescription title={t('bookingDate')} description={stringToDate(item?.orders[0]?.orderDate as string)} />
                <ActivityDescription title={t('executionDate')} description={stringToDate(orderProduct?.deliveryDate as string)} />
                <ActivityDescription title={t('supplier')} description={item?.orders[0]?.supplierName} />
                <ActivityDescription title={t('priceAfter')} description={`${item?.orders[0]?.totalPrice} kr`} />
              </>
            )}
            {item?.type === ActivityEnum.SHOWCLEANING && isAdvancedServiceState(item) && item.orders && (
              <>
                <ActivityDescription title={t('bookingDate')} description={stringToDate(item?.orders[0]?.orderDate as string)} />
                <ActivityDescription title={t('executionDate')} description={stringToDate(orderProduct?.deliveryDate as string)} />
                <ActivityDescription title={t('supplier')} description={item?.orders[0]?.supplierName} />
                <ActivityDescription title={t('priceAfter')} description={`${item?.orders[0]?.totalPrice} kr`} />
              </>
            )}
            {item?.type === ActivityEnum.INTERNET && isAdvancedServiceState(item) && item.orders && (
              <>
                <ActivityDescription title={t('startDateOfAgreement')} description={stringToDate(orderProduct?.deliveryDate as string)} />
                <ActivityDescription title={t('supplier')} description={item?.orders[0]?.supplierName} />
                <ActivityDescription title={t('subscription')} description={orderProduct?.description?.replace(/-/g, ' ') as string} />
              </>
            )}
            {item?.type === ActivityEnum.POWER && (
              <>
                <ActivityDescription title={t('startDateOfAgreement')} description={stringToDate(orderProduct?.deliveryDate as string)} />
                <ActivityDescription title={t('electricityContract')} description={orderProduct?.description as string} />
                {orderProduct?.meta && 'discountPeriod' in orderProduct.meta && orderProduct.meta.discountPeriod && Number(orderProduct.meta.discountPeriod) !== 0 && (
                  <ActivityDescription title={t('discountPeriod')} description={`${orderProduct.meta.discountPeriod} ${t('months')}`} />
                )}
                {item.orders[0].meta && 'endDate' in item.orders[0].meta && item.orders[0].meta.endDate && (
                  <ActivityDescription
                    title={t('endDateOfCurrentAgreement')}
                    description={format(new Date(item.orders[0].meta.endDate), 'd MMMM yyyy', { locale: locale === ShortLocale.SV ? sv : enGB })}
                  />
                )}
              </>
            )}
            {item?.type === ActivityEnum.MOVEHELP_COMBINED && isAdvancedServiceState(item) && item.orders && item?.orders[0] && item?.orders[0]?.products && (
              <>
                <ActivityDescription title={t('bookingDate')} description={stringToDate(item?.orders[0]?.orderDate as string)} />
                {new Date(item?.orders[0]?.products[0].deliveryDate as string)?.toDateString() === new Date(item?.orders[0]?.products[1].deliveryDate as string)?.toDateString() ? (
                  <ActivityDescription title={t('executionDate')} description={stringToDate(orderProduct?.deliveryDate as string)} />
                ) : (
                  <>
                    {item?.orders[0]?.type === ORDER_TYPE_MOVE_SERVICE && 'products' in item.orders[0] && (
                      <>
                        <ActivityDescription
                          title={t('moveHelpDate')}
                          description={stringToDate(item.orders[0].products.find((product) => product.service === ORDER_SERVICE_MOVING)?.deliveryDate as string)}
                        />
                        <ActivityDescription
                          title={t('moveCleanDate')}
                          description={stringToDate(item.orders[0].products.find((product) => product.service === ORDER_SERVICE_CLEANING)?.deliveryDate as string)}
                        />
                      </>
                    )}
                  </>
                )}

                <ActivityDescription
                  title={t('additionalServices')}
                  description={
                    chosenAddons?.length > 0
                      ? chosenAddons.join(', ')
                      : item?.orders[0]?.type === ORDER_TYPE_MOVE_SERVICE &&
                          'products' in item.orders[0] &&
                          item.orders[0].products.find((product) => product?.service !== ORDER_SERVICE_CLEANING && product?.service !== ORDER_SERVICE_MOVING)
                        ? item.orders[0].products
                            .filter((product) => product?.service !== ORDER_SERVICE_CLEANING && product?.service !== ORDER_SERVICE_MOVING)
                            .map((product) => product.description)
                            .join(', ')
                        : t('no')
                  }
                />
                <ActivityDescription title={t('supplier')} description={item?.orders[0]?.supplierName} />
                <ActivityDescription
                  title={t('priceAfterMovehelp')}
                  description={`${orderIsPricePerHour ? item?.orders[0].products[0].price : item?.orders[0]?.totalPrice} ${
                    orderIsPricePerHour ? t('hourlyPriceUnit') : t('priceUnit')
                  }`}
                />
                <ActivityDescription
                  title={t('priceAfterMoveclean')}
                  description={`${orderIsPricePerHour ? item?.orders[0].products[1].price : item?.orders[1]?.totalPrice} ${t('priceUnit')}`}
                />
              </>
            )}
            {item?.type === ActivityEnum.ADDRESSCHANGE && isAdvancedServiceState(item) && item.orders && (
              <>
                {orderProduct?.meta && 'newAddress' in orderProduct.meta ? (
                  <>
                    <ActivityDescription title={t('moveInDate')} description={stringToDate(orderProduct?.deliveryDate as string)} />
                    <ActivityDescription
                      title={t('newAddress')}
                      description={`${orderProduct.meta.newAddress?.street}, ${orderProduct.meta.newAddress?.zip as string}
                  ${orderProduct.meta.newAddress?.city} ${orderProduct.meta.newAddress?.apartmentNumber as string}`}
                    />
                    <ActivityDescription title={t('receiptNumber')} description={orderProduct.meta.receiptNumber as string} />
                    {orderProduct.meta.isConsentNeeded && (
                      <div className="text-[var(--fs-fontSizes-3)] text-[var(--color-main-font-color)] my-3 [&_p]:text-[var(--fs-fontSizes-1)]">
                        {t('activitiesModule:consentInfo')}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-[var(--fs-fontSizes-3)] text-[var(--color-main-font-color)] my-3 [&_p]:text-[var(--fs-fontSizes-1)]">{t('addresschangeDescription')}</div>
                )}
              </>
            )}
          </div>
          <div className="my-[var(--space-5)] md:ml-[72px] [&_h3]:text-[var(--fs-fontSizes-4)] md:[&_h3]:text-[var(--fs-fontSizes-5)] [&_h3]:font-[var(--fs-fonts-secondary)] [&_h3]:font-bold [&_h3]:mb-0 [&_p]:mt-0 [&_p]:text-[var(--fs-fontSizes-3)]">
            <H3>{t('movePage:CHECKLIST_SECTION.questionsAboutBooking')}</H3>
            <Text variant="body" spacing="top">
              {t('activitiesModule:questionsAboutBookingDescription')} <span style={{ fontWeight: 'var(--fs-fontWeights-semiBold)' }}>{t('activitiesModule:phone')}</span>
              {t('activitiesModule:weHelpYou')}
            </Text>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompletedChecklistItems
