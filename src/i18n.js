import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import plTranslations from './locales/pl.json';

const SUPPORTED_LANGUAGES = ['pl', 'en'];
const STORAGE_KEY = 'hf-pl.language';
const ENGLISH_PATH_PREFIX = '/en';

function normalizeLanguage(value) {
  if (!value) {
    return null;
  }

  const candidate = value.toLowerCase().slice(0, 2);
  return SUPPORTED_LANGUAGES.includes(candidate) ? candidate : null;
}

function detectInitialLanguage() {
  if (typeof window === 'undefined') {
    return 'pl';
  }

  if (window.location.pathname === ENGLISH_PATH_PREFIX || window.location.pathname.startsWith(`${ENGLISH_PATH_PREFIX}/`)) {
    return 'en';
  }

  const urlLanguage = normalizeLanguage(new URLSearchParams(window.location.search).get('lang'));
  if (urlLanguage) {
    return urlLanguage;
  }

  const storedLanguage = normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
  if (storedLanguage) {
    return storedLanguage;
  }

  return normalizeLanguage(window.navigator.language) || 'pl';
}

function getLocalizedPathname(currentPathname, language) {
  const basePath = currentPathname.replace(/^\/en(?=\/|$)/, '') || '/';
  if (language === 'en') {
    return basePath === '/' ? '/en/' : `/en${basePath}`;
  }

  return basePath;
}

export function persistLanguage(language) {
  if (typeof window === 'undefined') {
    return;
  }

  const nextLanguage = normalizeLanguage(language) || 'pl';
  const url = new URL(window.location.href);
  const pathname = getLocalizedPathname(url.pathname, nextLanguage);

  url.searchParams.delete('lang');

  window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  window.history.replaceState({}, '', `${pathname}${url.search}${url.hash}`);
  document.documentElement.lang = nextLanguage;
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    pl: {
      translation: plTranslations,
    },
  },
  supportedLngs: SUPPORTED_LANGUAGES,
  lng: detectInitialLanguage(),
  fallbackLng: 'pl',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
