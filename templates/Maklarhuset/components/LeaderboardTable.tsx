import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  tableContainerVariants,
  tableVariants,
  tableHeaderVariants,
  tableBodyVariants,
  tableRowVariants,
  tableHeaderCellVariants,
  tableCellVariants,
  rankCellVariants,
  brokerNameVariants,
  documentCountVariants,
  tableWrapperVariants,
  sectionTitleVariants,
} from '../Maklarhuset.variants'
import { BrokerLeaderboardEntry } from '../types/leaderboard'

interface LeaderboardTableProps {
  brokers: BrokerLeaderboardEntry[]
  loading?: boolean
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ brokers, loading = false }) => {
  const { t } = useTranslation('maklarhuset')

  if (!loading && brokers.length === 0) {
    return null
  }

  return (
    <>
      {brokers.length > 0 && <h2 className={sectionTitleVariants()}>{t('leaderboard.otherPositions')}</h2>}
      <div className={tableContainerVariants()}>
        <div className={tableWrapperVariants()}>
          <table className={tableVariants()}>
            <thead className={tableHeaderVariants()}>
              <tr className={tableRowVariants()}>
                <th className={tableHeaderCellVariants()}>{t('leaderboard.rank')}</th>
                <th className={tableHeaderCellVariants()}>{t('leaderboard.broker')}</th>
                <th className={tableHeaderCellVariants()}>{t('leaderboard.documents')}</th>
              </tr>
            </thead>
            <tbody className={tableBodyVariants()}>
              {brokers.map((broker, index) => {
                // Always use the broker's actual rank if available
                // This ensures consistency regardless of how the data is filtered
                const rank = broker.rank

                return (
                  <tr key={`${broker.broker}-${index}`} className={tableRowVariants({ highlight: false })}>
                    <td className={`${tableCellVariants()} ${rankCellVariants({ isTop3: false })}`}>{rank}</td>
                    <td className={tableCellVariants()}>
                      <span className={brokerNameVariants()}>{broker.broker || t('leaderboard.unknownBroker')}</span>
                    </td>
                    <td className={tableCellVariants()}>
                      <span className={documentCountVariants({ highlight: false })}>
                        {broker.signedDocumentCount} {t('metrics.documentsUnit')}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
