export const ALL_MC_ADMINS = [
  { id: '7633514', name: 'Joel' },
  { id: '8035526', name: 'Fredrik' },
  { id: '8185940', name: 'Maria' },
  { id: '8225022', name: 'Nina' },
  { id: '8730770', name: 'Johan' },
]

export const ALL_MC_ADMIN_IDS = ALL_MC_ADMINS.map((admin) => admin.id)

export const getRandomMcAdmin = (userId?: string): { id: string; name: string } => {
  let index: number
  if (userId) {
    // Use userId to deterministically select an admin (same user always gets same admin)
    const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    index = hash % ALL_MC_ADMINS.length
  } else {
    // Fallback to truly random if no userId provided
    index = Math.floor(Math.random() * ALL_MC_ADMINS.length)
  }

  return ALL_MC_ADMINS[index]
}

export const getTwoRandomMcAdminIds = (excludeId?: string): string[] => {
  const availableIds = ALL_MC_ADMIN_IDS.filter((id) => id !== excludeId)
  const shuffled = [...availableIds].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 2)
}