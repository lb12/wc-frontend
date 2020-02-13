import React from "react";

import Advert from "../Advert";

import "./AdvertList.css";
import { withTranslation } from "react-i18next";

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
    const { adverts, advertsCount } = this.props;
    console.log(adverts)
    console.log(advertsCount)
    const { t } = this.props;

    return (
      <React.Fragment>
        <span className="total-ads-count">{ t("ADVERTS_FOUND", { count: advertsCount }) }</span>

        {adverts && adverts.length && advertsCount !== 0 && (
          <div className="adverts-container d-flex">
            {this.buildAdvertList(adverts)}
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default withTranslation()(AdvertList);
