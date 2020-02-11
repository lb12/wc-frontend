import { connect } from "react-redux";

import { setDisableNextPage } from "../../store/actions";
import { hasToDisableNextPageButton } from "../../store/selectors";
import Pagination from "./Pagination";

const mapStateToProps = state => ({
  totalAdverts: state.adverts.total,
  paginationFilters: state.paginationFilters,
  hasToDisableNextPageButton: hasToDisableNextPageButton(
    state.paginationFilters,
    state.adverts.total
  )
});

const mapDispatchToProps = dispatch => ({
  disableNextPage: disableNextPage =>
    dispatch(setDisableNextPage(disableNextPage))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);