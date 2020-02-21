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
        <h2 className="text-center">{t("SOMETHING_WENT_WRONG_ERROR")} :(</h2>
        <p className="text-center">{t("PAGE_DOES_NOT_EXIST")}</p>
        <Link to="/" className="btn btn-primary">
          {t("GO_BACK")}
        </Link>
      </div>
    );
  }
}
export default withTranslation()(NotFoundPage);
