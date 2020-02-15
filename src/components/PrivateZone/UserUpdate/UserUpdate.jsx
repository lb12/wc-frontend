import React from "react";

import ErrorNotifier from "../../ErrorNotifier";
import { withTranslation } from "react-i18next";
import { withRouter } from 'react-router-dom';

class UserUpdate extends React.Component {
  constructor(props) {
    super(props);

    const { username, email } = this.props.user.user;

    this.state = {
      user: {
        username,
        email,
        password: ""
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
    const { password } = this.state.user;
    const { t } = this.props;
    let errorMessage = [];

    if (!password) {
      errorMessage.push(t("ERROR_FILL_REQUIRED_FIELDS"));
      this.setState({
        passwordErrorManager: { showError: true, errorMessage }
      });
      return;
    }

    if (password.length < 6) {
      errorMessage.push(t("ERROR_PASSWORD_6_CHARS"));
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
    const { username, email, password } = user;

    return (
      <div className="user-update-container">
        <h1>{t("UPDATE_MY_DATA")}</h1>

        <div className="">
          <h2>{t("CHANGE_USERNAME_EMAIL")}</h2>
          {usernameEmailErrorManager.showError &&
            usernameEmailErrorManager.errorMessage &&
            usernameEmailErrorManager.errorMessage.length > 0 && (
              <ErrorNotifier errors={usernameEmailErrorManager.errorMessage} />
            )}
          <form onSubmit={this.onLoginSubmit}>
            <div className="form-group">
              <input
                required
                type="text"
                name="username"
                value={username}
                onChange={this.onInputChange}
                className="form-control"
                placeholder={t("USERNAME")}
              />
            </div>
            <div className="form-group">
              <input
                required
                type="email"
                name="email"
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

        <div className="">
          <h2>{t("CHANGE_PASSWORD")}</h2>
          {passwordErrorManager.showError &&
            passwordErrorManager.errorMessage &&
            passwordErrorManager.errorMessage.length > 0 && (
              <ErrorNotifier errors={passwordErrorManager.errorMessage} />
            )}
          <form onSubmit={this.onPasswordSubmit}>
            <div className="form-group">
              <input
                required
                type="password"
                name="password"
                value={password}
                onChange={this.onInputChange}
                className="form-control"
                placeholder={t("PASSWORD")}
              />
              <button type="submit" className="btn btn-primary submit-btn">
                {t("CHANGE_PASSWORD")}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(withTranslation()(UserUpdate));
