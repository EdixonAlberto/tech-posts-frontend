import './Post.scss'
import { Avatar } from '~/components/Avatar'
import { IconMenu } from '~/components/icons/IconMenu'
import { IconHeart } from '~/components/icons/IconHeart'
import { useState } from 'react'

interface IPostProps {
  image?: string
}

export function Post({ image = '/static/img/default-banner.png' }: IPostProps) {
  const [like, setLike] = useState(false)

  return (
    <div className="post">
      <header>
        <Avatar />
        <IconMenu />
      </header>

      <div
        className="image-post"
        style={{
          backgroundImage: `url(${image})`
        }}
      ></div>

      <div className="like" onClick={() => setLike(!like)}>
        <IconHeart style={like ? 'solid' : 'regular'} />
        <span>20 Likes</span>
      </div>

      <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt ipsum consequuntur, eligendi ullam
        necessitatibus expedita corporis nobis repudiandae et praesentium?
      </div>

      <footer>Hace 10 horas</footer>
    </div>
  )
}
