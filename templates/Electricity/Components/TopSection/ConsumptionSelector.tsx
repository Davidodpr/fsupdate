import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useElectricityProvider } from '@/common/context/electricity/electricityContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import Text from '@/components/atoms/Text'
import ResetIcon from '@/public/images/reset.svg'
import {
  inputAndTextWrapperVariants,
  resetVariants,
  styledConsumptionSelectorTextVariants,
  consumptionSelectorWrapperVariants,
  styledInputVariants,
} from './ConsumptionSelector.variants'
import { RESIDENCE_TYPES } from '@/constants/residenceTypes'

interface ConsumptionSelectorProps {
  withSolidUnderline?: boolean
  withFastighetsbyranColors?: boolean
}

const ConsumptionSelector = ({ withFastighetsbyranColors, withSolidUnderline }: ConsumptionSelectorProps) => {
  const { t } = useTranslation(['electricity', 'common'])
  const { setConsumptionValue, consumptionValue, getYearlyElectricityConsumption } = useElectricityProvider()
  const [showReset, setShowReset] = useState(false)
  const {
    user: {
      currentMove: { residenceSize, residenceType },
    },
  } = useUserContext()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) setConsumptionValue(Number(e.target.value) || '')
  }

  const isTooBigResidence = residenceType !== RESIDENCE_TYPES.APARTMENT ? residenceSize > 360 : residenceSize > 330

  return (
    <div className={consumptionSelectorWrapperVariants()} data-testid="consumption-selector-container">
      <div className={inputAndTextWrapperVariants()}>
        <input
          className={styledInputVariants({ withFastighetsbyranColors, withSolidUnderline })}
          value={isTooBigResidence ? '0' : (consumptionValue ?? '0')}
          type="tel"
          onChange={(e) => {
            onChange?.(e)
            if (!showReset) setShowReset(true)
          }}
        />
        <Text className={styledConsumptionSelectorTextVariants()} textAlign="center">
          {t('kwhYear')}
        </Text>
        {showReset && (
          <Text
            className={resetVariants()}
            variant="details"
            onClick={() => {
              getYearlyElectricityConsumption(residenceSize, residenceType)
              setShowReset(false)
            }}
          >
            <ResetIcon style={{ marginRight: 4 }} />
            {t('reset')}
          </Text>
        )}
      </div>
    </div>
  )
}

export default ConsumptionSelector
