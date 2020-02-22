import React from "react";
import { withTranslation } from "react-i18next";
import ErrorNotifier from "../../ErrorNotifier";
import "./Unsubscribe.css";
import Spinner from "../../Spinner";

class Unsubscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ensured: false,
      isLoading: false
    };
  }

  onInputChange = evt => {
    const { value } = evt.target;
    const { t } = this.props;

    this.setState({ ensured: value === t("DELETE_MY_PROFILE") });
  };

  onSubmit = async () => {
    this.setState({ isLoading: true });
    await this.props.unsubscribe();
    this.setState({ isLoading: false });
  };

  render() {
    const { t, errorMessage } = this.props;
    const { ensured, isLoading } = this.state;

    return (
      <div className="unsubscribe-container d-flex flex-column align-items-center p-3">
        <h1 className="unsubscribe-header-text font-size-2 text-center">
          {t("UNSUBSCRIBE")}
        </h1>
        <div>
          {errorMessage &&
            errorMessage.errors &&
            errorMessage.errors.length > 0 && (
              <ErrorNotifier errors={errorMessage.errors} />
            )}
          <Spinner isLoading={isLoading} />
          <div className="form-group">
            <label htmlFor="secure-unsubscription">
              {t("UNSUBSCRIBE_LABEL", { code: t("DELETE_MY_PROFILE") })}
            </label>
            <input
              type="text"
              required
              name="secure-unsubscription"
              id="secure-unsubscription"
              className="form-control"
              placeholder={t("DELETE_MY_PROFILE")}
              onChange={this.onInputChange}
            />
          </div>
          <button
            disabled={!ensured || isLoading}
            onClick={this.onSubmit}
            className="btn btn-primary submit-btn"
          >
            {t("UNSUBSCRIBE")}
          </button>
        </div>
      </div>
    );
  }
}
export default withTranslation()(Unsubscribe);
