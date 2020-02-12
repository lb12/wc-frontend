import React from "react";
import Tags from "../Tags";

import "./Filters.css";
import { withTranslation } from "react-i18next";

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        name: "",
        lowerPrice: "",
        greaterPrice: "",
        price: "",
        tag: "",
        selling: "",
        sort: ""
      }
    };
  }

  onSubmit = evt => {
    evt && evt.preventDefault();

    let filters = this.formatPriceFilter();
    this.setState({ filters }, () => this.props.onSubmit(this.state.filters)); // Paso los filtros al Home para buscar los anuncios
  };

  formatPriceFilter = () => {
    const { lowerPrice, greaterPrice } = this.state.filters;

    let price = lowerPrice && lowerPrice.length && lowerPrice + "-";
    price +=
      greaterPrice &&
      greaterPrice.length &&
      (price.length ? "" : "-") + greaterPrice;

    let filters = this.state.filters;
    filters.price = price;

    return filters;
  };

  onInputChange = evt => {
    const { name, value } = evt.target;

    this.setState(({ filters }) => ({
      filters: {
        ...filters,
        [name]: value
      }
    }));
  };

  onRadioChange = evt => {
    const { id } = evt.target;

    let filters = this.state.filters;
    filters.selling =
      id === "sell-filter" ? "true" : id === "buy-filter" ? "false" : ""; // '' means everyadvert

    this.setState({ filters });
  };

  onChangeTag = optionSelected => {
    let filters = this.state.filters;
    filters.tag = optionSelected;

    this.setState({ filters });
  };

  onChangeSortingMethod = evt => {
    const value = evt.target.value;
    let filters = this.state.filters;
    filters.sort = value;
    this.setState({ filters });
  };

  render() {
    const { name, lowerPrice, greaterPrice, selling } = this.state.filters;
    const { t } = this.props;
    return (
      <div className="card mt-4 mb-2">
        <div
          className="card-header pointer"
          data-toggle="collapse"
          data-target="#collapseFilters"
        >
          <h3>{t("TO_FILTER")}</h3>
        </div>
        <div className="collapse f-container" id="collapseFilters">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="input-label" htmlFor="name">
                {t("NAME")}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={name}
                placeholder={t("NAME")}
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group">
              <div className="form-group">
                <label className="input-label" htmlFor="lowerPrice">
                  {t("LOWEST_PRICE")}
                </label>
                <input
                  type="number"
                  name="lowerPrice"
                  id="lowerPrice"
                  className="form-control"
                  value={lowerPrice}
                  placeholder={t("LOWEST_PRICE")}
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label className="input-label" htmlFor="greaterPrice">
                  {t("GREATEST_PRICE")}
                </label>
                <input
                  type="number"
                  name="greaterPrice"
                  id="greaterPrice"
                  className="form-control"
                  value={greaterPrice}
                  placeholder={t("GREATEST_PRICE")}
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="input-label" htmlFor="tags-select">
                Tag
              </label>
              <Tags onTagSelected={this.onChangeTag} />
            </div>

            <div className="form-group">
              <label className="input-label" htmlFor="sortby-select">
                {t("SORT_BY")}
              </label>
              <select
                defaultValue=""
                className="form-control"
                id="tags-select"
                onChange={this.onChangeSortingMethod}
              >
                <option value="">{t("BY_DEFAULT")}</option>
                <option value="-1">{t("NEWER_TO_OLDER")}</option>
                <option value="1">{t("OLDER_TO_NEWER")}</option>
              </select>
            </div>

            <div className="form-group">
              <div>
                <span className="input-label">{t("STATUS")}</span>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="selling"
                  value={selling}
                  id="buy-filter"
                  className="form-check-input"
                  onChange={this.onRadioChange}
                />
                <label className="form-check-label" htmlFor="buy-filter">
                  {t("ON_PURCHASE")}
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="selling"
                  value={selling}
                  id="sell-filter"
                  className="form-check-input"
                  onChange={this.onRadioChange}
                />
                <label className="form-check-label" htmlFor="sell-filter">
                  {t("ON_SALE")}
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="selling"
                  value={selling}
                  id="all-filter"
                  className="form-check-input"
                  onChange={this.onRadioChange}
                />
                <label className="form-check-label" htmlFor="all-filter">
                  {t("ALL")}
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              {t("TO_FILTER")}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default withTranslation()(Filters);
