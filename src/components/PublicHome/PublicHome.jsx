import React from "react";
import { withTranslation } from "react-i18next";

import "./PublicHome.css";
import AdvertList from "../AdvertList";
import Spinner from "../Spinner";
import Filters from "../Filters";
import Pagination from "../Pagination";

class PublicHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: {},
      isLoading: true
    };
  }

  componentDidMount() {
    this.props.resetPaginationFilters();
    this.searchAdverts();
  }

  onFiltered = filters => {
    this.setState({ isLoading: true });
    this.props.resetPaginationFilters(); // Reset page of pagination
    this.setState({ ...this.state, filters }, () => this.searchAdverts());
  };

  searchAdverts = async () => {
    const { filters } = this.state;
    await this.props.loadAdverts(filters);
    this.setState({ isLoading: false });
  };

  onPageChanged = () => {
    this.setState({ isLoading: true });
    this.searchAdverts();
  };

  render() {
    const { t } = this.props;
    const { isLoading } = this.state;
    return (
      <div className="d-flex flex-column justify-content-center">
        <h1 className="font-size-2 text-center mt-5 mb-3">{t("WHAT_ARE_YOU_LOOKING_FOR_TODAY")}</h1>
        <div className="p-3">
          <Filters onSubmit={this.onFiltered} />
          <div className="text-center">
            <Spinner isLoading={isLoading} />
          </div>       
          <div>
            <AdvertList />
            <Pagination onPageChanged={this.onPageChanged} />
          </div>
        </div>

      </div>
    );
  }
}

export default withTranslation()(PublicHome);
