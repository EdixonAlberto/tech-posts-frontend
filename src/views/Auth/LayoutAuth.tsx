import './Auth.scss'
import { PropsWithChildren } from 'react'

export interface ILayoutAuthProps extends PropsWithChildren {
  className?: string
  avatar?: string
  username?: string
}

export function LayoutAuth({ children, className, avatar, username }: ILayoutAuthProps) {
  return (
    <div className={`layout-auth ${className}`}>
      <div className="card">
        <div className="container-avatar">
          <div className="logo">
            <img src="/static/img/logo-light.png" alt="company logo" />
            <h2>Tech Inc</h2>
          </div>

          {(avatar || username) && (
            <div className="logo">
              <img className="user-avatar" src={avatar || '/static/img/default-avatar.png'} alt="" />
              <h2>@{username}</h2>
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
