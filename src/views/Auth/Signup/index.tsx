import './Signup.scss'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { LayoutAuth } from '~/views/Auth/LayoutAuth'
import { IconUser } from '~/components/icons/IconUser'
import { IconLoading } from '~/components/icons/IconLoading'
import { useRequest } from '~/hooks/useRequest'
import { useLocalStorage } from '~/hooks/useLocalStorage'
import { Role } from '~/entities/enums'

export function Signup() {
  const [requestCreateUser, user, loadingCreateUser, errorCreateUser] = useRequest<IUser>('POST', '/users')
  const [requestAuth, auth, loadingAuth, errorAuth] = useRequest<IAuth>('POST', '/auth')
  const [loading, setLoading] = useState<boolean>(false)
  const [, setSession] = useLocalStorage<IAuth>('session')
  const navigate = useNavigate()

  async function submitHandler(e: TEventForm): Promise<void> {
    e.preventDefault()
    if (loading) return

    const [username, name, surname, role] = e.target as unknown as { [key: string]: { value: string } }[]

    await requestCreateUser({
      username: username.value,
      name: name.value,
      surname: surname.value,
      role: role.value ? Role.Admin : Role.User
    })
  }

  useEffect(() => {
    setLoading(loadingCreateUser || loadingAuth)
  }, [loadingCreateUser, loadingAuth])

  useEffect(() => {
    if (user) requestAuth({ username: user.username })
  }, [user])

  useEffect(() => {
    if (auth) {
      setSession(auth)
      setLoading(false)
      navigate('/', { replace: true })
    }
  }, [auth])

  // TODO: Agregar una libreria de notificaciones para mostrar los errores
  useEffect(() => {
    if (errorCreateUser || errorAuth) {
      const error = errorCreateUser || errorAuth
      alert(Array.isArray(error) ? error[0] : error)
    }
  }, [errorCreateUser, errorAuth])

  return (
    <LayoutAuth className="signup">
      <form onSubmit={submitHandler}>
        <div className="t-input">
          <div className="icon">
            <IconUser />
          </div>
          <input type="text" name="username" placeholder="Nombre de Usuario" />
        </div>

        <div className="t-input">
          <div className="icon">
            <IconUser />
          </div>
          <input type="text" name="name" placeholder="Nombre" />
        </div>

        <div className="t-input">
          <div className="icon">
            <IconUser />
          </div>
          <input type="text" name="surname" placeholder="Apellido" />
        </div>

        <div className="t-checkbox">
          <input type="checkbox" name="role" />
          <span>Rol Admin</span>
        </div>

        <div className="t-checkbox">
          <input type="checkbox" name="terms" />
          <span>Estoy de acuerdo con los términos y condiciones</span>
        </div>

        <button className="t-button solid" type="submit">
          <span>Registrar</span>
          {loading && <IconLoading />}
        </button>

        <Link to="/login">Ya tengo una cuenta</Link>
      </form>
    </LayoutAuth>
  )
}
