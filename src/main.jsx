import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './i18n.js'
import App from './App.jsx'

const THEME_KEY = 'theme';

function applyTheme(theme) {
  const root = document.documentElement;
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  root.classList.toggle('dark', isDark);
  root.style.colorScheme = isDark ? 'dark' : 'light';
}

function initializeFontScale() {
  const scale = Number(localStorage.getItem('fontScale') || '1');
  document.documentElement.style.setProperty('--font-scale', String(scale));
}

applyTheme(localStorage.getItem(THEME_KEY) || 'system');
initializeFontScale();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const saved = localStorage.getItem(THEME_KEY) || 'system';
  if (saved === 'system') applyTheme('system');
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
