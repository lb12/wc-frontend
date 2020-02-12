// React imports
import React from "react";
import { useTranslation } from "react-i18next";

// Component imports
import "./Translator.css";

export default function Translator() {
  const { i18n } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <aside>
      <div className="translation-container">
        <img
          src="/img/flag_es.png"
          alt="es"
          onClick={() => changeLanguage("es")}
        />
        <img
          src="/img/flag_en.png"
          alt="en"
          onClick={() => changeLanguage("en")}
        />
      </div>
    </aside>
  );
}
