import { useTranslation } from 'react-i18next'
import AreaIcon from '@/public/images/ResidenceSize_icon.svg'
import Path from '@/public/images/path.svg'

export interface MoveMeasuresProps {
  residanceSize: number
  distance: number
}
export const MoveMeasures = ({ residanceSize, distance }: MoveMeasuresProps) => {
  const { t } = useTranslation(['common'])
  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2" data-testid="residancesize">
        <div className="w-6 h-6 flex items-center justify-center">
          <AreaIcon />
        </div>
        <div className="text-sm font-medium text-gray-700">
          {t('area')}: {residanceSize} {t('areaUnit')}
        </div>
      </div>
      <div className="flex items-center gap-2" data-testid="distance">
        <Path />
        <div className="text-sm font-medium text-gray-700">
          {t('distance')}: ~{distance} {t('distanceUnit')}
        </div>
      </div>
    </div>
  )
}
