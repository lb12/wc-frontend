import React from "react";

import ErrorNotifier from "../../ErrorNotifier";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

import './UserUpdate.css';

class UserUpdate extends React.Component {
  constructor(props) {
    super(props);

    const { username, email } = this.props.user.user;

    this.state = {
      user: {
        username,
        email,
        password: "",
        confirmPassword: ""
      },
      usernameEmailErrorManager: {
        showError: false,
        errorMessage: []
      },
      passwordErrorManager: {
        showError: false,
        errorMessage: []
      }
    };
  }

  onInputChange = evt => {
    const { name, value } = evt.target;

    this.setState(({ user }) => ({
      user: {
        ...user,
        [name]: value
      }
    }));
  };

  onLoginSubmit = async evt => {
    evt && evt.preventDefault();
    const { username, email } = this.state.user;
    const { t } = this.props;
    let errorMessage = [];

    if (!username || !email) {
      errorMessage.push(t("ERROR_FILL_REQUIRED_FIELDS"));
      this.setState({
        usernameEmailErrorManager: { showError: true, errorMessage }
      });
      return;
    }

    if (username.length < 4) {
      errorMessage.push(t("ERROR_USER_4_CHARS"));
      this.setState({
        usernameEmailErrorManager: { showError: true, errorMessage }
      });
      return;
    }

    this.setState({
      usernameEmailErrorManager: { showError: false, errorMessage: [] }
    });

    await this.props.updateLoginCredentials({ username, email });

    const result = this.props.user;

    // El usuario NO se guardó bien
    if (result.errors) {
      this.setState({
        usernameEmailErrorManager: {
          showError: true,
          errorMessage: result.errors
        }
      });
      return;
    }

    // redirijo a su zona privada
    this.props.history.push("/my-zone");
  };

  onPasswordSubmit = async evt => {
    evt && evt.preventDefault();
    const { password, confirmPassword } = this.state.user;
    const { t } = this.props;
    let errorMessage = [];

    if (!password || !confirmPassword) {
      errorMessage.push(t("ERROR_FILL_REQUIRED_FIELDS"));
      this.setState({
        passwordErrorManager: { showError: true, errorMessage }
      });
      return;
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      errorMessage.push(t("ERROR_PASSWORD_6_CHARS"));
      this.setState({
        passwordErrorManager: { showError: true, errorMessage }
      });
      return;
    }

    if (password !== confirmPassword) {
      errorMessage.push(t("ERROR_PASSWORD_NOT_EQUALS"));
      this.setState({
        passwordErrorManager: { showError: true, errorMessage }
      });
      return;
    }

    this.setState({
      passwordErrorManager: { showError: false, errorMessage: [] }
    });

    await this.props.updatePassword(password);

    const result = this.props.user;

    // El usuario NO se guardó bien
    if (result.errors) {
      this.setState({
        passwordErrorManager: { showError: true, errorMessage: result.errors }
      });
      return;
    }

    // redirijo a su zona privada
    this.props.history.push("/my-zone");
  };

  render() {
    const { t } = this.props;
    const {
      user,
      usernameEmailErrorManager,
      passwordErrorManager
    } = this.state;
    const { username, email, password, confirmPassword } = user;

    return (
      <div className="user-update-container p-3">
        <h1 className="font-size-2 text-center mt-5 mb-5">
          {t("UPDATE_MY_DATA")}
        </h1>

        <div className="card mb-5">
          <div className="card-header">
            <h2 className="font-size-1-5 m-0">{t("CHANGE_USERNAME_EMAIL")}</h2>
          </div>
          <div className="p-4">
            {usernameEmailErrorManager.showError &&
              usernameEmailErrorManager.errorMessage &&
              usernameEmailErrorManager.errorMessage.length > 0 && (
                <ErrorNotifier
                  errors={usernameEmailErrorManager.errorMessage}
                />
              )}
            <form className="d-flex  flex-column" onSubmit={this.onLoginSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="font-weight-bold">
                  {t("USERNAME")}
                </label>
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={this.onInputChange}
                  className="form-control"
                  placeholder={t("USERNAME")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="font-weight-bold">
                  {t("EMAIL")}
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={this.onInputChange}
                  className="form-control"
                  placeholder={t("EMAIL")}
                />
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                {t("CHANGE_USERNAME_EMAIL")}
              </button>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="font-size-1-5 m-0">{t("CHANGE_PASSWORD")}</h2>
          </div>
          <div className="p-4">
            {passwordErrorManager.showError &&
              passwordErrorManager.errorMessage &&
              passwordErrorManager.errorMessage.length > 0 && (
                <ErrorNotifier errors={passwordErrorManager.errorMessage} />
              )}
            <form className="d-flex  flex-column" onSubmit={this.onPasswordSubmit}>
              <div className="form-group">
                <label htmlFor="password" className="font-weight-bold">
                  {t("PASSWORD")}
                </label>
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={this.onInputChange}
                  className="form-control"
                  placeholder={t("PASSWORD")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword" className="font-weight-bold">
                  {t("CONFIRM_PASSWORD")}
                </label>
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={this.onInputChange}
                  className="form-control"
                  placeholder={t("CONFIRM_PASSWORD")}
                />
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                {t("CHANGE_PASSWORD")}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(withTranslation()(UserUpdate));
