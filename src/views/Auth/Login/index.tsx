import './Login.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutAuth } from '~/views/Auth/LayoutAuth'
import { IconUser } from '~/components/icons/IconUser'
import { useRequest } from '~/hooks/useRequest'
import { useLocalStorage } from '~/hooks/useLocalStorage'

export function Login() {
  const [username, setUsername] = useState<string>('')
  const navigate = useNavigate()
  const [request, data, loading] = useRequest<IAuth>('POST', '/auth')
  const [, setSession] = useLocalStorage<IAuth>('session')

  async function loginHandler() {
    await request({ username })
  }

  useEffect(() => {
    if (data) {
      setSession(data)
      navigate('/', { replace: true })
    }
  }, [data])

  return (
    <LayoutAuth className="login">
      <form>
        <div className="t-input">
          <div className="icon">
            <IconUser />
          </div>
          <input type="text" placeholder="Nombre de Usuario" onInput={({ target }: any) => setUsername(target.value)} />
        </div>

        <div className="t-checkbox">
          <input type="checkbox" name="remember" />
          <span>Recordarme</span>
        </div>

        <button className="t-button solid" disabled={!username} type="button" onClick={loginHandler}>
          <span>Iniciar Sesión</span>
          <div className={'loading' + (loading ? ' active' : '')}>loading</div>
        </button>

        <button className="t-button regular" type="button" onClick={() => navigate('/signup', { replace: true })}>
          <span>Registrarse</span>
        </button>
      </form>
    </LayoutAuth>
  )
}
