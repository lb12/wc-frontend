import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import es from "../locales/es";
import en from "../locales/en";

export default i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en,
      es
    },
    fallbackLng: "es", // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    debug: false,
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false
    }
  });
