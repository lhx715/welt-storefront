import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LOCALE } from '@/shared/lib/locale'
import en from './locales/en'
import zh from './locales/zh'

/**
 * Both locales ship in the bundle: two languages of interface copy is a few
 * kilobytes. The production upgrade is lazy-loading namespaces, not whole
 * languages — product content already arrives localised from the catalogue.
 */
void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false },
  returnNull: false,
})

export default i18n
