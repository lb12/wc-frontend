import React from "react";
import Advert from "../Advert";
import "./AdvertDetail.css";

export default class AdvertDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getAdvert(id);
  }

  render() {
    const { advert } = this.props;

    return (
      <React.Fragment>
        {advert && (
          <div className="advert-detail p-3">
            <Advert advert={advert} />
          </div>
        )}
      </React.Fragment>
    );
  }
}
