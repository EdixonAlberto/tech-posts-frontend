import './Home.scss'
import { useNavigate } from 'react-router-dom'
import { Post } from '~/components/Post'
import { Avatar } from '~/components/Avatar'
import { IconLogout } from '~/components/icons/IconLogout'
import { IconSearch } from '~/components/icons/IconSeach'
import { useLocalStorage } from '~/hooks/useLocalStorage'

export function Home() {
  const navigate = useNavigate()
  const [, setSession] = useLocalStorage<IAuth>('session')

  return (
    <div className="home">
      <header>
        <div className="logo">
          <img src="/static/img/logo-light.png" alt="company logo" />
          <h1>Tech Inc</h1>
        </div>

        <div className="search">
          <input type="text" placeholder="Buscar" />
          <IconSearch />
        </div>

        <div
          className="logout"
          onClick={() => {
            setSession(null)
            navigate('/login', { replace: true })
          }}
        >
          <IconLogout />
        </div>
      </header>

      <main>
        <div className="posts">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <Post key={i} />
            ))}
        </div>

        <div className="profile">
          <Avatar bigSize={true} />

          <p>200 públicaciones</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, nostrum.</p>

          <hr />
        </div>
      </main>
    </div>
  )
}
