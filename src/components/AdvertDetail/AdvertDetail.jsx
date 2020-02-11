import React from 'react';
import './AdvertDetail.css';

export default class AdvertDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      advert: null,
      advertError: false
    }
  }

  render() {
    const { advert, advertError } = this.state;
    return (
      <React.Fragment>
        {
          !advertError && advert ?
          <div className="detail">
            <button className="btn btn-primary edit-ad-submit-btn">Edit advert</button>
          </div>
          :
          <div>ADVERT DETAIL PAGE</div>
        }
      </React.Fragment>
    );
  }
}
