import React from "react";
import { withTranslation } from "react-i18next";

import AdvertList from "../AdvertList";
import Filters from "../Filters";
import { PaginationFilters } from "../../utils/variables.js";
import Pagination from "../Pagination";

class PublicHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {}
    };
  }

  componentDidMount() {
    this.searchAdverts()
    .then( () => {
      const { hasToDisableNextPageButton } = this.props;
      hasToDisableNextPageButton && this.props.disableNextPage(true);
    });
  }

  onFiltered = filters => {
    this.setState({ ...this.state, filters }, () => this.searchAdverts());
  };

  searchAdverts = async () => {
    const { filters } = this.state;
    await this.props.loadAdverts(filters);
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
