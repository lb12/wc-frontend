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
  }

  render() {
    const { t } = this.props;
    return (
      <nav className="main-navbar">
        <div className="logo-container">
          <Link className="nav-link" to="/">
            <span>Wallaclone</span>
          </Link>
        </div>
        {!this.isUserLogged() && (
          <div className="sign-in-container">
            <Link className="nav-link" to="/sign-in">
              {t('SIGN_IN')}
            </Link>
          </div>
        )}
        {this.isUserLogged() && (
          <div className="sign-in-container">
            <Link className="nav-link" onClick={this.logout} to="/">
            {t('EXIT')}
            </Link>
          </div>
        )}
      </nav>
    );
  }
}

export default withTranslation()(Navbar);
