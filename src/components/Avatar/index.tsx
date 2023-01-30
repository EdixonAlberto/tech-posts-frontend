import './Avatar.scss'
import { IconAvatar } from '~/components/icons/IconAvatar'

interface IAvatarProps {
  image?: string
  bigSize?: boolean
  username?: string
}

export function Avatar({ image = '', bigSize = false, username = 'username' }: IAvatarProps) {
  return (
    <div className="avatar">
      <div className={'image ' + (bigSize ? 'big' : 'small')}>
        {image ? <img src={image} alt="avatar" draggable="false" /> : <IconAvatar />}
      </div>

      <span className={bigSize ? 'big' : 'small'}>@{username}</span>
    </div>
  )
}
