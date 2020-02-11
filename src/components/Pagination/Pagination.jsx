import React from "react";
import { withTranslation } from "react-i18next";

import "./Pagination.css";

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }

  onPageChanged = evt => {
    const pageSum = evt.target.id === "prev-page" ? -1 : 1;
    const { paginationFilters, changePage, onPageChanged } = this.props;
    const { page } = paginationFilters;

    changePage(Number(page + pageSum));
    onPageChanged();
  };

  render() {
    const {
      hasToDisableNextPageButton,
      paginationFilters,
      adverts,
      t
    } = this.props;
    const { page } = paginationFilters;
    return (
      <nav>
        {adverts && adverts.length !== 0 && (
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <span
                className="page-link pointer"
                id="prev-page"
                onClick={this.onPageChanged}
              >
                {t("PREVIOUS")}
              </span>
            </li>
            <li className="page-item">
              <span className="page-link">{page}</span>
            </li>
            <li
              className={`page-item ${
                hasToDisableNextPageButton ? "disabled" : ""
              }`}
            >
              <span
                className="page-link pointer"
                id="next-page"
                onClick={this.onPageChanged}
              >
                {t("NEXT")}
              </span>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}
export default withTranslation()(Pagination);
