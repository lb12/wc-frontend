import { connect } from "react-redux";
import Tags from "./Tags";

import { fetchTags } from "../../store/actions";

const mapStateToProps = state => ({
  tags: state.tags
});

const mapDispatchToProps = dispatch => ({
  getTags: () => dispatch(fetchTags())
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
