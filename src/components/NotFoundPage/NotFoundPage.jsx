import React from "react";
import "./NotFoundPage.css";

import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

class NotFoundPage extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div className="not-found-page">
        <h1>404</h1>
        <h2 className="text-center">{t("ERROR_404_PAGE_MESSAGE_1")}</h2>
        <p className="text-center">{t("ERROR_404_PAGE_MESSAGE_2")}</p>
        <Link to="/" className="btn btn-primary">
          {t("GO_BACK")}
        </Link>
      </div>
    );
  }
}
export default withTranslation()(NotFoundPage);
