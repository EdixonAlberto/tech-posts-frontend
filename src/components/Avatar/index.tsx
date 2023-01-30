import './Avatar.scss'

interface IAvatarProps {
  image?: string
  bigSize?: boolean
  username?: string
}

export function Avatar({ image = '', bigSize = false, username = 'username' }: IAvatarProps) {
  return (
    <div className="avatar">
      <img className={bigSize ? 'big' : 'small'} src={image} alt="avatar" draggable="false" />
      <span className={(bigSize ? 'text-xl' : '') + ' ml-3'}>@{username}</span>
    </div>
  )
}
