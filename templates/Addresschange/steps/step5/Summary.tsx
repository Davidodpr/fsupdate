import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import formatDate from '@/appComponents/format'
import { useAddresschangeContext } from '@/common/context/addresschange/addresschange.provider'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Checkbox'
import Text from '@/components/atoms/Text'
import {
  buttonWrapperVariants,
  checkBoxWrapperVariants,
  innerWrapperVariants,
  labelVariants,
  stepTemplateWrapperVariants,
  summaryItemVariants,
  summaryWrapperVariants,
  goBackButtonVariants,
} from '../../AddresschangePage.variants'
import { AddresschangeError } from '../../components/AddresschangeError'

interface Props {
  goToNextStep: () => void
  goToPrevStep: () => void
}

export const Summary = ({ goToNextStep, goToPrevStep }: Props) => {
  const { contract, error, changeAddress } = useAddresschangeContext()
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)

  const onSubmit = () => {
    changeAddress(goToNextStep)
  }

  const { t } = useTranslation(['addresschange', 'common'])

  if (error === 'skatteverket_address_post_error') {
    return <AddresschangeError errorText={t(`error:skatteverket_address_post_error`)} onLogin={() => window.location.reload()} />
  }

  return (
    <div className={stepTemplateWrapperVariants()}>
      <div className={innerWrapperVariants()}>
        <Text variant={'extraLargeBlack'} style={{ marginTop: 0 }}>
          {t('addresschange:SUMMARY.title')}
        </Text>
        <div className={summaryWrapperVariants()}>
          <div className={summaryItemVariants()}>
            <Text variant={'button'}>{t('addresschange:SUMMARY.moveDate')}</Text>
            {contract && <Text>{formatDate(contract.moveDate)}</Text>}
          </div>
          <div className={summaryItemVariants()}>
            <Text variant={'button'}>{t('addresschange:SUMMARY.newAddress')}</Text>
            {contract && (
              <Text>
                {contract.newAddress.street} {contract.newAddress.streetNumber}, {contract.newAddress.zip} {contract.newAddress.city}{' '}
                {contract.newAddress.apartmentNumber && `, lgh ${contract.newAddress.apartmentNumber}`}
              </Text>
            )}
          </div>
          <Text variant={'button'}>{t('addresschange:SUMMARY.personsMoving')}</Text>
          {contract.peopleToMove.map((person) => (
            <div className={summaryItemVariants()} key={person.pno}>
              <Text>{person.name}</Text>
              <Text>{person.pno}</Text>
            </div>
          ))}
        </div>
        <div className={checkBoxWrapperVariants()}>
          <Checkbox id="confirm" onClick={() => setIsButtonEnabled(!isButtonEnabled)} />
          <label className={labelVariants({ leftmargined: true })} htmlFor="confirm">
            {t('addresschange:SUMMARY.confirm')}
          </label>
        </div>
        <div className={buttonWrapperVariants({ justifyContent: 'between' })}>
          <div className={goBackButtonVariants()} onClick={goToPrevStep}>
            {<Text variant="linkBig">{t('common:goBack')}</Text>}
          </div>
          <Button disabled={!isButtonEnabled} onClick={onSubmit} text={t('addresschange:SUMMARY:button')} padding="0 20px !important" />
        </div>
      </div>
    </div>
  )
}
