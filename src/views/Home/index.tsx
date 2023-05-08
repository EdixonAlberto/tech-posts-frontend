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
  const { VITE_ENV } = import.meta.env
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState<boolean>(false)
  const [inputSearch, setInputSearch] = useState<string>('')
  const [showPostsPublished, setShowPostsPublished] = useState<boolean>(false)
  const [postsFiltered, setPostsFiltered] = useState<IPost[]>([])
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

  useEffect(() => {
    if (posts) {
      setPostsFiltered(
        posts!.filter(post => {
          const isMessage = post.message.includes(inputSearch)
          const isPublished = showPostsPublished ? post.status === Status.Published : true
          return isMessage && isPublished
        })
      )
    }
  }, [inputSearch, showPostsPublished])

  useEffect(() => {
    if (!posts || refresh) {
      request()
      setRefresh(false)
    }
  }, [refresh])

  useEffect(() => {
    if (posts) {
      setPostsFiltered(posts)
    }
  }, [posts])

  return (
    <div className="home">
      <header>
        <div className="logo">
          <img src="/static/img/logo-light.png" alt="company logo" />
          <h1>Tech Inc</h1>
        </div>

        <div className="search">
          <input type="text" placeholder="Buscar" onInput={({ target }: TEventInput) => setInputSearch(target.value)} />
          <IconSearch />
        </div>

        <div className="t-checkbox">
          <input type="checkbox" onInput={() => setShowPostsPublished(!showPostsPublished)} />
          <span>Mostrar solo mensajes aprobados</span>
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
        {VITE_ENV !== 'demo' && userSession.role === Role.User && (
          <div className="new-post">
            <Post modeCreate={true} post={postDefault} refresh={() => setRefresh(true)} />
          </div>
        )}

        <div className="posts">
          {loadingPosts && 'Cargando posts...'}

          {showPosts ? (
            <>
              <h2>Posts</h2>
              {postsFiltered.map(post => (
                <Post key={post._id} post={post} refresh={() => setRefresh(true)} />
              ))}
            </>
          ) : null}

          {!loadingPosts && !posts?.length && 'No hay publicaciones para mostrar'}
        </div>

        <div className="profile">
          <Avatar user={userSession} bigSize={true} />
          <div className="content">
            <p>
              {userSession.name} {userSession.surname}
            </p>
            <p>{posts ? posts.length : 0} Publicaciones en total</p>
            <p>Cuenta creada el {moment(userSession.createAt).format('DD/MM/YYYY')}</p>
          </div>
          <hr />
        </div>
      </main>
    </div>
  )
}
