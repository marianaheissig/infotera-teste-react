import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SharedDataProvider } from './context/SharedData.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SharedDataProvider>
      <App />
    </SharedDataProvider>
  </StrictMode>,
)
