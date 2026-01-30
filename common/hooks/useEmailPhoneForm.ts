import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUserContext } from '../context/user/UserProvider'

export const useEmailPhoneForm = () => {
  const { t } = useTranslation('error, common')
  const {
    user: { contact },
  } = useUserContext()

  const schema = yup
    .object({
      email: yup
        .string()
        .email(`${t('error:mailInvalid')}`)
        .required(`${t('error:mailRequried')}`),
      phone: yup
        .string()
        .required(`${t('error:phoneRequried')}`)
        .matches(new RegExp('([0-9])|(\\+[0-9])'), `${t('error:phoneInvalid')}`)
        .max(12, `${t('error:phoneInvalid')}`)
        .min(5, `${t('error:phoneInvalid')}`), // Validation for a swedish phone number, only allowed to have max 11 numbers, if you use 46, you are allowed to start with a 0 aswell
    })
    .required()

  const methods = useForm<{ email: string; phone: string }>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: contact.email ?? '',
      phone: contact.phone ?? '',
    },
  })

  useEffect(() => {
    if (contact?.email || contact?.phone) {
      methods.reset({
        email: contact.email ?? '',
        phone: contact.phone ?? '',
      })
    }
  }, [contact, methods])

  return methods
}
