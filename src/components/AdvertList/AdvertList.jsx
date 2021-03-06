// React imports
import React from "react";
import { withTranslation } from "react-i18next";

// Component imports
import Advert from "../Advert";
import "./AdvertList.css";

class AdvertList extends React.Component {
  buildAdvertList = adverts => {
    return (
      <React.Fragment>
        {adverts.map(advert => (
          <Advert key={advert.id} advert={advert} />
        ))}
      </React.Fragment>
    );
  };

  render() {
    const { adverts, advertsCount, t } = this.props;

    return (
      <React.Fragment>
        <span className="total-ads-count">
          {t("ADVERTS_FOUND", { count: advertsCount })}
        </span>

        {adverts && adverts.length && advertsCount !== 0 ? (
          <div className="adverts-container d-flex">
            {this.buildAdvertList(adverts)}
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}
export default withTranslation()(AdvertList);
