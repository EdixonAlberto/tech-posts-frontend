import './Login.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  return (
    <div className="login">
      <div className="card">
        <div className="content">
          <div className="t-input">
            <svg className="t-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <input type="text" placeholder="Username" onInput={({ target }: any) => setUsername(target.value)} />
          </div>

          <button disabled={!username} type="submit" onClick={() => navigate('/', { replace: true })}>
            <span>Entrar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
