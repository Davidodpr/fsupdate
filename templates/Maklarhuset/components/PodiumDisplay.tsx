import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  podiumContainerVariants,
  podiumWrapperVariants,
  podiumItemVariants,
  podiumCardVariants,
  podiumBaseVariants,
  podiumNameVariants,
  podiumDocumentsVariants,
  podiumLabelVariants,
  podiumValueVariants,
  prizeDisplayVariants,
} from '../Maklarhuset.variants'
import { BrokerLeaderboardEntry } from '../types/leaderboard'

interface PodiumDisplayProps {
  brokers: BrokerLeaderboardEntry[]
}

// Constants for rank positions and heights
const RANK_POSITIONS = {
  1: 'first',
  2: 'second',
  3: 'third',
} as const

const RANK_EMOJIS = {
  1: '🏆',
  2: '🥈',
  3: '🥉',
} as const

const PRIZE_AMOUNT = '10,000 kr'

export const PodiumDisplay: React.FC<PodiumDisplayProps> = ({ brokers }) => {
  const { t } = useTranslation('maklarhuset')

  // Get top 3 brokers - sort by rank to ensure correct order
  const top3 = brokers
    .filter((broker) => broker.rank <= 3)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 3)

  if (top3.length === 0) {
    return null
  }

  // Reorder for podium display: [2nd, 1st, 3rd]
  const podiumOrder = [
    top3[1], // 2nd place
    top3[0], // 1st place
    top3[2], // 3rd place
  ].filter(Boolean) // Remove undefined if less than 3

  const getRankPosition = (rank: number) => {
    return RANK_POSITIONS[rank as keyof typeof RANK_POSITIONS] || 'third'
  }

  const getRankEmoji = (rank: number) => {
    return RANK_EMOJIS[rank as keyof typeof RANK_EMOJIS] || '🥉'
  }

  return (
    <div className={podiumContainerVariants()}>
      <div className={podiumWrapperVariants()}>
        {podiumOrder.map((broker) => (
          <div key={broker.broker} className={podiumItemVariants({ position: getRankPosition(broker.rank) })}>
            <div className={podiumCardVariants({ rank: broker.rank as 1 | 2 | 3 }) + ` rank-${broker.rank}`}>
              {/* Prize money display for 1st place only */}
              {broker.rank === 1 && <div className={prizeDisplayVariants()}>{PRIZE_AMOUNT}</div>}

              <div className={podiumNameVariants()}>{broker.broker}</div>

              <div className={podiumDocumentsVariants()}>
                <div className={podiumValueVariants()}>{broker.signedDocumentCount}</div>
                <div className={podiumLabelVariants()}>{t('metrics.signaturesUnit')}</div>
              </div>
            </div>

            {/* Rank emoji below the medal - visible only on mobile */}
            <div style={{ fontSize: '48px', marginTop: '12px', textAlign: 'center' }} className="mobile-rank-emoji">
              {getRankEmoji(broker.rank)}
            </div>

            <div className={podiumBaseVariants({ height: getRankPosition(broker.rank) as 'first' | 'second' | 'third' })}>
              <span>{getRankEmoji(broker.rank)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
