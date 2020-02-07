// React imports
import React from "react";

// Global components imports
import Form from "../Form";
import Input from "../Input";
import ErrorNotifier from "../ErrorNotifier";
import { withTranslation } from "react-i18next";


class SignUp extends React.Component {
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
    const { t } = this.props;
    const { username, email, password } = inputs;

    if (!username || !email || !password) {
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

    const user = { username, email, password };

    await this.props.signUpUser(user);

    const result = this.props.user;

    // El usuario NO se guardó bien
    if (result.errors) {
      this.setState({ showError: true, errorMessage: result.errors });
      return;
    }

    // redirijo a su zona privada
    this.props.history.push("/my-zone");
  };

  render() {
    const { showError, errorMessage } = this.state;
    const { t, isLogged } = this.props;
    return (
      <div>
        {!isLogged && (
          <React.Fragment>
            <h1>{t("SIGN_UP")}</h1>

            {showError && errorMessage && errorMessage.length > 0 && (
              <ErrorNotifier errors={errorMessage} />
            )}

            <Form onSubmit={this.onSubmit}>
              <Input
                type="text"
                required
                name="username"
                className="form-control"
                placeholder={t("USERNAME")}
              />
              <Input
                type="email"
                required
                name="email"
                className="form-control"
                placeholder={t("EMAIL")}
              />
              <Input
                type="password"
                required
                name="password"
                className="form-control"
                placeholder={t("PASSWORD")}
              />
              <button type="submit">{t("SIGN_UP")}</button>
            </Form>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default withTranslation()(SignUp)