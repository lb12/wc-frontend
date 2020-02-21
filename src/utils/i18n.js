import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import es from "../locales/es";
import en from "../locales/en";

export default i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en, es },
    fallbackLng: "es",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false,
    interpolation: { escapeValue: false }
  });
