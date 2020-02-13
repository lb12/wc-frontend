import React from "react";
import { Link /* withRouter */ } from "react-router-dom";
import "./Advert.css";
import { withTranslation } from "react-i18next";

class Advert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    const advert = this.props.advert;
    const type = advert.forSale ? "sell" : "wanted";
    return (
      <div className="card mt-2">
        <div className="advert-img-container">
          <Link to={`/advert/${advert.name}/${advert.id}`}>
            <img src={`https://localhost:3000/images/adverts/${advert.photo ? advert.photo : 'empty_advert_pic.png'}`}
              alt={`${advert.name}_advert_img`}/>
          </Link>
        </div>
          <span className="advert-type badge badge-info">{type}</span>
        <div className="card-body">
          <h5 className="card-title card-price">{advert.price} €</h5>
          <div className="card-subtitle card-name">
            <span>{advert.name}</span>
          </div>
          <Link
            className="card-subtitle"
            to={`/profile/${advert.member.username}/${advert.member._id}`}
          >
            <span>{advert.forSale ? t("SELLER") : t("BUYER")} </span> <strong className="seller-name">{advert.member.username}</strong>
            </Link>

          <p className="card-text card-description">{advert.description}</p>
        </div>
        <div className="card-footer card-tags">
          {advert.tags.map(tag => (
            <span
              key={`${advert.id}_${tag}`}
              className={`tag-badge tag-${tag}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

export default withTranslation()(Advert);
