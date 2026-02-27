import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './Router.tsx'

console.log('=== KAI DEBUGGING: ===')
console.log('Main.tsx loading, root element:', document.getElementById('root'))
console.log('Starting render...')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {(() => {
      console.log('Rendering App component...')
      return <App />
    })()}
  </StrictMode>,
)

console.log('Render completed!')
