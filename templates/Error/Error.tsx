import { TFunction } from 'i18next'
import { BirdError } from '@/components/atoms/BirdError'
import ExitActivityButton from '@/components/atoms/ExitActivityButton'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import LoginAndSignupBase from '@/components/molecules/LoginAndSignupBase'
import { failedWrapperVariants, innerWrapperVariants, headerVariants, largeButtonWrapperVariants, buttonWrapperVariants } from './Error.variants'

interface Props {
  t: TFunction<'translation', undefined>
}

export const ErrorPage = ({ t }: Props) => {
  return (
    <LoginAndSignupBase>
      <Flex direction="column" alignItems="center" className={failedWrapperVariants()}>
        <BirdError />
        <Flex direction="column" alignItems="center" className={innerWrapperVariants()}>
          <h1 className={headerVariants()}>{t('errorPage')}</h1>
          <Text className="mb-10 text-base" variant="body">
            {t('clickHere')}
          </Text>
          <div className={buttonWrapperVariants()}>
            <div className={largeButtonWrapperVariants()}>
              <ExitActivityButton variant="primaryAlt" />
            </div>
          </div>
        </Flex>
      </Flex>
    </LoginAndSignupBase>
  )
}
