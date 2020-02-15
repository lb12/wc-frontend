import { connect } from "react-redux";

import { fetchMemberAdverts } from "../../../store/actions";
import MyAdverts from "./MyAdverts";

const mapStateToProps = state => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  loadAdverts: memberId => dispatch(fetchMemberAdverts(memberId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAdverts);
