import React from "react";
import "./Pagination.css";

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  onPageChanged = evt => {
    const pageSum = evt.target.id === "prev-page" ? -1 : 1;
    const paginationFilters = this.state.paginationFilters;
    paginationFilters.page += pageSum;
    this.setState({ paginationFilters }, () =>
      this.props.onPageChanged(this.state.paginationFilters)
    );
  };

  render() {
    const { page, disableNextPage } = this.props.paginationFilters;
    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <span
              className="page-link pointer"
              id="prev-page"
              onClick={this.onPageChanged}
            >
              Previous
            </span>
          </li>
          <li className="page-item">
            <span className="page-link">
              {page}
            </span>
          </li>
          <li className={`page-item ${disableNextPage ? "disabled" : ""}`}>
            <span
              className="page-link pointer"
              id="next-page"
              onClick={this.onPageChanged}
            >
              Next
            </span>
          </li>
        </ul>
      </nav>
    );
  }
}
