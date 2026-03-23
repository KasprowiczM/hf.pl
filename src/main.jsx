import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './i18n.js'
import App from './App.jsx'

// Initialize theme on load
const initializeTheme = () => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'system';
  if (savedTheme === 'dark') {
    root.classList.add('dark');
  } else if (savedTheme === 'system') {
    root.classList.remove('dark');
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    }
  } else {
    root.classList.remove('dark');
  }
};

const initializeFontScale = () => {
  const fontScale = Number(localStorage.getItem('fontScale') || '1');
  document.documentElement.style.setProperty('--font-scale', String(fontScale));
};

// Run on initial load
initializeTheme();
initializeFontScale();

// Also listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const savedTheme = localStorage.getItem('theme') || 'system';
  if (savedTheme === 'system') {
    if (e.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
