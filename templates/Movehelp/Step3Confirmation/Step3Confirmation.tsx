import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useNextBestAction from 'hooks/nextBestAction'
import { Order } from '@/common/api/book'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ShortLocale } from '@/common/enums/LocaleEnum'
import { MoveServiceOrder } from '@/common/enums/MoveServicesEnum'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { formatDate } from '@/common/utils/text'
import Flex from '@/components/atoms/Flex'
import LabelAndDescription from '@/components/atoms/LabelAndDescription'
import MoveHelpCleanSuccessPage from '@/components/organisms/SuccessPageNew'
import { containerVariants, mainWrapperVariants } from './Step3Confirmation.variants'

interface Step4ConfirmationProps {
  bookedOrder: Order
}

const Step3Confirmation = ({ bookedOrder }: Step4ConfirmationProps) => {
  const { theme } = useThemeContext()
  const { nextBestAction } = useNextBestAction()
  const {
    user: { profile: { pno } = {} },
  } = useUserContext()
  const { t, i18n } = useTranslation(['moveclean', 'common'])
  const locale = i18n.language

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const getServices = () => {
    const services: string[] = []
    bookedOrder.products.forEach((product) => {
      if (!!product?.service && product?.service !== MoveServiceOrder.DISCOUNT) {
        if (product?.service === MoveServiceOrder.MOVING) {
          services.push(t('ORDERSUMMARY.movehelp'))
        }
        if (product?.service === MoveServiceOrder.CLEANING) {
          services.push(t('CONFIRMATION.moveclean'))
        }
        if (product?.service === MoveServiceOrder.PACKAGING) {
          services.push(t('ORDERSUMMARY.packaging'))
        }
      }
    })
    return services.toString().replaceAll(',', ', ')
  }

  const movehelpProduct = bookedOrder.products.find((product) => product.service === MoveServiceOrder.MOVING)
  const movecleanProduct = bookedOrder.products.find((product) => product.service === MoveServiceOrder.CLEANING)
  const packagingProduct = bookedOrder.products.find((product) => product.service === MoveServiceOrder.PACKAGING)
  const discountProduct = bookedOrder.products.find((product) => product.service === MoveServiceOrder.DISCOUNT)

  return (
    <div className={containerVariants()} style={{ minHeight: '100vh' }} data-testid="moveHelpContainer">
      <Flex style={{ padding: '0 0 30px', display: 'flex', flexDirection: 'column' }} justifyContent="center">
        <MoveHelpCleanSuccessPage
          isLoggedIn={!!pno}
          moreInfo={t('CONFIRMATION.orderMailText')}
          subtitle={t('CONFIRMATION.receivedOrder')}
          title={t('CONFIRMATION.confirmationHeader')}
          buttonText={t('CONFIRMATION.toMovepage')}
          titleSpecial={t('CONFIRMATION.movingCompany')}
          nextBestAction={nextBestAction}
          customCtaText={theme === ThemeEnum.FASTIGHETSBYRAN ? t('common:customCtaText') : undefined}
        >
          <Flex justifyContent="space-between" direction="column" className={mainWrapperVariants()}>
            <LabelAndDescription title={t('CONFIRMATION.service')} description={getServices()} />
            {movehelpProduct?.id && movehelpProduct?.deliveryDate && (
              <LabelAndDescription title={t('CONFIRMATION.movehelpDate')} description={formatDate(movehelpProduct?.deliveryDate, locale as ShortLocale)} />
            )}
            {movehelpProduct?.id && <LabelAndDescription title={t('common:priceAfterMovehelp')} description={`${Math.round(movehelpProduct.price)} ${t('common:priceUnit')}`} />}
            {movecleanProduct?.id && movecleanProduct?.deliveryDate && (
              <LabelAndDescription title={t('CONFIRMATION.movecleanDate')} description={formatDate(movecleanProduct?.deliveryDate, locale as ShortLocale)} />
            )}
            {movecleanProduct?.id && <LabelAndDescription title={t('common:priceAfterMoveclean')} description={`${Math.round(movecleanProduct.price)} ${t('common:priceUnit')}`} />}
            <LabelAndDescription title={t('CONFIRMATION.soldBy')} description={t('CONFIRMATION.flyttsmart')} />
            <LabelAndDescription title={t('CONFIRMATION.deliveredBy')} description={bookedOrder?.supplierName} />
            {packagingProduct?.id && <LabelAndDescription title={t('common:priceAfterPackaging')} description={`${Math.round(packagingProduct.price)} ${t('common:priceUnit')}`} />}
            {discountProduct?.id && <LabelAndDescription title={t('common:combinedDiscount')} description={`- ${Math.round(discountProduct.price)} ${t('common:priceUnit')}`} />}
          </Flex>
        </MoveHelpCleanSuccessPage>
      </Flex>
    </div>
  )
}

export default Step3Confirmation
