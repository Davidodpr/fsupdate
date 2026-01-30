'use server'

export const sendPageVisitFn = async (userId: string, userToken: string, page: string) => {
  try {
    await fetch(`${process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL}/web/user/page-visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        userId: userId,
        pageName: page,
      }),
    })
  } catch (error) {
    console.error('Failed to send page visit:', error)
  }
}

export async function sendPageVisit(userId: string, page: string, userToken: string): Promise<void> {
  try {
    await sendPageVisitFn(userId as string, userToken as string, page as string)
  } catch (error: unknown) {
    console.error('Failed to send page visit:', error)
  }
}
