import React from "react";

import "./Profile.css";
import AdvertList from "../AdvertList";
import Pagination from "../Pagination";
import { withTranslation } from "react-i18next";
import Spinner from "../Spinner";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }
  componentDidMount() {
    this.getMemberAdverts();
  }

  getMemberAdverts = async () => {
    const { id } = this.props.match.params;

    this.setState({ isLoading: true });
    await this.props.loadAdverts(id);
    this.setState({ isLoading: false });
  };

  onPageChanged = () => {
    this.getMemberAdverts();
  };

  render() {
    const { t, match } = this.props;
    const { username } = match.params;
    const { isLoading } = this.state;

    return (
      <div className="p-3 mt-4">
        <h1 className="font-size-2 text-center mt-5 profile-header-text">{`${t(
          "ADVERTS_PUBLISHED_BY"
        )} ${username}`}</h1>
        <div className="text-center">
          <Spinner isLoading={isLoading} />
        </div>
        <AdvertList />
        <Pagination onPageChanged={this.onPageChanged} />
      </div>
    );
  }
}
export default withTranslation()(Profile);
