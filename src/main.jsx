import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { recurso } from './utils/recurso'
import './index.css'

// La textura de fondo se referencia desde index.css, donde Vite no reescribe
// rutas absolutas: se inyecta aqui para que respete la base del sitio.
document.documentElement.style.setProperty(
  '--textura-tela',
  `url(${recurso('assets/textura-tela.webp')})`,
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
