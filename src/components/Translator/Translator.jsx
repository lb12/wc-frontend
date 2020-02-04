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
    <div>
      <button onClick={() => changeLanguage("es")}>es</button>
      <button onClick={() => changeLanguage("en")}>en</button>
    </div>
  );
}
