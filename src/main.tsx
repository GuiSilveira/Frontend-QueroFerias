import React from 'react'
import ReactDOM from 'react-dom/client'
import '@tremor/react/dist/esm/tremor.css'
import 'kalend/dist/styles/index.css'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
