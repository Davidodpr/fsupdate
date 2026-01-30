'use client'

import { useState, useEffect, useCallback } from 'react'
import createFetchInstance from '@/common/utils/api'
import { BrokerLeaderboardEntry, BrokerLeaderboardResponse } from '../types/leaderboard'


const API_ENDPOINT = '/web/power-of-attorney/broker-leaderboard'

interface UseLeaderboardDataReturn {
  brokers: BrokerLeaderboardEntry[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useLeaderboardData = (): UseLeaderboardDataReturn => {
  const [brokers, setBrokers] = useState<BrokerLeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeaderboardData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const fetchInstance = createFetchInstance('GET', true)
      const response = await fetchInstance<BrokerLeaderboardResponse>(API_ENDPOINT)

      if (response && Array.isArray(response)) {
        // First, sort brokers by signedDocumentCount in descending order
        const sortedBrokers = [...response].sort((a, b) => b.signedDocumentCount - a.signedDocumentCount)

        // Then assign ranks, using existing rank if available, otherwise calculate based on sorted position
        const brokersWithRank = sortedBrokers.map((broker, index) => ({
          ...broker,
          rank: broker.rank ?? index + 1,
        }))

        // Finally, sort by rank to ensure proper display order
        const finalSortedBrokers = brokersWithRank.sort((a, b) => a.rank - b.rank)
        setBrokers(finalSortedBrokers)
      } else {
        setBrokers([])
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err)
      setError('Kunde inte ladda topplistan')
      setBrokers([])
    } finally {
      setLoading(false)
    }
  }, [])

  const refetch = useCallback(async () => {
    await fetchLeaderboardData()
  }, [fetchLeaderboardData])

  useEffect(() => {
    fetchLeaderboardData()
  }, [fetchLeaderboardData])

  useEffect(() => {
    const interval = setInterval(
      () => {
        fetchLeaderboardData()
      },
      5 * 60 * 1000, // refetch every 5 minutes
    )

    return () => clearInterval(interval)
  }, [fetchLeaderboardData])

  return {
    brokers,
    loading,
    error,
    refetch,
  }
}
