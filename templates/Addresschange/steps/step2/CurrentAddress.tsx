import { useTranslation } from 'react-i18next'
import { useAddresschangeContext } from '@/common/context/addresschange/addresschange.provider'
import titleCase from '@/common/helpers/titleCase'
import ArrowForward from '@/components/atoms/ArrowForward'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import InfoBoxColored from '@/components/molecules/InfoBoxColored'
import {
  buttonWrapperVariants,
  infoBoxWrapperVariants,
  innerWrapperVariants,
  stepTemplateWrapperVariants,
  styledTextVariants,
  goBackButtonVariants,
} from '../../AddresschangePage.variants'

interface Props {
  goToNextStep: () => void
  goToPrevStep: () => void
}

export const CurrentAddress = ({ goToNextStep, goToPrevStep }: Props) => {
  const { t } = useTranslation(['addresschange', 'common'])
  const { currentAddress, error } = useAddresschangeContext()
  const toTitleCase = (string: string) => string && titleCase(string)

  if (error) {
    return (
      <div className={stepTemplateWrapperVariants()}>
        <div className={innerWrapperVariants()}>
          <div className={infoBoxWrapperVariants()}>
            <InfoBoxColored type="warning">{t(`error:${error}`)}</InfoBoxColored>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={stepTemplateWrapperVariants()}>
      <div className={innerWrapperVariants()}>
        {Object.keys(currentAddress).length > 0 && (
          <>
            <Text className={styledTextVariants()} variant={'extraLargeBlack'}>
              {t('ADDRESS.currentRecident')}
            </Text>
            <Text className={styledTextVariants()}>
              <strong>{t('ADDRESS.civilRegistrationAddress')}</strong>
              <br />
              {toTitleCase(currentAddress?.street)} {currentAddress?.additionalInfo}
              <br />
              {`${currentAddress?.zip}, ${toTitleCase(currentAddress?.city)}`}
            </Text>
            <Text className={styledTextVariants()}>
              <strong>{t('ADDRESS.propertyDesignation')}</strong>
              <br />
              {toTitleCase(currentAddress?.propertyDesignation)}
            </Text>
            <Text className={styledTextVariants()}>
              <strong>{t('ADDRESS.civilRegistrationDate')}</strong>
              <br />
              {currentAddress?.registrationDate}
            </Text>
            <div className={buttonWrapperVariants({ justifyContent: 'between' })}>
              <div className={goBackButtonVariants()} onClick={goToPrevStep}>
                {<Text variant="linkBig">{t('common:goBack')}</Text>}
              </div>
              <Button onClick={goToNextStep} iconRight={<ArrowForward color="white" />} text={t('common:continue')} padding="0 40px !important" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
