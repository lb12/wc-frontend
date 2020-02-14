import React from "react";
import { withTranslation } from "react-i18next";

class PrivateHome extends React.Component {
  render() {
    const { t, user } = this.props;
    const { username } = user;
    return (
      <div>
        <h1 className="font-size-2 text-center mt-5 mb-3">{t("PRIVATE_ZONE_OF", { username })}</h1>
        {/* MI CUENTA */}
        <div className="filters-form-container card mt-4">
          <a
            htmlFor="collapseMyAccount"
            data-toggle="collapse"
            href="#collapseMyAccount"
            aria-expanded="true"
            aria-controls="collapseMyAccount"
            className="filters-form-header card-header d-flex justify-content-between align-items-center"
          >
            <h3 className="mb-0">{t("MY_ACCOUNT")}</h3>
            <div>
              <img src="/img/menu.png" alt="burger-menu" />
            </div>
          </a>

          <div id="collapseMyAccount" className="collapse">
            <div style={{ backgroundColor: "white", padding: "2rem" }}>
              <div className="card-header">
                <h3 className="mb-0">{t("UPDATE_MY_DATA")}</h3>
              </div>
              <div className="card-header">
                <h3 className="mb-0">{t("UNSUBSCRIBE")}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* MIS ANUNCIOS */}
        <div className="filters-form-container card mt-4">
          <a
            htmlFor="collapseMyAds"
            data-toggle="collapse"
            href="#collapseMyAds"
            aria-expanded="true"
            aria-controls="collapseMyAds"
            className="filters-form-header card-header d-flex justify-content-between align-items-center"
          >
            <h3 className="mb-0">{t("MY_ADS")}</h3>
            <div>
              <img src="/img/menu.png" alt="burger-menu" />
            </div>
          </a>
          <div id="collapseMyAds" className="collapse">
            <div style={{ backgroundColor: "white", padding: "2rem" }}>
              <div className="card-header">
                <h3 className="mb-0">{t("SEE_MY_ADS")}</h3>
              </div>
              <div className="card-header">
                <h3 className="mb-0">{t("CREATE_NEW_ADVERT")}</h3>
              </div>
              <div className="card-header">
                <h3 className="mb-0">{t("SEE_MY_FAV_ADS")}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withTranslation()(PrivateHome);
