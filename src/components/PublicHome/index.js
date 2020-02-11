import { connect } from "react-redux";

import { fetchAdverts, resetPaginationFilters } from "../../store/actions";
import PublicHome from "./PublicHome";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  loadAdverts: filters => dispatch(fetchAdverts(filters)),
  resetPaginationFilters: () => dispatch(resetPaginationFilters())
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicHome);
