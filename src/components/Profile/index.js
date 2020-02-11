import { connect } from "react-redux";

import { fetchMemberAdverts } from "../../store/actions";
import Profile from "./Profile";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  loadAdverts: memberId => dispatch(fetchMemberAdverts(memberId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
