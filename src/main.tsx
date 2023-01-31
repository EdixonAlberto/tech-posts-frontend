import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// VIEWS
import './scss/main.scss'
import { Auth } from '~/views/Auth'
import { Home } from './views/Home'
import { Login } from '~/views/Auth/Login'
import { Signup } from '~/views/Auth/Signup'

const isMobile = window.screen.width < 768

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* No me dio tiempo, por eso muestro este mensaje 😔 */}
    {isMobile ? (
      <div className="is-mobile">
        <span>Por el momento esta página solo está disponible para su visualización en el escritorio</span>
      </div>
    ) : (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth children={<Home />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    )}
  </React.StrictMode>
)
