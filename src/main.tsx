import { StrictMode } from 'react'; //helps identify potential problems during development
import { createRoot } from 'react-dom/client';//creates a React root that manages rendering inside a DOM element
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
