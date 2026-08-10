import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './src/css/tokens.css'
import './src/css/global.css'
import './src/css/shell.css'
import './src/css/status.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
