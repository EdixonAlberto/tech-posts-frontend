import './Login.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutAuth } from '~/views/Auth/LayoutAuth'
import { IconUser } from '~/components/icons/IconUser'
import { IconLoading } from '~/components/icons/IconLoading'
import { useRequest } from '~/hooks/useRequest'
import { useLocalStorage } from '~/hooks/useLocalStorage'

export function Login() {
  const [username, setUsername] = useState<string>('')
  const navigate = useNavigate()
  const [request, data, loading, error] = useRequest<IAuth>('POST', '/auth')
  const [, setSession] = useLocalStorage<IAuth>('session')

  async function loginHandler() {
    if (loading) return
    await request({ username })
  }

  useEffect(() => {
    if (data) {
      setSession(data)
      navigate('/', { replace: true })
    }
  }, [data])

  useEffect(() => {
    if (error) {
      const errorMessage = Array.isArray(error) ? error[0] : error
      alert(errorMessage)
    }
  }, [error])

  return (
    <LayoutAuth className="login">
      <form>
        <div className="t-input">
          <div className="icon">
            <IconUser />
          </div>
          <input
            type="text"
            placeholder="Nombre de Usuario"
            onInput={({ target }: TEventInput) => setUsername(target.value)}
          />
        </div>

        <div className="t-checkbox">
          <input type="checkbox" name="remember" />
          <span>Recordarme</span>
        </div>

        <button className="t-button solid" disabled={!username} type="button" onClick={loginHandler}>
          <span>Iniciar Sesión</span>
          {loading && <IconLoading />}
        </button>

        <button
          className="t-button regular"
          disabled={loading}
          type="button"
          onClick={() => navigate('/signup', { replace: true })}
        >
          <span>Registrarse</span>
        </button>
      </form>
    </LayoutAuth>
  )
}
