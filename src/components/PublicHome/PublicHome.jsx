import React from "react";
import { withTranslation } from "react-i18next";

import "./PublicHome.css";
import AdvertList from "../AdvertList";
import Filters from "../Filters";
import Pagination from "../Pagination";

class PublicHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {}
    };
  }

  componentDidMount() {
    this.searchAdverts();
  }

  onFiltered = filters => {
    this.props.resetPaginationFilters(); // Reset page of pagination
    this.setState({ ...this.state, filters }, () => this.searchAdverts());
  };

  searchAdverts = async () => {
    const { filters } = this.state;
    await this.props.loadAdverts(filters);
  };

  onPageChanged = () => {
    this.searchAdverts();
  };

  render() {
    const { t } = this.props;
    return (
      <div className="d-flex flex-column justify-content-center">
        <h1 className="home-text text-center mt-5 mb-3">{t("WHAT_ARE_YOU_LOOKING_FOR_TODAY")}</h1>
        <div className="p-2">
          <Filters onSubmit={this.onFiltered} />        
          <div>
            <AdvertList />
            <span>haha</span>
            <Pagination onPageChanged={this.onPageChanged} />
          </div>
        </div>

      </div>
    );
  }
}

export default withTranslation()(PublicHome);
