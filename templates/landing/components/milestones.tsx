import { useTranslation } from 'react-i18next'

type StatItem = {
  value: string
  text: string
}

const Milestones = () => {
  const { t } = useTranslation('landing')
  const statsItems = t('landing:STATSITEMS', { returnObjects: true }) as StatItem[]

  return (
    <div className="py-10 md:py-12">
      <div className="max-w-[860px] mx-auto bg-[var(--color-background-default)] rounded-2xl px-6 py-8 md:py-10">
        <div className="grid grid-cols-3 gap-4">
          {statsItems.slice(0, 3).map(({ value, text }, index) => (
            <div key={index} className="text-center px-2">
              <div className="text-xl md:text-2xl font-bold text-[var(--color-primary-main)] mb-1">
                {value}
              </div>
              <p className="text-[var(--color-secondary-main)]/55 text-[11px] md:text-xs leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Milestones
