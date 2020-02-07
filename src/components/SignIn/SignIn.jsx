// React imports
import React from "react";
import { Link } from "react-router-dom";

// Global components imports
import Form from "../Form";
import Input from "../Input";
import ErrorNotifier from "../ErrorNotifier";


export default class SignIn extends React.Component {
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

    if (!username || !password) {
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
    const { isLogged } = this.props;
    return (
      <div>
        {!isLogged && (
          <React.Fragment>
            <h1>SignIn</h1>
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
                type="password"
                required
                name="password"
                className="form-control"
                placeholder="Enter password"
              />
              <button type="submit">Sign in</button>
            </Form>

            <hr />

            <span>
              No tengo cuenta,{" "}
              <Link to="/sign-up">
                <span style={{ fontSize: "20px" }}>quiero registrarme</span>
              </Link>
              .
            </span>
          </React.Fragment>
        )}
      </div>
    );
  }
}
