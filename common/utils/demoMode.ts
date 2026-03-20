export const isServerDemoMode = process.env.DEMO_MODE === 'true'

export const isClientDemoMode = () => process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
