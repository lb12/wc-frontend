import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

import "./Navbar.css";

class Navbar extends React.Component {
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
          <span className="nav-logo">Wallaclone</span>
        </Link>

        <ul className="navbar-nav flex-row justify-content-end flex-wrap">
          {!this.isUserLogged() ? (
            <li className="nav-item">
              <Link to="/sign-in">{t("SIGN_IN")}</Link>
            </li>
          ) : (
            <React.Fragment>
              <li className="nav-item">
                <Link to="/my-zone">{t("MY_ZONE")}</Link>
              </li>
              <li className="nav-item pl-3">
                <Link onClick={this.logout} to="/">
                  {t("EXIT")}
                </Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    );
  }
}

export default withTranslation()(Navbar);
