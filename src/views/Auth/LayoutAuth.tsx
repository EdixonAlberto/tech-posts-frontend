import './Auth.scss'
import { PropsWithChildren } from 'react'

export interface ILayoutAuthProps extends PropsWithChildren {
  className?: string
}

export function LayoutAuth({ children, className }: ILayoutAuthProps) {
  return (
    <div className={`layout-auth ${className}`}>
      <div className="card">
        <div className="logo">
          <img src="/static/img/logo-light.png" alt="company logo" />
          <h2>Tech Inc</h2>
        </div>
        {children}
      </div>
    </div>
  )
}
