import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import formatDate from '@/appComponents/format'
import { useMovecleanContext } from '@/common/context/movecleanProvider/moveclean.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import PencilSimple from '@/public/images/PencilSimple.svg'
import { FromAddress } from '@/components/organisms/AddressForm/FromAddress/FromAddress'
import { FromResidenceSizeInput } from '@/components/organisms/FormFields/FromResidenceSize/FromResidenceSize'
import { MovingDate } from '@/components/organisms/FormFields/MovingDate/MovingDate'
import { UpdatedMoveValues } from '@/templates/Moveclean/types'
import { ContactDetailsForm } from '@/components/molecules/ContactDetailsForm'
import {
  inputSectionWrapperVariants,
  penWrapperVariants,
  buttonWrapperVariants,
  cardTitleVariants,
  cardTitleTextVariants,
  textSectionVariants,
  boldTextVariants,
  largerTextVariants,
} from './BookingDetails.variants'

interface Props {
  formMethods: UseFormReturn<{ phone: string; email: string }>
  formFullWidth?: boolean
  currentDatePicked: Date
  setCurrentDatePicked: (date: Date) => void
  showAddressInput: boolean
  setShowAddressInput: (show: boolean) => void
  showContactInput: boolean
  setShowContactInput: (show: boolean) => void
}

export const BookingDetails = ({
  formMethods,
  formFullWidth,
  currentDatePicked,
  setCurrentDatePicked,
  showAddressInput,
  setShowAddressInput,
  setShowContactInput,
  showContactInput,
}: Props) => {
  const { t } = useTranslation('common')
  const { isTabletPortraitOrGreater } = useResponsive()
  const { fetchAndSetNewPriceForSelectedProvider, selectedProvider } = useMovecleanContext()
  const {
    user: { currentMove },
    user: {
      currentMove: {
        fromResidenceSize,
        fromAddress: { additionalSpace, street, zip, city },
      },
      hasFetchedData,
    },
    updateCurrentMoveData,
  } = useUserContext()

  const [data, setData] = useState<UpdatedMoveValues>({
    sqm: null,
    additionalSpace: null,
    toAddress: { street: '', zip: '', city: '' },
    fromAddress: { street: '', zip: '', city: '' },
  })

  useEffect(() => {
    if (hasFetchedData) {
      setData({
        sqm: fromResidenceSize,
        additionalSpace: additionalSpace ? additionalSpace.toString() : null,
        fromAddress: {
          street: street,
          zip: zip,
          city: city,
        },
      })
    }
  }, [hasFetchedData, fromResidenceSize, additionalSpace, street, zip, city])

  const handleSave = async () => {
    const response = await updateCurrentMoveData(data)
    if (response?.id) {
      if (
        (data?.sqm !== null && data?.sqm !== fromResidenceSize) ||
        (data?.additionalSpace !== null && data?.additionalSpace !== additionalSpace) ||
        `${data?.fromAddress?.street} ${data?.fromAddress?.zip} ${data?.fromAddress?.city}` !== `${street} ${zip} ${city}`
      ) {
        fetchAndSetNewPriceForSelectedProvider()
      }
      setShowAddressInput(false)
    }
  }

  return (
    <>
      <div className={clsx(inputSectionWrapperVariants({ isOpen: showAddressInput }))}>
        <div className={clsx(cardTitleVariants())}>
          <h2 className={clsx(cardTitleTextVariants())}>{t('orderDetails')}</h2>
        </div>

        {!showAddressInput && (
          <div className={clsx(penWrapperVariants())} onClick={() => setShowAddressInput(!showAddressInput)}>
            <PencilSimple />
          </div>
        )}

        <div className={clsx(textSectionVariants())}>
          <Text className={clsx(boldTextVariants())} spacing="none">
            {t('performer')}
          </Text>
          <Text className={clsx(largerTextVariants())} spacing="none">
            {selectedProvider?.displayName}
          </Text>
        </div>

        {currentMove?.fromAddress && (
          <>
            {showAddressInput ? (
              <>
                <Text className={clsx(boldTextVariants())} spacing="none">
                  {t('common:COMMONADDRESS.address')}
                </Text>
                <FromAddress setData={setData} moveData={data} />
              </>
            ) : (
              <div className={clsx(textSectionVariants())}>
                <Text className={clsx(boldTextVariants())} spacing="none">
                  {t('common:COMMONADDRESS.address')}
                </Text>
                <Text className={clsx(largerTextVariants())} spacing="none">
                  {`${currentMove?.fromAddress?.street}, ${currentMove?.fromAddress?.zip} ${currentMove?.fromAddress.city}`}
                </Text>
              </div>
            )}
          </>
        )}

        {fromResidenceSize && (
          <>
            {showAddressInput ? (
              <>
                <Text className={clsx(boldTextVariants(), 'mb-4 mt-0')}>{t('common:area')}</Text>
                <FromResidenceSizeInput setData={setData} moveData={data} />
              </>
            ) : (
              <div className={clsx(textSectionVariants())}>
                <Text className={clsx(boldTextVariants())} spacing="none">
                  {t('common:area')}
                </Text>
                <Text className={clsx(largerTextVariants())} spacing="none">
                  {fromResidenceSize}
                  <span className="pl-1">{t('common:areaUnit')}</span>
                </Text>
              </div>
            )}
          </>
        )}

        {!showAddressInput && (
          <div className={clsx(textSectionVariants())}>
            <Text className={clsx(boldTextVariants())} spacing="none">
              {t('common:additionalSpace')}
            </Text>
            <Text className={clsx(largerTextVariants())} spacing="none">
              {additionalSpace}
              <span className="pl-1">{t('common:areaUnit')}</span>
            </Text>
          </div>
        )}

        {currentDatePicked && (
          <>
            {showAddressInput ? (
              <>
                <Text className={clsx(boldTextVariants(), 'mb-2')} spacing="none">
                  {t('common:capitalDate')}
                </Text>
                <MovingDate defaultDate={currentDatePicked} setDatePicked={setCurrentDatePicked} />
              </>
            ) : (
              <div className={clsx(textSectionVariants({ noPadding: true }))}>
                <Text className={clsx(boldTextVariants())} spacing="none">
                  {t('common:capitalDate')}
                </Text>
                {currentDatePicked && (
                  <Text className={clsx(largerTextVariants())} spacing="none">
                    {formatDate(currentDatePicked, 'dd MMMM yyyy')}
                  </Text>
                )}
              </div>
            )}
          </>
        )}

        {showAddressInput && (
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <div className={clsx(buttonWrapperVariants())}>
              <Button
                type="submit"
                text={t('common:INFOMISSING.save')}
                padding={isTabletPortraitOrGreater ? '12px 68px' : '12px 24px'}
                withFullWidth={isTabletPortraitOrGreater ? false : true}
                onClick={async (event) => {
                  event.preventDefault()
                  await handleSave()
                }}
              />
            </div>
          </Flex>
        )}
      </div>

      <ContactDetailsForm
        formMethods={formMethods}
        formFullWidth={formFullWidth}
        showContactInput={showContactInput}
        setShowContactInput={setShowContactInput}
        buttonPadding={isTabletPortraitOrGreater ? '12px 68px' : '12px 24px'}
        withFullWidth={isTabletPortraitOrGreater ? false : true}
      />
    </>
  )
}
