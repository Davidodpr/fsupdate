import React, { useContext, createContext, useCallback, HTMLAttributes, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSsoUser, loginSso, validateToken } from '@/common/api/singelSignOn'
import { useCookieFirst } from '@cookiefirst/cookiefirst-react'
import { useUserContext } from '../user/UserProvider'

const defaultValue: SSOLoginContextType = {
  validateAndLoginOrCreateUser: () => undefined,
}

type SSOModule = 'activities' | 'addresschange' | 'moveclean' | 'movehelp' | 'electricity' | 'broadband' | 'checklist' | 'fixarenovera'

type SSOLoginContextType = {
  validateAndLoginOrCreateUser: (arg0: string, arg1: string, arg2: boolean) => void
}

export type SSOLoginContextProviderProps = {
  context: React.Context<SSOLoginContextType>
  module: SSOModule
} & HTMLAttributes<HTMLDivElement>

const SSOLoginContext = createContext<SSOLoginContextType>(defaultValue)

export const SSOLoginProvider = ({ module, children }: SSOLoginContextProviderProps) => {
  const router = useRouter()
  const { acceptAllCategories } = useCookieFirst()
  const tokenParam = useSearchParams().get('token')
  const TOKENParam = useSearchParams().get('TOKEN')
  const cookiesAccceptedParam = useSearchParams().get('cookiesAccepted')

  const updateCookieConsent = useCallback(async () => {
    await acceptAllCategories()
  }, [acceptAllCategories])

  const { setUserTokenCookie } = useUserContext()
  const createUser = async (token: string) => {
    await createSsoUser(token)
  }

  const validateAndLoginOrCreateUser = useCallback(
    // eslint-disable-next-line max-params
    async (token: string, currentModule: string, cookiesAccepted: boolean) => {
      try {
        const isValid = await validateToken(token)
        if (!!isValid) {
          const loginResponse = await loginSso(token, setUserTokenCookie)
          if (!!loginResponse) {
            if (cookiesAccepted) {
              updateCookieConsent()
            }
            router.push(`/external/modules/${currentModule}${currentModule === 'fixarenovera' ? '' : `?cookiesAccepted=${cookiesAccepted}`}`)
          } else {
            router.push('/external/modules/error')
          }
        } else {
          await createUser(token)
        }
      } catch (e: unknown) {
        console.error(e)
      }
    },
    [router, setUserTokenCookie, updateCookieConsent],
  )

  const token = tokenParam || TOKENParam
  const cookiesAccepted = cookiesAccceptedParam?.length && cookiesAccceptedParam === 'true'
  useEffect(() => {
    if (!!token?.length) {
      validateAndLoginOrCreateUser(token as string, module, !!cookiesAccepted)
    }
  }, [token, validateAndLoginOrCreateUser, module, cookiesAccepted])

  const contextValue: SSOLoginContextType = { validateAndLoginOrCreateUser }
  return <SSOLoginContext.Provider value={contextValue}>{children}</SSOLoginContext.Provider>
}

export const CreateSSOLoginContext = () => {
  return createContext<SSOLoginContextType>(defaultValue)
}

export const useSSOLoginProvider = () => useContext(SSOLoginContext)
