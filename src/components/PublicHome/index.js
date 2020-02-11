import { connect } from "react-redux";

import {
  fetchAdverts,
  setDisableNextPage,
  resetPaginationFilters
} from "../../store/actions";
import { hasToDisableNextPageButton } from "../../store/selectors";
import PublicHome from "./PublicHome";

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
  loadAdverts: filters => dispatch(fetchAdverts(filters)),
  resetPaginationFilters: () => dispatch(resetPaginationFilters())
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicHome);
