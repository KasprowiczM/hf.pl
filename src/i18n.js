import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import plTranslations from './locales/pl.json';

const SUPPORTED_LANGUAGES = ['pl', 'en'];
const STORAGE_KEY = 'hf-pl.language';

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

export function persistLanguage(language) {
  if (typeof window === 'undefined') {
    return;
  }

  const nextLanguage = normalizeLanguage(language) || 'pl';
  const url = new URL(window.location.href);

  if (nextLanguage === 'pl') {
    url.searchParams.delete('lang');
  } else {
    url.searchParams.set('lang', nextLanguage);
  }

  window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
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
