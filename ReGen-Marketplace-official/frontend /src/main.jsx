import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Polyfill for HashConnect compatibility
import { Buffer } from 'buffer';
window.Buffer = Buffer;
window.global = window;

// Suppress noise from browser extension errors (inpage.js errors from wallet extensions)
window.addEventListener('error', (event) => {
  if (event.filename && event.filename.includes('inpage.js') && event.message.includes('MetaMask')) {
    event.preventDefault();
    console.warn('⚠️ Suppressed browser extension error (non-critical):', event.message);
    return false;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && event.reason.message.includes('MetaMask')) {
    event.preventDefault();
    console.warn('⚠️ Suppressed browser extension promise rejection (non-critical):', event.reason.message);
    return false;
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
