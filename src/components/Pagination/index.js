import { connect } from "react-redux";

import { setChangePage } from "../../store/actions";
import { hasToDisableNextPageButton } from "../../store/selectors";
import Pagination from "./Pagination";

const mapStateToProps = state => ({
  adverts: state.adverts.adverts,
  totalAdverts: state.adverts.total,
  paginationFilters: state.paginationFilters,
  hasToDisableNextPageButton: hasToDisableNextPageButton(
    state.paginationFilters,
    state.adverts.total
  )
});

const mapDispatchToProps = dispatch => ({
  changePage: page => dispatch(setChangePage(page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
