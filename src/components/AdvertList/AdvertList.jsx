import React from "react";

import Advert from "../Advert";

import "./AdvertList.css";
import { withTranslation } from "react-i18next";

class AdvertList extends React.Component {
  buildAdvertList = adverts => {
    return (
      <div className="adverts-container">
        {adverts.map(advert => (
          <Advert key={advert.id} advert={advert} />
        ))}
      </div>
    );
  };

  render() {
    const adverts = this.props.adverts;
    const { t } = this.props;

    return (
      <div>
        {adverts && adverts.length && adverts.count !== 0
          ? this.buildAdvertList(adverts)
          : t("NO_RESULTS_FOUND")}
      </div>
    );
  }
}
export default withTranslation()(AdvertList)