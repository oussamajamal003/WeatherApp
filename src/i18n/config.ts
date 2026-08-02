import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from './locales/en/common.json';
import arCommon from './locales/ar/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  ar: {
    common: arCommon,
  },
  // Map other languages to English for now
  es: { common: enCommon },
  fr: { common: enCommon },
  de: { common: enCommon },
  it: { common: enCommon },
  pt: { common: enCommon },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'common',
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;