// React imports
import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";

// Component imports
import ShareMediaToolbar from "../ShareMediaToolbar";
import Fav from "../Fav";
import "./Advert.css";

class Advert extends React.Component {
  constructor(props) {
    super(props);

    const { reserved, sold } = this.props.advert;

    // Tengo que gestionarlo con el state ya que sino, no me renderiza el cambio
    this.state = {
      reserved,
      sold
    };
  }

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

  onReserveBtnClick = async evt => {
    evt && evt.preventDefault();
    const { advert } = this.props;
    const { reserved } = this.state;

    this.setState(
      { reserved: !reserved },
      await this.props.setReservedAdvert(advert, !reserved)
    );
  };

  onSellBtnClick = async evt => {
    evt && evt.preventDefault();

    const { advert } = this.props;
    const { sold } = this.state;

    this.setState(
      { sold: !sold },
      await this.props.setSoldAdvert(advert, !sold)
    );
  };

  render() {
    const { t, advert, editingPhoto, isLogged } = this.props;
    let photoSrc = editingPhoto
      ? advert.photoPreview
      : advert.photo
      ? `https://localhost:3000/images/adverts/${advert.photo}`
      : "/img/empty_advert_pic.png";
    const type = t(advert.forSale ? "ON_SALE" : "ON_PURCHASE").toUpperCase();
    const { sold, reserved } = this.state;

    return (
      <div className="card mt-2">
        <div className="advert-img-container">
          <Link to={`/advert/${advert.slug}/${advert.id}`}>
            <img src={photoSrc} alt={`${advert.name}_advert_img`} />
          </Link>
          {isLogged && (
            <React.Fragment>
              <Fav advertId={advert.id} />
              <div className="sold-reserved-info-container">
                {reserved && (
                  <div
                    className="reserved-info-item"
                    style={!sold ? { borderBottomRightRadius: "5px" } : {}} /* Apaño para no descuadrar la imagen */
                  >
                    <span>{t("RESERVED").toUpperCase()}</span>
                  </div>
                )}
                {sold && (
                  <div
                    className="sold-info-item"
                    style={!reserved ? { borderBottomLeftRadius: "5px" } : {}} /* Apaño para no descuadrar la imagen */
                  >
                    <span>{t("SOLD_OUT").toUpperCase()}</span>
                  </div>
                )}
              </div>
            </React.Fragment>
          )}
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
              to={`/profile/${advert.member.slug}/${advert.member.username}/${advert.member._id}`}
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
            <React.Fragment>
              <div className="card-footer sell-reserve-container d-flex justify-content-between">
                <button
                  className={`btn ${
                    reserved ? "btn-reserved" : "btn-outline-reserved"
                  }`}
                  onClick={this.onReserveBtnClick}
                >
                  {reserved ? t("RESERVED") : t("RESERVE")}
                </button>
                <button
                  className={`btn ${
                    sold ? "btn-success" : "btn-outline-success"
                  }`}
                  onClick={this.onSellBtnClick}
                >
                  {sold ? t("SOLD_OUT") : t("SELL")}
                </button>
              </div>
              <div className="edit-delete-advert-container d-flex justify-content-between p-0">
                <button className="btn edit-advert-btn">
                  <Link to={`/my-zone/edit-advert/${advert.id}`}>
                    {t("EDIT")}
                  </Link>
                </button>
                <button
                  className="btn delete-advert-btn"
                  onClick={this.setAdvertToDelete}
                  data-toggle="modal"
                  data-target={`#modal-deleteAdvert`}
                >
                  {t("DELETE")}
                </button>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      </div>
    );
  }
}

export default withRouter(withTranslation()(Advert));
