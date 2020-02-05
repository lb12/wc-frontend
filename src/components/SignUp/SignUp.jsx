// React imports
import React from "react";

// Global components imports
import Form from "../Form";
import Input from "../Input";
import ErrorNotifier from "../ErrorNotifier";

// Utils and services imports
import { signUp } from "../../services/APIService";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      errorMessage: ["Rellena los campos obligatorios"]
    };
  }

  onSubmit = async inputs => {
    const { username, email, password } = inputs;

    if (!username || !email || !password) {
      this.setState({ showError: true });
      return;
    }

    if (username.length < 4 || password.length < 6) {
      let errorMessage = [];

      if (username.length < 4) {
        errorMessage.push("Usuario 4 chars como minimo");
      }

      if (password.length < 6) {
        errorMessage.push("Password 6 chars como minimo");
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
    return (
      <div>
        <h1>Sign up</h1>

        {showError && errorMessage && errorMessage.length > 0 && (
          <ErrorNotifier errors={errorMessage} />
        )}

        <Form onSubmit={this.onSubmit}>
          <Input
            type="text"
            required
            name="username"
            className="form-control"
            placeholder="Enter username"
          />
          <Input
            type="email"
            required
            name="email"
            className="form-control"
            placeholder="Enter email"
          />
          <Input
            type="password"
            required
            name="password"
            className="form-control"
            placeholder="Enter password"
          />
          <button type="submit">Sign up</button>
        </Form>
      </div>
    );
  }
}
