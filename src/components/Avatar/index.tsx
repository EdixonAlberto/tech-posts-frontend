import './Avatar.scss'
import { IconAvatar } from '~/components/icons/IconAvatar'

interface IAvatarProps {
  user: IUser
  bigSize?: boolean
}

export function Avatar({ user, bigSize }: IAvatarProps) {
  const { avatar = '', username, role } = user

  return (
    <div className={'avatar ' + (bigSize ? 'big' : 'small')}>
      <div className="image">{avatar ? <img src={avatar} alt="avatar" draggable="false" /> : <IconAvatar />}</div>

      <div className="info">
        <span>@{username}</span>
        <div className="t-badge">{role}</div>
      </div>
    </div>
  )
}
