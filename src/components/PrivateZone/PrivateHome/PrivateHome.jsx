import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import './PrivateHome.css';

class PrivateHome extends React.Component {
  render() {
    const { t, user } = this.props;
    const { username } = user;
    return (
      <div className="private-home-container p-3">
        <h1 className="font-size-2 text-center mt-5 mb-3">
          {t("PERSONAL_AREA_OF", { username })}
        </h1>
        {/* MI CUENTA */}
        <div className="card mt-4 mb-3">
          <a
            htmlFor="collapseMyAccount"
            data-toggle="collapse"
            href="#collapseMyAccount"
            aria-expanded="true"
            aria-controls="collapseMyAccount"
            className="card-header d-flex justify-content-between align-items-center"
          >
            <h2 className="mb-0">{t("MY_ACCOUNT")}</h2>
            <div>
              <img src="/img/menu.png" alt="burger-menu" />
            </div>
          </a>

          <div id="collapseMyAccount" className="collapse show">
            <div className="card-wrapper">
              <div className="card-header">
                <Link to="/my-zone/update-my-data">
                  <h3 className="mb-0">{t("UPDATE_MY_DATA")}</h3>
                </Link>
              </div>
              <div className="card-header">
                <Link to="/my-zone/unsubscribe">
                  <h3 className="mb-0">{t("UNSUBSCRIBE")}</h3>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* MIS ANUNCIOS */}
        <div className="card mt-4 mb-3">
          <a
            htmlFor="collapseMyAds"
            data-toggle="collapse"
            href="#collapseMyAds"
            aria-expanded="true"
            aria-controls="collapseMyAds"
            className="card-header d-flex justify-content-between align-items-center"
          >
            <h2 className="mb-0">{t("MY_ADS")}</h2>
            <div>
              <img src="/img/menu.png" alt="burger-menu" />
            </div>
          </a>
          <div id="collapseMyAds" className="collapse show">
            <div className="card-wrapper">
              <div className="card-header">
                <Link to="/my-zone/my-adverts">
                  <h3 className="mb-0">{t("SEE_MY_ADS")}</h3>
                </Link>
              </div>
              <div className="card-header">
                <Link to="/my-zone/create-advert">
                  <h3 className="mb-0">{t("CREATE_NEW_ADVERT")}</h3>
                </Link>
              </div>
              <div className="card-header">
                <Link to="/my-zone/favourite-adverts">
                  <h3 className="mb-0">{t("SEE_MY_FAV_ADS")}</h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withTranslation()(PrivateHome);
