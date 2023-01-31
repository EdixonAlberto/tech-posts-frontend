import './Home.scss'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { Post } from '~/components/Post'
import { Avatar } from '~/components/Avatar'
import { IconLogout } from '~/components/icons/IconLogout'
import { IconSearch } from '~/components/icons/IconSeach'
import { useLocalStorage } from '~/hooks/useLocalStorage'
import { useRequest } from '~/hooks/useRequest'
import { Role, Status } from '~/entities/enums'

export function Home() {
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState<boolean>(false)
  const [session, setSession] = useLocalStorage<IAuth>('session')
  const [request, posts, loadingPosts, errorPosts] = useRequest<IPost[]>('GET', '/posts')

  const showPosts = !loadingPosts && !errorPosts && posts && posts.length
  const userSession = session!.user
  const postDefault = {
    author: userSession,
    image: '',
    message: '',
    likes: [] as IUser[],
    location: '',
    status: Status.Drafted,
    updatedAt: new Date().toString()
  } as IPost

  function searchPost(message: string) {}

  useEffect(() => {
    if (!posts || refresh) {
      request()
      setRefresh(false)
    }
  }, [refresh])

  return (
    <div className="home">
      <header>
        <div className="logo">
          <img src="/static/img/logo-light.png" alt="company logo" />
          <h1>Tech Inc</h1>
        </div>

        <div className="search">
          <input type="text" placeholder="Buscar" onInput={({ target }: TEventInput) => searchPost(target.value)} />
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

      <main
        style={{
          paddingTop: userSession.role === Role.Admin ? 160 : 80
        }}
      >
        {userSession.role === Role.User && (
          <div className="new-post">
            <Post modeCreate={true} post={postDefault} refresh={() => setRefresh(true)} />
          </div>
        )}

        <div className="posts">
          {loadingPosts && 'Cargando posts...'}

          {showPosts ? posts.map(post => <Post key={post._id} post={post} refresh={() => setRefresh(true)} />) : null}

          {!loadingPosts && !posts?.length && 'No hay publicaciones para mostrar'}
        </div>

        <div className="profile">
          <Avatar user={userSession} bigSize={true} />

          <div className="content">
            <p>
              {userSession.name} {userSession.surname}
            </p>
            <p>{posts ? posts.length : 0} Publicaciones</p>
            <p>Cuenta creada el {moment(userSession.createAt).format('DD/MM/YYYY')}</p>
          </div>

          <hr />
        </div>
      </main>
    </div>
  )
}
