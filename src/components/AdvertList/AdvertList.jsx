import React from "react";

import Advert from "../Advert";

import "./AdvertList.css";

export default class AdvertList extends React.Component {
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

    return (
      <div>
        {adverts && adverts.length && adverts.count !== 0
          ? this.buildAdvertList(adverts)
          : "No hay resultados"}
      </div>
    );
  }
}
