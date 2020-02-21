// React imports
import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";

// Our imports
import Form from "../../Form";
import Input from "../../Input";
import Spinner from "../../Spinner";
import ErrorNotifier from "../../ErrorNotifier";
import errorCheckers from "../../../utils/errorCheckers";
import {
  getEmailFromRecoveryToken,
  changePasswordFromRecoveryToken
} from "../../../services/APIService";

class ResetPassword extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      errorMessage: [],
      passUpdated: false,
      isLoading: true,
      showError: false
    };
  }

  // Obtiene el email si el token es valido
  async componentDidMount() {
    const { token } = this.props.match.params;
    const { t } = this.props;
    let errorMessage = [];

    // validamos el token
    const response = await getEmailFromRecoveryToken(token);
    
    this.setState({ passUpdated: false, isLoading: false });

    // todo ha ido bien
    if (response.success) {
      const { email } = response.result;
      return this.setState({ showError: false, email });
    }

    // ha ocurrido un error, lo mostramos
    errorMessage = errorCheckers(response, t);

    this.setState({ showError: true, errorMessage });
  }

  // Metodo para cambiar la contraseña
  updatePassword = async inputs => {
    const { password } = inputs;
    const { email } = this.state;
    const { t, match } = this.props;
    const { token } = match.params;
    let errorMessage = [];

    if (!password) {
      errorMessage.push(t("PASSWORD_REQUIRED_FIELD"));

      return this.setState({ showError: true, errorMessage });
    }

    this.setState({ isLoading: true });

    const response = await changePasswordFromRecoveryToken({
      email,
      password,
      token
    });

    if (response.success) {
      return this.setState({ passUpdated: true, showError: false, isLoading: false });
    }

    // No es success => tratamos los errores

    errorMessage = errorCheckers(response, t);
    this.setState({
      passUpdated: false,
      isLoading: false,
      showError: true,
      errorMessage
    });    
  };

  render() {
    const { t } = this.props;
    const { showError, isLoading, passUpdated, errorMessage } = this.state;
    return (
      <div className="sign-in-up-container">
        <React.Fragment>
          <h1 className="sign-in-up-header-text font-size-2 text-center">
            {t("CHANGE_PASSWORD")}
          </h1>
          {showError && errorMessage && errorMessage.length > 0 && (
            <ErrorNotifier errors={errorMessage} />
          )}

          {isLoading && (
            <Spinner isLoading={isLoading}/>
          )}

          {passUpdated && (
            <div className="alert alert-success" role="alert">
              <strong>{t("PASSWORD_CHANGED_MESSAGE")}</strong>
            </div>
          )}

          {(!errorMessage ||
            (errorMessage &&
              errorMessage[0] !== t("Token is invalid or has expired"))) && (
            <Form onSubmit={this.updatePassword}>
              <div className="form-group">
                <Input
                  type="password"
                  name="password"
                  required
                  className="form-control"
                  placeholder={t("PASSWORD")}
                />
              </div>
              <button type="submit" className="btn btn-primary submit-btn">
                {t("CHANGE_PASSWORD")}
              </button>
            </Form>
          )}
        </React.Fragment>
      </div>
    );
  }
}
export default withTranslation()(ResetPassword);

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    })
  })
};
