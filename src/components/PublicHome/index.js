import { connect } from "react-redux";

import { fetchAdverts } from "../../store/actions";
import PublicHome from "./PublicHome";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  loadAdverts: (filters, paginationFilters) =>
    dispatch(fetchAdverts(filters, paginationFilters))
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicHome);
