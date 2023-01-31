import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

import { useLocalStorage } from '~/hooks/useLocalStorage'

interface IAuthProps extends PropsWithChildren {}

export function Auth({ children }: IAuthProps) {
  const [session] = useLocalStorage<IAuth>('session')
  return session?.accessToken ? <>{children}</> : <Navigate to="/login" />
}
