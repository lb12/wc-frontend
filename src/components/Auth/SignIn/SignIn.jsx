// React imports
import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

// Global components imports
import Form from "../../Form";
import Input from "../../Input";
import Spinner from "../../Spinner";
import ErrorNotifier from "../../ErrorNotifier";
import "./SignIn.css";
import "../Auth.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      isLoading: false,
      errorMessage: []
    };
  }

  componentDidMount() {
    this.props.isLogged && this.props.history.push("/my-zone"); // Redirect user to private zone
  }

  onSubmit = async inputs => {
    let errorMessage = [];
    const { username, password } = inputs;
    const { t } = this.props;

    if (!username || !password) {
      errorMessage.push(t("ERROR_FILL_REQUIRED_FIELDS"));
      this.setState({ showError: true, errorMessage });
      return;
    }

    if (username.length < 4 || password.length < 6) {
      if (username.length < 4) {
        errorMessage.push(t("USERNAME_4_CHARS_LONG"));
      }

      if (password.length < 6) {
        errorMessage.push(t("PASSWORD_6_CHARS_LONG"));
      }

      this.setState({ showError: true, errorMessage });
      return;
    }

    const user = { username, password };

    this.setState({ isLoading: true });

    await this.props.signInUser(user);

    const result = this.props.user;

    // El usuario NO se guardó bien
    if (result.errors) {
      this.setState({ showError: true, errorMessage: result.errors, isLoading: false });
      return;
    }

    this.setState({ isLoading: false });

    this.props.history.push("/my-zone"); // Redirect user to home page always
  };

  render() {
    const { showError, errorMessage, isLoading } = this.state;
    const { t, isLogged } = this.props;
    return (
      <div className="sign-in-up-container">
        {!isLogged && (
          <React.Fragment>
            <h1 className="sign-in-up-header-text font-size-2 text-center">
              {t("SIGN_IN")}
            </h1>
            {showError && errorMessage && errorMessage.length > 0 && (
              <ErrorNotifier errors={errorMessage} />
            )}

            <Spinner isLoading={isLoading} />

            <Form onSubmit={this.onSubmit}>
              <div className="form-group">
                <Input
                  type="text"
                  required
                  name="username"
                  className="form-control"
                  placeholder={t("USERNAME")}
                />
              </div>
              <div className="form-group">
                <Input
                  type="password"
                  required
                  name="password"
                  className="form-control"
                  placeholder={t("PASSWORD")}
                />
              </div>
              <Link to="/forgot-password" className="d-block text-center mb-2">
                {t("I_HAVE_FORGOT_MY_PASSWORD")}
              </Link>
              <button type="submit" className="btn btn-primary submit-btn" disabled={isLoading}>
                {t("SIGN_IN")}
              </button>
            </Form>

            <div className="sign-in-container-redirect">
              <span>{t("DONT_HAVE_AN_ACCOUNT")}?</span>
              <span className="sign-in-redirect-link">
                <Link to="/sign-up">
                  <strong> {t("SIGN_UP")}!</strong>
                </Link>
              </span>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default withTranslation()(SignIn);
