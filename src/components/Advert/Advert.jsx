import React from "react";
import { Link } from "react-router-dom";
import "./Advert.css";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import ShareMediaToolbar from "../ShareMediaToolbar";

class Advert extends React.Component {
  isOwnerOnMyZonePage = () => {
    const { user, advert, location } = this.props;
    const { pathname } = location;

    return (
      pathname.startsWith("/my-zone/") && user && user._id === advert.member._id
    );
  };

  // Manda al store del redux el anuncio que pretendemos eliminar (no lo elimina)
  setAdvertToDelete = () => {
    const advert = this.props.advert;
    this.props.setAdvertToDelete(advert);
  };

  render() {
    const { t, advert, editingPhoto } = this.props;
    let photoSrc = editingPhoto
      ? advert.photoPreview
      : advert.photo
      ? `https://localhost:3000/images/adverts/${advert.photo}`
      : "/img/empty_advert_pic.png";
    const type = t(advert.forSale ? "ON_SALE" : "ON_PURCHASE").toUpperCase();

    return (
      <div className="card mt-2">
        <div className="advert-img-container">
          <Link to={`/advert/${advert.name}/${advert.id}`}>
            <img src={photoSrc} alt={`${advert.name}_advert_img`} />
          </Link>
        </div>
        <span className="advert-type badge badge-warning">{type}</span>
        <div className="card-body">
          <div className="card-title advert-title">
            <h5 className=" card-price">{advert.price} €</h5>
            <ShareMediaToolbar />
          </div>
          <div className="card-subtitle card-name">
            <span>{advert.name}</span>
          </div>
          <div className="card-subtitle">
            <span>{advert.forSale ? t("SELLER") : t("BUYER")} </span>{" "}
            <Link
              className="card-member"
              to={`/profile/${advert.member.username}/${advert.member._id}`}
            >
              <strong className="seller-name">{advert.member.username}</strong>
            </Link>
          </div>
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
        <React.Fragment>
          {this.isOwnerOnMyZonePage() && (
            <div className="card-footer edit-remove-container d-flex justify-content-between">
              <Link to={`/my-zone/edit-advert/${advert.id}`}>
                <button className="btn btn-info">{t("EDIT")}</button>
              </Link>
              <button
                className="btn btn-danger"
                onClick={this.setAdvertToDelete}
                data-toggle="modal"
                data-target={`#modal-deleteAdvert`}
              >
                {t("DELETE")}
              </button>
            </div>
          )}
        </React.Fragment>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Advert));
