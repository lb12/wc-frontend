import React from "react";

import "./Profile.css";
import AdvertList from "../AdvertList";
import Pagination from "../Pagination";
import { withTranslation } from "react-i18next";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getMemberAdverts();
  }

  getMemberAdverts = () => {
    const { id } = this.props.match.params;
    this.props.loadAdverts(id);
  };

  onPageChanged = () => {
    this.getMemberAdverts();
  };

  render() {
    const { t, match } = this.props;
    const { username } = match.params;

    return (
      <div>
        <div>
          <div className="mt-4">
            <h1 className="font-size-2 text-center mt-5 profile-header-text">{`${t("ADVERTS_PUBLISHED_BY")} ${username}`}</h1>
            <AdvertList />
            <Pagination onPageChanged={this.onPageChanged} />
          </div>
        </div>
      </div>
    );
  }
}
export default withTranslation()(Profile)