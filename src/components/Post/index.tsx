import './Post.scss'
import { useEffect, useState } from 'react'
import moment from 'moment'

import { Avatar } from '~/components/Avatar'
import { IconMenu } from '~/components/icons/IconMenu'
import { IconHeart } from '~/components/icons/IconHeart'
import { IconSave } from '~/components/icons/IconSave'
import { IconCancel } from '~/components/icons/IconCancel'
import { IconLocation } from '~/components/icons/IconLocation'
import { IconLoading } from '~/components/icons/IconLoading'
import { useLocalStorage } from '~/hooks/useLocalStorage'
import { useRequest } from '~/hooks/useRequest'
import { Role, Status } from '~/entities/enums'

interface IPostProps {
  post: IPost
  modeCreate?: boolean
  refresh: () => void
}

export function Post(props: IPostProps) {
  const [post, setPost] = useState(props.post)
  const [session] = useLocalStorage<IAuth>('session')
  const [like, setLike] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [modeUpdate, setModeUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modeDelete, setModeDelete] = useState(false)
  const [payloadPost, setPayloadPost] = useState<TPostData>(getPostData(post))
  const [requestCreate, postCreated, loadingCreate] = useRequest<IPost>('POST', '/posts')
  const [requestUpdate, postUpdated, loadingUpdate] = useRequest<IPost>('PATCH', `/posts/${post._id}`)
  const [requestDelete, postDeleted, loadingDelete] = useRequest<IPost>('DELETE', `/posts/${post._id}`)

  const userSession = session!.user
  const image: string = post.image || ''
  const author: IUser = post.author
  const modeCreate = props.modeCreate
  const modeInput = modeCreate || modeUpdate

  function populatePost(key: keyof TPostData, value: string): void {
    setPayloadPost({
      ...payloadPost,
      [key]: value
    })
  }

  function getPostData(post: IPost): TPostData {
    return {
      message: post.message,
      image: post.image,
      location: post.location,
      status: post.status
    }
  }

  async function savePost(): Promise<void> {
    if (loading) return

    if (modeCreate) {
      await requestCreate({
        ...payloadPost,
        image: payloadPost.image || undefined,
        status: undefined
      })
    }

    if (modeUpdate) {
      await requestUpdate(payloadPost)
    }
  }

  async function deletePost(): Promise<void> {
    setModeDelete(false)
    await requestDelete()
  }

  function finishUpdate(): void {
    setModeUpdate(false)
    setPayloadPost(getPostData(post))
  }

  // Shorten location text
  function pipeLocation(location: string): string {
    return (
      location
        .split('')
        .filter((_, i) => i < 9)
        .join('') + (post.location.length > 9 ? '...' : '')
    )
  }

  // Get time-ago to show readable time
  function pipeTime(timeStamp: string): string {
    moment.locale('es')
    const date = new Date(timeStamp)
    const timeAgo = moment(date).startOf('hour').fromNow()
    return timeAgo
  }

  useEffect(() => {
    if (postUpdated) {
      setPost(postUpdated)
      props.refresh()
    }
  }, [postUpdated])

  useEffect(() => {
    if (postCreated) {
      setPayloadPost(getPostData(post))
      props.refresh()
    }
  }, [postCreated])

  useEffect(() => {
    if (postDeleted) {
      props.refresh()
    }
  }, [postDeleted])

  useEffect(() => {
    if (postUpdated && modeUpdate) finishUpdate()
  }, [post])

  useEffect(() => {
    setLoading(loadingUpdate || loadingCreate || loadingDelete)
  }, [loadingUpdate, loadingCreate, loadingDelete])

  return (
    <div className={'post' + (modeInput ? ' mode-input attention' : '')}>
      {modeDelete && (
        <div className="t-modal config">
          <button className="t-button solid" onClick={() => deletePost()}>
            <span>Confirmar</span>
          </button>
          <button className="t-button regular" onClick={() => setModeDelete(false)}>
            <span>Cancelar</span>
          </button>
        </div>
      )}

      <header>
        <Avatar user={author} />
        <div className="menu">
          {modeInput ? (
            <div className={'control' + (loading ? '' : ' active')}>
              <div onClick={savePost}>{loading ? <IconLoading /> : <IconSave />}</div>

              {!modeCreate && (
                <div onClick={finishUpdate}>
                  <IconCancel />
                </div>
              )}
            </div>
          ) : (
            userSession.role === Role.Admin && (
              <div onClick={() => setShowMenu(!showMenu)}>
                <IconMenu />
              </div>
            )
          )}

          <ul className={'dropdown-menu' + (showMenu ? ' active' : '')} onMouseLeave={() => setShowMenu(false)}>
            <li
              onClick={() => {
                setShowMenu(false)
                setModeUpdate(true)
              }}
            >
              Editar
            </li>
            <li
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setShowMenu(false)
                setModeDelete(true)
              }}
            >
              Eliminar
            </li>
          </ul>
        </div>
      </header>

      {modeInput ? (
        <div className="image-post attention">
          <input
            type="file"
            accept="image/gif, image/jpeg, image/png"
            disabled={loading}
            onInput={({ target }: TEventInput) => populatePost('image', target.value)}
          />
        </div>
      ) : (
        image && (
          <div
            className="image-post"
            style={{
              backgroundImage: `url(${image})`
            }}
          ></div>
        )
      )}

      <div className={'container-content'} style={{ flexFlow: image ? 'column' : 'column-reverse' }}>
        <div className="like-location">
          <div className="like">
            <div onClick={() => setLike(!like)}>
              <IconHeart style={like ? 'solid' : 'regular'} />
            </div>
            <span>{post.likes.length} Likes</span>
          </div>

          <div className="location attention">
            <IconLocation />
            {modeInput ? (
              <input
                type="text"
                defaultValue={post.location}
                disabled={loading}
                onInput={({ target }: TEventInput) => populatePost('location', target.value)}
              />
            ) : (
              <span>{pipeLocation(post.location)}</span>
            )}
          </div>
        </div>

        <div className="message attention">
          {modeInput ? (
            <textarea
              rows={3}
              defaultValue={post.message}
              disabled={loading}
              onInput={({ target }: TEventInput) => populatePost('message', target.value)}
            />
          ) : (
            post.message
          )}
        </div>
      </div>

      <footer>
        {modeUpdate ? (
          <div className="status attention">
            <select
              defaultValue={post.status}
              disabled={loading}
              onChange={({ target }: TEventSelect) => populatePost('status', target.value)}
            >
              <option value={Status.Deleted}>Eliminado</option>
              <option value={Status.Drafted}>Preparado</option>
              <option value={Status.Published}>Publicado</option>
            </select>
          </div>
        ) : (
          <div className="t-badge">{post.status}</div>
        )}
        <span>{pipeTime(post.updatedAt)}</span>
      </footer>
    </div>
  )
}
