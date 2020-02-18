import React from "react";
import { Link } from "react-router-dom";
import "./Advert.css";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import ShareMediaToolbar from "../ShareMediaToolbar";
import Fav from "../Fav";

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

  onReserveBtnClick = () => {

  }

  onSellBtnClick = () => {
    
  }

  render() {
    const { t, advert, editingPhoto, isLogged } = this.props;
    let photoSrc = editingPhoto
      ? advert.photoPreview
      : advert.photo
      ? `https://localhost:3000/images/adverts/${advert.photo}`
      : "/img/empty_advert_pic.png";
    const type = t(advert.forSale ? "ON_SALE" : "ON_PURCHASE").toUpperCase();
    const { sold, reserved } = advert;

    return (
      <div className="card mt-2">
        <div className="advert-img-container">
          <Link to={`/advert/${advert.name}/${advert.id}`}>
            <img src={photoSrc} alt={`${advert.name}_advert_img`} />
          </Link>
          {isLogged && 
          <React.Fragment>
            <Fav advertId={advert.id} />
            <div className="sold-reserved-info-container">
              <div className="reserved-info-item"><span>{t("RESERVED").toUpperCase()}</span></div>
              <div className="sold-info-item"><span>{t("SOLD_OUT").toUpperCase()}</span></div>
            </div>
          </React.Fragment>
          }
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
            <React.Fragment>
              <div className="card-footer sell-reserve-container d-flex justify-content-between">
                <button
                  className={`btn ${reserved ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => console.log("RESERVAR")}
                >
                  {reserved ? t("RESERVED") : t("RESERVE")}
                </button>
                <button
                  className={`btn ${sold ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => console.log("VENDER")}
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
