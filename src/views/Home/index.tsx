import './Home.scss'
import { useNavigate } from 'react-router-dom'
import { Post } from '../../components/Post'
import { Avatar } from '../../components/Avatar'
import { IconLogout } from '~/components/icons/IconLogout'
import { IconSearch } from '~/components/icons/IconSeach'

export function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <header>
        <h1>Tech Inc</h1>

        <div className="search">
          <input type="text" placeholder="Buscar" />
          <IconSearch />
        </div>

        <div className="logout" onClick={() => navigate('/login', { replace: true })}>
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
