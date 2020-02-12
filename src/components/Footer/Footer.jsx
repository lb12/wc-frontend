import React from "react";

import "./Footer.css";
import Translator from "../Translator";
import { withTranslation } from "react-i18next";

class Footer extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <footer className="main-footer">
        <aside>
          <span>{t('WEBPAGE_MADE_BY')}</span>
          <a href="https://github.com/lb12" target="_blank" className="author">
            <span>David Escribano Rodríguez</span>
          </a>
        </aside>
        <Translator />
      </footer>
    );
  }
}

export default withTranslation()(Footer);
