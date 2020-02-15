import { connect } from "react-redux";

import {
  fetchMemberAdverts,
  resetPaginationFilters,
  deleteAdvert
} from "../../../store/actions";
import MyAdverts from "./MyAdverts";

const mapStateToProps = state => ({
  user: state.user.user,
  advertToDelete: state.advertToDelete
});

const mapDispatchToProps = dispatch => ({
  loadAdverts: memberId => dispatch(fetchMemberAdverts(memberId)),
  resetPaginationFilters: () => dispatch(resetPaginationFilters()),
  deleteAdvert: advert => dispatch(deleteAdvert(advert))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAdverts);
