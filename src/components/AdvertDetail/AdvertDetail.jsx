import React from "react";
import Advert from "../Advert";
import "./AdvertDetail.css";
import ShareMediaToolbar from "../ShareMediaToolbar";

export default class AdvertDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getAdvert(id);
  }

  render() {
    const { advert } = this.props;

    console.log(advert)
    
    return (
      <React.Fragment>
        {advert && (
          <div className="advert-detail p-3">
            <Advert advert={advert} />
            <ShareMediaToolbar />
          </div>
        )}
      </React.Fragment>
    );
  }
}
