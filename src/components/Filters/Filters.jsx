import React from "react";
/* import Tags from "../Tags";
 */
import "./Filters.css";

export default class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        name: "",
        lowerPrice: "",
        greaterPrice: "",
        price: "",
        tag: "",
        selling: ""
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
    filters.selling = (id === "sell-filter") + "";

    this.setState({ filters });
  };

  onSelectChange = optionSelected => {
    let filters = this.state.filters;
    filters.tag = optionSelected;

    this.setState({ filters });
  };

  render() {
    const { name, lowerPrice, greaterPrice, selling } = this.state.filters;
    return (
      <div className="card mt-4 mb-2">
        <div className="card-header pointer">
          <h3
            className=""
            data-toggle="collapse"
            data-target="#collapseFilters"
          >
            Show filters
          </h3>
        </div>
        <div className="collapse f-container" id="collapseFilters">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="input-label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={name}
                placeholder="Name"
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group">
              <div className="form-group">
                <label className="input-label" htmlFor="lowerPrice">
                  Lower price
                </label>
                <input
                  type="number"
                  name="lowerPrice"
                  id="lowerPrice"
                  className="form-control"
                  value={lowerPrice}
                  placeholder="Lower Price"
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <label className="input-label" htmlFor="greaterPrice">
                  Greater price
                </label>
                <input
                  type="number"
                  name="greaterPrice"
                  id="greaterPrice"
                  className="form-control"
                  value={greaterPrice}
                  placeholder="Greater Price"
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="input-label" htmlFor="tags-select">
                Tag
              </label>
              {/* <Tags onTagSelected={this.onSelectChange} /> */}
            </div>
            <div className="form-group">
              <div>
                <span className="input-label">Type</span>
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
                  Buy
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
                  Sell
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Filtrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}
