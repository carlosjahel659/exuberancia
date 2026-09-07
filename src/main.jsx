import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { recurso } from './utils/recurso'
import './index.css'

document.documentElement.style.setProperty('--textura-tela', 'url(' + recurso('assets/textura-tela.webp') + ')')
const root = document.getElementById('root')
const app = <React.StrictMode><App /></React.StrictMode>
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
