import './Signup.scss'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { LayoutAuth } from '~/views/Auth/LayoutAuth'
import { IconUser } from '~/components/icons/IconUser'
import { IconLoading } from '~/components/icons/IconLoading'
import { IconImage } from '~/components/icons/IconImage'
import { useRequest } from '~/hooks/useRequest'
import { useLocalStorage } from '~/hooks/useLocalStorage'
import { Role } from '~/entities/enums'

export function Signup() {
  const [requestCreateUser, user, loadingCreateUser, errorCreateUser] = useRequest<IUser>('POST', '/users')
  const [requestAuth, auth, loadingAuth, errorAuth] = useRequest<IAuth>('POST', '/auth')
  const [loading, setLoading] = useState<boolean>(false)
  const [isRoleAdmin, setIsRoleAdmin] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [, setSession] = useLocalStorage<IAuth>('session')
  const navigate = useNavigate()

  async function submitHandler(e: TEventForm): Promise<void> {
    e.preventDefault()
    if (loading) return

    const [name, surname] = e.target as unknown as { [key: string]: { value: string } }[]

    await requestCreateUser({
      avatar: avatar || undefined,
      username: username,
      name: name.value,
      surname: surname.value,
      role: isRoleAdmin ? Role.Admin : undefined
    } as unknown as Partial<IUser>)
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
    <LayoutAuth className="signup" avatar={avatar} username={username || 'Username'}>
      <form onSubmit={submitHandler}>
        <div className="t-input">
          <div className="icon">
            <IconImage />
          </div>
          <input
            type="text"
            // TODO: Preparar backend con MULTER para subir imagenes locales
            // type="file"
            // accept="image/gif, image/jpeg, image/png"
            placeholder="URL del avatar"
            onInput={({ target }: TEventInput) => setAvatar(target.value)}
          />
        </div>

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
          <input type="checkbox" onInput={() => setIsRoleAdmin(!isRoleAdmin)} />
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
