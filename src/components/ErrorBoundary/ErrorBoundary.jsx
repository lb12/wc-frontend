import React from "react";
import { withTranslation } from "react-i18next";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null
    };
  }
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info
    });
  }
  render() {
    const { t } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div>
          <h1>{t("SOMETHING_WENT_WRONG_ERROR")} :(</h1>
          <p>
            {t("THE_ERROR")}: {this.state.error.toString()}
          </p>
          <p>
            {t("WHERE_IT_OCCURED")}: {this.state.info.componentStack}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
export default withTranslation()(ErrorBoundary);
