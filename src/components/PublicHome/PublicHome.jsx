import React from "react";
import { withTranslation } from "react-i18next";

import AdvertList from '../AdvertList';
import { PaginationFilters } from '../../utils/variables.js';

class PublicHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {},
      paginationFilters: PaginationFilters
    };
  }

  componentDidMount() {
    const { filters, paginationFilters } = this.state;
    this.props.loadAdverts(filters, paginationFilters);
  }

  render() {
    const { t } = this.props;
    return <div>
      <span>{t("PUBLIC_ZONE")}</span>
      <AdvertList />
    </div>;
  }
}

export default withTranslation()(PublicHome);