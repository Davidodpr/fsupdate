import { LoginProvider } from '@/common/context/login/Login.provider'
import Login from './_components/login'

export default async function LoginHome() {
  return (
    <main>
      <LoginProvider>
        <Login />
      </LoginProvider>
    </main>
  )
}
