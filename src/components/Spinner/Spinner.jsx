import React from "react";
import { withTranslation } from "react-i18next";

class Spinner extends React.Component {
  render() {
    const { isLoading, t } = this.props;
    return (
      <React.Fragment>
        {isLoading && (
          <div className="spinner-border" role="status">
            <span className="sr-only">{t("LOADING")}...</span>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default withTranslation()(Spinner);
