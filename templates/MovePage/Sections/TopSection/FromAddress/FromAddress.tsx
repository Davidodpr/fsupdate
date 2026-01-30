import React from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useUserContext } from '@/common/context/user/UserProvider'
import { BaseFromAddress, BaseFromAddressFormValues } from '@/components/organisms/AddressForm'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Flex from '@/components/atoms/Flex'
import Popup from '@/components/molecules/PopupNew'
import InfoIcon from '@/public/images/Question_green.svg'
import { fromAddressWrapperVariants, buttonWrapperVariants, sqmVariants, inputsWrapperVariants, questionIconWrapperVariants, popupWrapperVariants } from './FromAddress.variants'

export type FromAddressProps = {
  setAccordionValue: (arg0: string) => void
}

const FromAddress = ({ setAccordionValue }: FromAddressProps) => {
  const { t } = useTranslation(['common', 'error'])
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { updateCurrentFromAddress } = useUserContext()

  const handleSubmit = async (data: BaseFromAddressFormValues) => {
    await updateCurrentFromAddress(
      {
        street: `${data.street || ''} ${data.streetNumber || ''}`.trim(),
        city: data.city,
        zip: data.zip,
        additionalSpace: Number(data?.additionalSpace) ?? null,
      },
      Number(data.sqm) || null,
    )
    setAccordionValue('')
  }

  return (
    <div data-testid="from-address-container">
      <BaseFromAddress withResidenceSize withAdditionalSpace onSubmit={handleSubmit} className={fromAddressWrapperVariants()}>
        {(methods) => {
          const {
            control,
            formState: { errors },
          } = methods

          return (
            <>
              <div className={inputsWrapperVariants()} data-testid="from-address-container">
                <Flex style={{ marginTop: errors?.autoCompleteAddress?.message ? 5 : 0 }}>
                  <div className={sqmVariants()}>
                    <Controller
                      name="sqm"
                      control={control}
                      render={({ field }) => <Input {...field} value={field.value || ''} inputRef={inputRef} error={errors?.sqm?.message} type="text" label={t('sqm') ?? ''} />}
                    />
                  </div>
                  <div className={sqmVariants()}>
                    <Controller
                      name="additionalSpace"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={field.value || ''}
                          endIcon={
                            <div className={questionIconWrapperVariants()}>
                              <Popup withFluidWidth noUnderline text={<div className={popupWrapperVariants()}>{t('additionalSpacePopupText')}</div>}>
                                <InfoIcon />
                              </Popup>
                            </div>
                          }
                          error={errors?.additionalSpace?.message}
                          type="text"
                          label={t('additionalSpace') ?? ''}
                        />
                      )}
                    />
                  </div>
                </Flex>
              </div>
              <div className={buttonWrapperVariants()}>
                <Button padding="8px 52px" text={t('common:INFOMISSING.save')} variant="outline" type="submit" />
              </div>
            </>
          )
        }}
      </BaseFromAddress>
    </div>
  )
}

export default FromAddress
