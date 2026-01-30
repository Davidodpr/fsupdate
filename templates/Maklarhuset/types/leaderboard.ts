// Type for individual broker entry in the leaderboard
export interface BrokerLeaderboardEntry {
  broker: string
  signedDocumentCount: number
  rank: number
}

// The API response is directly an array of broker entries
export type BrokerLeaderboardResponse = BrokerLeaderboardEntry[]
