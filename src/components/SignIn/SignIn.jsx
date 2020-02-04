import React from "react";

import { Link } from "react-router-dom";

import Form from "../Form";
import Input from "../Input";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false
    };
  }

  onSubmit = inputs => {
    const { username, password } = inputs;

    if (!username || !password) {
      this.setState({ showError: true });
      return;
    }

    this.setState({ showError: false });

    const user = { username, password };

    // this.props.setUser(user); // Save user into redux-store
    this.props.history.push("/my-zone"); //  Redirect user to home page always
  };

  render() {
    const { showError } = this.state;
    return (
      <div>
        <h1>SignIn</h1>
        {showError && (
          <span className="empty-field-error">Rellena los campos obligatorios</span>
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
      </div>
    );
  }
}
