import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppLanguageProvider } from './i18n/AppLanguage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppLanguageProvider>
      <App />
    </AppLanguageProvider>
  </StrictMode>,
)
