import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const fallbackLng = ["es"];
const availableLanguages = ["es", "en"];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          SIGN_IN: "Sign in",
          SIGN_UP: "Sign up",
          EXIT: "Exit",
          WEBPAGE_MADE_BY: "Web page made by"
        }
      },
      es: {
        translations: {
          SIGN_IN: "Iniciar sesión",
          SIGN_UP: "Registrarse",
          EXIT: "Salir",
          WEBPAGE_MADE_BY: "Página web hecha por"
        }
      }
    },
    fallbackLng, // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    debug: true,
    whitelist: availableLanguages,
    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
