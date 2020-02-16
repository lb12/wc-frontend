import React from "react";
import "./Fav.css";

export default class Fav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdvertFaved: this.isAdvertFaved()
    };
  }

  isAdvertFaved = () => {
    const { advertId, user } = this.props;

    if (!user || !user.user) {
      return false;
    }

    const { favs } = user.user;

    return favs.includes(advertId);
  };

  setFavAdvert = () => {
    const { advertId, user } = this.props;

    if (!user || !user.user) {
      return false;
    }

    const { favs } = user.user;

    // Hay que quitarlo del array
    if (this.isAdvertFaved()) {
      const index = favs.indexOf(advertId);
      favs.splice(index, 1);
    } else {
      // hay que añadirlo
      favs.push(advertId);
    }

    this.setState({ isAdvertFaved: this.isAdvertFaved() });
    // Llamar al metodo del set
    this.props.setUserFavs(favs);
  };

  render() {
    const { isAdvertFaved } = this.state;
    return (
      <div
        className="fav-container badge badge-light"
        onClick={this.setFavAdvert}
      >
        <img
          src={`/img/${isAdvertFaved ? "full" : "empty"}-like.png`}
          alt="fav advert"
          title="Fav advert"
        />
      </div>
    );
  }
}
