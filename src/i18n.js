import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./locales/en.json";
import plTranslations from "./locales/pl.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      pl: {
        translation: plTranslations
      }
    },
    lng: "pl", // default language
    fallbackLng: "pl",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
