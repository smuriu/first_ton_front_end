import React from 'react'
import ReactDOM from 'react-dom/client'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import App from './App.tsx'
import './index.css'

// this manifest is used temporarily for development purposes
const manifestUrl = 'https://smuriu.github.io/first_ton_front_end/tonconnect-manifest.json'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>,
)
