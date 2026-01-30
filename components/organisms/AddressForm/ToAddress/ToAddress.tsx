import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { BaseToAddress, BaseToAddressFormValues } from '@/components/organisms/AddressForm'
import ArrowForward from '@/components/atoms/ArrowForward'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import { UpdatedMoveValues } from '@/templates/Moveclean/types'

interface ToAddressProps {
  onClose?: () => void
  currentlyActiveStep?: number
  lastStep?: number
  nextStep?: (currentStep: number) => void
  withButtons?: boolean
  setData?: (data: UpdatedMoveValues) => void
  moveData?: UpdatedMoveValues
  withoutPadding?: boolean
  withNoHeightOnAddress?: boolean
  setMissingStreetNumberError?: (error: boolean) => void
  buttonClassName?: string
}

export const ToAddress = ({
  onClose,
  currentlyActiveStep,
  lastStep,
  nextStep,
  withButtons,
  setData,
  moveData,
  withoutPadding,
  withNoHeightOnAddress,
  setMissingStreetNumberError,
  buttonClassName = 'w-[48%] h-12 mt-[10px]',
}: ToAddressProps) => {
  const { t } = useTranslation(['error', 'common'])
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const { theme } = useThemeContext()
  const {
    updateCurrentToAddress,
    user: { currentMove },
  } = useUserContext()

  const handleSubmit = async (data: BaseToAddressFormValues) => {
    await updateCurrentToAddress({
      street: `${data?.street} ${data?.streetNumber}`.trim(),
      apartmentNumber: currentMove.toAddress?.apartmentNumber,
      city: data.city,
      zip: data.zip.toString(),
      apartmentType: currentMove?.apartmentType,
      residenceSize: currentMove?.residenceSize,
      residenceType: currentMove?.residenceType,
    })

    if (nextStep && currentlyActiveStep) {
      nextStep(currentlyActiveStep)
    }
  }

  const handleDataChange = useCallback(
    (address: { street: string; city: string; zip: string }) => {
      if (setData && moveData) {
        // Only update if values have changed to avoid infinite loops
        if (address.city !== moveData?.toAddress?.city || address.street !== moveData?.toAddress?.street || address.zip !== moveData.toAddress.zip) {
          setData({
            ...moveData,
            toAddress: address,
          })
        }
      }
    },
    [setData, moveData],
  )

  return (
    <BaseToAddress
      initialValues={{
        autoCompleteAddress: moveData?.toAddress?.street || currentMove?.toAddress?.street || '',
        street: moveData?.toAddress?.street || currentMove?.toAddress?.street,
        zip: moveData?.toAddress?.zip || currentMove?.toAddress?.zip,
        city: moveData?.toAddress?.city || currentMove?.toAddress?.city,
      }}
      onSubmit={handleSubmit}
      onDataChange={setData ? handleDataChange : undefined}
      onValidationChange={(isValid) => setIsButtonDisabled(!isValid)}
      withoutPadding={withoutPadding}
      withNoHeightOnAddress={withNoHeightOnAddress}
      setMissingStreetNumberError={setMissingStreetNumberError}
    >
      {withButtons && !!currentlyActiveStep && !!lastStep && (
        <Flex direction="row" justifyContent="space-between" alignItems="center">
          <div className={buttonClassName}>
            <Button
              text={t('common:INFOMISSING.close')}
              withFullWidth
              type="reset"
              variant={theme === ThemeEnum.FASTIGHETSBYRAN ? 'fb' : 'outline'}
              onClick={() => onClose && onClose()}
            />
          </div>
          <div className={buttonClassName}>
            <Button
              disabled={isButtonDisabled}
              type="submit"
              withFullWidth
              text={currentlyActiveStep < lastStep ? t('common:INFOMISSING.next') : t('common:INFOMISSING.save')}
              iconRight={currentlyActiveStep < lastStep ? <ArrowForward color="currentColor" /> : null}
            />
          </div>
        </Flex>
      )}
    </BaseToAddress>
  )
}
