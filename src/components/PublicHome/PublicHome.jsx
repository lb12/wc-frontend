import React from "react";
import { withTranslation } from "react-i18next";

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
      <div>
        <span>{t("PUBLIC_ZONE")}</span>
        <Filters onSubmit={this.onFiltered} />
        <AdvertList />
        <Pagination onPageChanged={this.onPageChanged} />
      </div>
    );
  }
}

export default withTranslation()(PublicHome);
