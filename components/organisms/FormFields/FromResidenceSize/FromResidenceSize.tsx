import { FormProvider, useForm } from 'react-hook-form'
import { useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { Message } from 'yup/lib/types'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import ArrowForward from '@/components/atoms/ArrowForward'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Input from '@/components/atoms/Input'
import Popup from '@/components/molecules/PopupNew'
import InfoIcon from '@/public/images/Question_green.svg'
import { UpdatedMoveValues } from '@/templates/Moveclean/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { buttonWrapperVariants, questionIconWrapperVariants, popupWrapperVariants, inputWrapperVariants } from '../formFields.variants'

interface FormValuesFromAddress {
  sqm: string
  additionalSpace?: string
}

interface FromResidenceSizeProps {
  onClose?: () => void
  currentlyActiveStep?: number
  lastStep?: number
  nextStep?: (currentStep: number) => void
  withButtons?: boolean
  setData?: (data: UpdatedMoveValues) => void
  moveData?: UpdatedMoveValues
  withAdditionalSpace?: boolean
  noMarginBottom?: boolean
  setInternalSqm?: (sqm: number) => void
  isToAddress?: boolean
}

export const FromResidenceSizeInput = ({
  onClose,
  currentlyActiveStep,
  lastStep,
  nextStep,
  withButtons,
  setData,
  moveData,
  withAdditionalSpace = true,
  noMarginBottom,
  setInternalSqm,
  isToAddress = false,
}: FromResidenceSizeProps) => {
  const { t } = useTranslation(['error', 'common'])
  const { theme } = useThemeContext()
  const schema = yup.object({
    sqm: yup
      .number()
      .min(1, t('INFOMISSING.residenceSize') as Message)
      .required(t('INFOMISSING.residenceSize') as Message)
      .typeError(t('INFOMISSING.residenceSize') as Message),
    additionalSpace: yup
      .string()
      .typeError(t('INFOMISSING.residenceSize') as Message)
      .notRequired(),
  })

  const {
    updateCurrentFromAddress,
    user: { currentMove },
  } = useUserContext()

  const methods = useForm<FormValuesFromAddress>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      sqm: !!moveData?.sqm ? moveData?.sqm?.toString() : isToAddress ? currentMove?.residenceSize?.toString() : currentMove.fromResidenceSize?.toString(),
      additionalSpace: !!moveData?.additionalSpace
        ? moveData?.additionalSpace?.toString()
        : isToAddress
          ? currentMove?.additionalSpace?.toString()
          : (currentMove?.fromAddress?.additionalSpace?.toString() ?? ''),
    },
  })
  const {
    register,
    formState: { errors },
  } = methods
  const watchedSqm = useWatch({ name: 'sqm', control: methods.control })

  const onSubmit = methods.handleSubmit((data: FormValuesFromAddress) => {
    if (!!errors?.sqm?.message?.length || !!errors?.additionalSpace?.message?.length) return
    updateCurrentFromAddress(
      {
        street: `${currentMove?.fromAddress.street || ''}`.trim(),
        city: currentMove?.fromAddress.city,
        zip: currentMove?.fromAddress.zip,
        additionalSpace: Number(data?.additionalSpace) ?? null,
      },
      Number(data.sqm) ? Number(data.sqm) : null,
    )
    nextStep && currentlyActiveStep && nextStep(currentlyActiveStep)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <Flex justifyContent="space-between" style={{ marginBottom: withButtons ? 60 : noMarginBottom ? 0 : 26, width: '100%' }}>
          <div className={inputWrapperVariants({ fullWidth: withAdditionalSpace === false })}>
            <Input
              label={t('common:INFOMISSING.fromResidenceSize')}
              onWheel={(e) => e.currentTarget?.blur()}
              type="number"
              {...register('sqm')}
              onChange={(e) => {
                const value = e.target.value
                const updatedData = { ...moveData, sqm: value ? Number(value) : null, additionalSpace: moveData?.additionalSpace ?? null }
                setData && setData(updatedData)
                setInternalSqm && setInternalSqm(value ? Number(value) : 0)
                // Call the register onChange too to update form state
                methods.setValue('sqm', value)
              }}
            />
          </div>
          {withAdditionalSpace && (
            <div className={inputWrapperVariants()}>
              <Input
                endIcon={
                  <div className={questionIconWrapperVariants()}>
                    <Popup withFluidWidth noUnderline text={<div className={popupWrapperVariants()}>{t('common:additionalSpacePopupText')}</div>}>
                      <InfoIcon />
                    </Popup>
                  </div>
                }
                type="text"
                onWheel={(e) => e.currentTarget?.blur()}
                label={t('common:INFOMISSING.additionalSpace') ?? ''}
                {...register('additionalSpace')}
                onChange={(e) => {
                  const value = e.target.value
                  setData && setData({ ...moveData, sqm: moveData?.sqm ?? null, additionalSpace: value ?? null })
                  methods.setValue('additionalSpace', value)
                }}
              />
            </div>
          )}
        </Flex>
        {withButtons && !!currentlyActiveStep && !!lastStep && (
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <div className={buttonWrapperVariants()}>
              <Button
                text={t('common:INFOMISSING.close')}
                type="reset"
                withFullWidth
                variant={theme === ThemeEnum.FASTIGHETSBYRAN ? 'fb' : 'outline'}
                onClick={() => onClose && onClose()}
              />
            </div>
            <div className={buttonWrapperVariants()}>
              <Button
                type="submit"
                withFullWidth
                disabled={watchedSqm === '' || !Number(watchedSqm)}
                text={currentlyActiveStep < lastStep ? t('common:INFOMISSING.next') : t('common:INFOMISSING.save')}
                iconRight={currentlyActiveStep < lastStep ? <ArrowForward color="currentColor" /> : null}
                onClick={() => {
                  onSubmit()
                }}
              />
            </div>
          </Flex>
        )}
      </form>
    </FormProvider>
  )
}
