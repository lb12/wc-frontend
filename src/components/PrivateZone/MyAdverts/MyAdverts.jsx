import React from "react";
import { withTranslation } from "react-i18next";

import AdvertList from "../../AdvertList";
import Pagination from "../../Pagination";
import "./MyAdverts.css";

class MyAdverts extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getMemberAdverts();
  }

  getMemberAdverts = () => {
    const { _id } = this.props.user;
    this.props.loadAdverts(_id);
  };

  onPageChanged = () => {
    this.getMemberAdverts();
  };

  render() {
    const { t, user } = this.props;

    return (
      <div className="p-3 mt-4">
        <h1 className="font-size-2 text-center mt-5 mb-5">{`${t(
          "ADVERTS_PUBLISHED_BY"
        )} ${user.username}`}</h1>
        <AdvertList />
        <Pagination onPageChanged={this.onPageChanged} />
      </div>
    );
  }
}
export default withTranslation()(MyAdverts);
