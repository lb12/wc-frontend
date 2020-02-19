// React imports
import React from "react";
import { withTranslation } from "react-i18next";

// Our imports
import Form from "../../Form";
import Input from "../../Input";
import ErrorNotifier from "../../ErrorNotifier";
import { sendPasswordRecoverEmail } from "../../../services/APIService";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: false,
      emailSent: false,
      errorMessage: []
    };
  }

  // Metodo para enviar peticion al backend de envío de email con el lin de cambio
  sendEmail = async inputs => {
    const { email } = inputs;
    const { t } = this.props;
    const errorMessage = [];

    if (!email) {
      errorMessage.push(t("EMAIL_REQUIRED_FIELD"));

      return this.setState({ showError: true, errorMessage });
    }

    const response = await sendPasswordRecoverEmail(email);

    if (response.success) {
      return this.setState({
        showError: false,
        emailSent: true
      });
    }

    // No es success => tratamos los errores

    const { success, message } = response.data;

    if (!success && message && message.length > 0) {
      errorMessage.push(t(message));
    }

    this.setState({
      showError: true,
      errorMessage
    });
  };

  render() {
    const { t } = this.props;
    const { showError, errorMessage, emailSent } = this.state;
    return (
      <div className="sign-in-up-container">
        <React.Fragment>
          <h1 className="sign-in-up-header-text font-size-2 text-center">
            {t("FORGOT_PASSWORD")}
          </h1>

          {showError && errorMessage && errorMessage.length > 0 && (
            <ErrorNotifier errors={errorMessage} />
          )}

          {emailSent && (
            <div className="alert alert-success" role="alert">
              <strong>{t("PASSWORD_EMAIL_SENT")}</strong>
            </div>
          )}

          <Form onSubmit={this.sendEmail}>
            <div className="form-group">
              <label htmlFor="email">{t("FORGOT_PASSWORD_LABEL")}</label>
              <Input
                type="email"
                name="email"
                id="email"
                required
                className="form-control"
                placeholder={t("EMAIL")}
              />
            </div>
            <button type="submit" className="btn btn-primary submit-btn">
              {t("RECOVER_PASSWORD")}
            </button>
          </Form>
        </React.Fragment>
      </div>
    );
  }
}

export default withTranslation()(ForgotPassword);
