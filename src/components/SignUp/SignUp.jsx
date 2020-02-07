// React imports
import React from "react";

// Global components imports
import Form from "../Form";
import Input from "../Input";
import ErrorNotifier from "../ErrorNotifier";


export default class SignUp extends React.Component {
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
    const { username, email, password } = inputs;

    if (!username || !email || !password) {
      errorMessage.push("Rellena los campos obligatorios");
      this.setState({ showError: true, errorMessage });
      return;
    }

    if (username.length < 4 || password.length < 6) {
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
    const { isLogged } = this.props;
    return (
      <div>
        {!isLogged && (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </div>
    );
  }
}
