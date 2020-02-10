import React from "react";
import { withTranslation } from "react-i18next";

import AdvertList from "../AdvertList";
import Filters from "../Filters";
import { PaginationFilters } from "../../utils/variables.js";

class PublicHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {},
      paginationFilters: PaginationFilters
    };
  }

  componentDidMount() {
    this.searchAdverts();
  }

  onFiltered = filters => {
    this.setState({ ...this.state, filters }, () => this.searchAdverts());
  };

  searchAdverts = () => {
    const { filters, paginationFilters } = this.state;
    this.props.loadAdverts(filters, paginationFilters);
  };

  render() {
    const { t } = this.props;
    return (
      <div>
        <span>{t("PUBLIC_ZONE")}</span>
        <Filters onSubmit={this.onFiltered} />
        <AdvertList />
      </div>
    );
  }
}

export default withTranslation()(PublicHome);
