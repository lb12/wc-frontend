import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import "./Navbar.css";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  isUserLogged = () => {
    return this.props.isLogged;
  };

  logout = () => {
    this.props.logout();
  };

  render() {
    const { t } = this.props;
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <Link className="navbar-brand" to="/">
          <span>Wallaclone</span>
        </Link>

        <ul className="navbar-nav">
          {!this.isUserLogged() ? (
            <li className="nav-item">
              <Link to="/sign-in">{t("SIGN_IN")}</Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link onClick={this.logout} to="/">
                {t("EXIT")}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

export default withTranslation()(Navbar);
