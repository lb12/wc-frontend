import React from "react";
import { Link /* withRouter */ } from "react-router-dom";
import "./Advert.css";
import { withTranslation } from "react-i18next";

class Advert extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const advert = this.props.advert;
    const type = advert.forSale ? "sell" : "wanted";
    return (
      <div className="card">
        <Link className="nav-link" to={`/advert/${advert.name}/${advert.id}`}>
          <div className="pointer">
            <img
              src={advert.photo ? advert.photo : "/images/empty_advert_pic.png"}
              className="card-img-top"
              alt={`${advert.name}_advert_img`}
            />
            <span className="price">{advert.price} €</span>
            <span className={` type-badge type-badge-${type}`}>{type}</span>
            <div className="card-body">
              <h5 className="card-title">{advert.name}</h5>
              <p className="card-text">{advert.description}</p>

              <div style={{ width: "80px" }}>
                <Link
                  className="nav-link"
                  to={`/profile/${advert.member.username}/${advert.member._id}`}
                >
                  <span className="card-text">{advert.member.username}</span>
                </Link>
              </div>
              
            </div>
          </div>
          <div className="list-group-item tag-badge-container">
            {advert.tags.map(tag => (
              <span
                key={`${advert.id}_${tag}`}
                className={`tag-badge tag-${tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </Link>
      </div>
    );
  }
}

export default withTranslation()(Advert);
