'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { createConversation } from '@/common/api/conversation'
import { useUserContext } from '@/common/context/user/UserProvider'
import BackToMovepageButton, { GoBackTopWrapper, GoBackToTopInnerWrapper } from '@/components/atoms/BackToMovepageButton/BackToMovepageButton'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import TextArea from '@/components/atoms/TextArea'
import BirdSuccess from '@/public/images/Bird_success.svg'
import TopSection from './Components/TopSection/TopSection'

type FixaRenoveraFormValues = {
  description: string
  email: string
  phone: string
  when: string
}

export const FixaRenoveraPage = () => {
  const { t } = useTranslation(['fixaRenoveraPage', 'common', 'error'])
  const router = useRouter()
  const userData = useUserContext()
  const {
    user: {
      currentMove: { id },
      contact,
    },
  } = userData

  const [hasConfirmed, setHasConfirmed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const schema = yup.object({
    description: yup.string().required(t('SIMPLIFIED.errors.descriptionRequired')),
    email: yup.string().email(t('error:mailInvalid')).required(t('SIMPLIFIED.errors.emailRequired')),
    phone: yup
      .string()
      .required(t('SIMPLIFIED.errors.phoneRequired'))
      .matches(new RegExp('([0-9])|(\\+[0-9])'), t('SIMPLIFIED.errors.phoneInvalid'))
      .max(12, t('SIMPLIFIED.errors.phoneMax'))
      .min(5, t('SIMPLIFIED.errors.phoneMin')),
    when: yup.string().required(t('SIMPLIFIED.errors.whenRequired')),
  })

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, touchedFields },
  } = useForm<FixaRenoveraFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      description: '',
      email: contact?.email || '',
      phone: contact?.phone || '',
      when: '',
    },
  })

  useEffect(() => {
    if (contact?.email) {
      setValue('email', contact.email, { shouldTouch: true, shouldValidate: true })
    }
    if (contact?.phone) {
      setValue('phone', contact.phone, { shouldTouch: true, shouldValidate: true })
    }
  }, [contact, setValue])

  const formValues = watch()

  const canSubmit = formValues.description && formValues.email && formValues.phone && formValues.when && Object.keys(errors).length === 0

  const onSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true)
    try {
      await createConversation({
        message: data.description,
        email: data.email,
        phone: data.phone,
        when: data.when,
      })

      setHasConfirmed(true)
    } catch (error) {
      console.error('Error submitting fixa renovera request:', error)
    } finally {
      setIsSubmitting(false)
    }
  })

  return (
    <>
      {id && (
        <GoBackTopWrapper variant="secondaryLight">
          <GoBackToTopInnerWrapper>
            <BackToMovepageButton />
          </GoBackToTopInnerWrapper>
        </GoBackTopWrapper>
      )}

      <TopSection />

      <div className="w-full bg-white relative shadow-[0px_4px_32px_rgba(0,0,0,0.07)] max-w-[821px] min-h-[600px] p-4 sm:my-8 sm:mx-auto sm:rounded-[var(--radius-border-radius-main)]">
        {!hasConfirmed ? (
          <form onSubmit={onSubmit}>
            <div className="flex flex-col items-center">
              <div className="w-full max-w-[600px] bg-[rgba(81,200,180,0.1)] rounded-[var(--radius-border-radius-main)] p-6 mt-4 mb-6">
                <h3 className="text-[var(--color-secondary-main)] text-xl font-bold mb-2">{t('SIMPLIFIED.formTitle')}</h3>
                <Text className="text-[var(--color-secondary-main)] text-sm mb-6">{t('SIMPLIFIED.formDescription')}</Text>

                <div className="space-y-8">
                  <div>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <TextArea {...field} label={t('SIMPLIFIED.textareaLabel')} error={touchedFields.description ? errors?.description?.message : undefined} />
                      )}
                    />
                  </div>

                  <div>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => <Input {...field} type="text" label={t('SIMPLIFIED.emailLabel')} error={touchedFields.email ? errors?.email?.message : undefined} />}
                    />
                  </div>

                  <div>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => <Input {...field} type="text" label={t('SIMPLIFIED.phoneLabel')} error={touchedFields.phone ? errors?.phone?.message : undefined} />}
                    />
                  </div>

                  <div>
                    <Controller
                      name="when"
                      control={control}
                      render={({ field }) => <Input {...field} type="text" label={t('SIMPLIFIED.whenLabel')} error={touchedFields.when ? errors?.when?.message : undefined} />}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full max-w-[600px] h-12 mt-4 mb-8">
                <Button type="submit" text={t('SIMPLIFIED.submitButton')} disabled={!canSubmit || isSubmitting} />
              </div>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
            <BirdSuccess width={219} height={171} className="mb-6" />
            <h3 className="text-[var(--color-secondary-main)] text-2xl font-bold mb-4 text-center">{t('SIMPLIFIED.successTitle')}</h3>
            <Text className="text-[var(--color-secondary-main)] text-center mb-8 max-w-[500px]">{t('SIMPLIFIED.successMessage')}</Text>
            <div className="h-12">
              <Button className="" text={t('SIMPLIFIED.backButton')} onClick={() => router.push('/app/movepage')} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default FixaRenoveraPage
