// React imports
import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

// Global components imports
import Form from "../Form";
import Input from "../Input";
import ErrorNotifier from "../ErrorNotifier";
import "./SignIn.css";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
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
        errorMessage.push(t("ERROR_USER_4_CHARS"));
      }

      if (password.length < 6) {
        errorMessage.push(t("ERROR_PASSWORD_6_CHARS"));
      }

      this.setState({ showError: true, errorMessage });
      return;
    }

    const user = { username, password };

    await this.props.signInUser(user);

    const result = this.props.user;

    // El usuario NO se guardó bien
    if (result.errors) {
      this.setState({ showError: true, errorMessage: result.errors });
      return;
    }

    this.props.history.push("/my-zone"); // Redirect user to home page always
  };

  render() {
    const { showError, errorMessage } = this.state;
    const { t, isLogged } = this.props;
    return (
      <div className="sign-in-container">
        {!isLogged && (
          <React.Fragment>
            <h1 className="sign-in-header-text font-size-2 text-center">
              {t("SIGN_IN")}
            </h1>
            {showError && errorMessage && errorMessage.length > 0 && (
              <ErrorNotifier errors={errorMessage} />
            )}

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
              <button type="submit" className="btn btn-primary submit-btn">
                {t("SIGN_IN")}
              </button>
            </Form>

            <div className="sign-in-up-container">
              <span>{t("DONT_HAVE_AN_ACCOUNT")}?</span>
              <span className="sign-in-up-link">
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
